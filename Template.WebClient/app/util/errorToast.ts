import { showErrorToast } from './toasts';

export function errorToast(errorMessage: string = 'Error'): any {
   return (target: any, memberName: string, descriptor) => {
      let method = target[memberName];
      descriptor.value = async function (...args) {
         try {
            return await Promise.resolve(method.apply(this, args));
         } catch (err) {
            showErrorToast(err, errorMessage);
         }
      };
      return descriptor;
   };
}
