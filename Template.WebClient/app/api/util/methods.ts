import { urlEncode } from './urlEncode';

export class NoResponseError extends Error {
   constructor() {
      super('Failed to retrieve server response. Please check your internet connection.');
   }
}

async function processResponse(response) {
   if (response.status == 201) return null;
   const contentType = response.headers.get('content-type');
   if (!contentType || !contentType.startsWith('application/json')) return null;
   try {
      return response.json();
   } catch (e) {
      console.warn('Could not parse response.', e);
      return null;
   }
}

export class FetchError extends Error {
   statusCode?: number;

   constructor(message: string, statusCode) {
      super(message);
      this.statusCode = statusCode;
   }
}

async function checkOk(r) {
   if (!r) throw new NoResponseError();
   if (r.ok) return r;
   let data;
   try {
      data = await r.json();
   } catch {}

   throw new FetchError(
      data?.error || `Error occurred while communicating with the server (response status ${r.status}).`,
      r.status
   );
}

let apiBaseUrl = '/api/';
let afToken = null;

export function resolveAPIUrl(path, query) {
   let qs = '';
   if (typeof query == 'object' && query) qs = '?' + urlEncode(query);
   return apiBaseUrl + path + qs;
}

interface ExtraOptions {
   query?: any;
}

export function resolveFetchOptions(options) {
   let fetchOptions = {
      headers: options.headers || {},
      method: options.method || 'GET',
      body: options.body,
   };

   if (!afToken) {
      let el: any = document.querySelector('input[name="__RequestVerificationToken"]');
      afToken = el?.value;
   }

   if (afToken) fetchOptions.headers['RequestVerificationToken'] = afToken;

   return fetchOptions;
}

export async function doFetch(path, options?: any) {
   let url = resolveAPIUrl(path, options.query);
   let fetchOptions = resolveFetchOptions(options);
   let response = await fetch(url, fetchOptions);
   response = await checkOk(response);
   return response;
}

export function GET<T = any>(url, options?: ExtraOptions): Promise<T> {
   return doFetch(url, {
      ...options,
      headers: {
         Accept: 'application/json',
      },
   }).then((x) => x.json());
}

export async function PATCH(url, data, options?: ExtraOptions) {
   let response = await doFetch(url, {
      ...options,
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
   });
   return await processResponse(response);
}

export async function POST(url, data = {}, options?: ExtraOptions) {
   let response = await doFetch(url, {
      options,
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify(data, null, 2),
   });
   return await processResponse(response);
}

export async function PUT(url, data, options?: ExtraOptions) {
   let response = await doFetch(url, {
      ...options,
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify(data, null, 2),
   });
   return await processResponse(response);
}

export async function DELETE(url, options?: ExtraOptions) {
   let response = await doFetch(url, {
      ...options,
      method: 'DELETE',
   });
   return await processResponse(response);
}
