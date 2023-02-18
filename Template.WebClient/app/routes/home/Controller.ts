import { Controller } from 'cx/ui';
import { Hello } from '../../api/models/Hello';
import { GET } from '../../api/util/methods';
import { errorToast } from '../../util/errorToast';
import { loading as data } from '../../util/loading';

export default class extends Controller {
   onInit() {}

   @data('$page.hello')
   async onHello() {
      return await GET<Hello>('hello');
   }

   @errorToast()
   onError() {
      throw new Error('Something bad happened.');
   }
}
