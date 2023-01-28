import { Controller } from 'cx/ui';
import { Hello } from '../../api/models/Hello';
import { GET } from '../../api/util/methods';

export default class extends Controller {
   onInit() {}

   async onHello() {
      let hello = await GET<Hello>('hello');
      alert('Server response: ' + hello.text);
   }
}
