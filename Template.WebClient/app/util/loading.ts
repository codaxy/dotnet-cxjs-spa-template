import { AccessorChain } from 'cx/src/core';

export function loading(binding: string | AccessorChain<any>): any {
   return (target: any, memberName: string, descriptor) => {
      let method = target[memberName];
      descriptor.value = async function (...args) {
         try {
            this.store.set(`${binding}.status`, 'loading');
            let result = await Promise.resolve(method.apply(this, args));
            this.store.set(`${binding}.status`, 'ok');
            this.store.set(`${binding}.data`, result);
            return result;
         } catch (err) {
            this.store.set(`${binding}.status`, 'error');
            this.store.set(`${binding}.error`, err);
            throw err;
         }
      };
      return descriptor;
   };
}
