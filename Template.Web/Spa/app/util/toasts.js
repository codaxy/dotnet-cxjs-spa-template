import { Toast } from 'cx/widgets';

export function showErrorToast(err, title) {
   if (err.message) err = err.message;
   return Toast.create({
      items: (
         <cx>
            <div>{err}</div>
         </cx>
      ),
      timeout: 5000,
      mod: 'error',
   }).open();
}

export function showInfoToast(content) {
   return Toast.create({
      items: (
         <cx>
            <div class="text-sm">{content}</div>
         </cx>
      ),
      timeout: 5000,
      mod: 'dark',
   }).open();
}
