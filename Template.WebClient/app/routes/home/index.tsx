import { bind, computable, expr } from 'cx/ui';
import { Button } from 'cx/widgets';
import Controller from './Controller';

export default (
   <cx>
      <div class="h-full p-2" controller={Controller}>
         <div class="border rounded bg-white p-4 bg-opacity-75">
            <div class="flex gap-2">
               <Button
                  onClick="onHello"
                  icon={computable('$page.hello.status', (status) => status == 'loading' && 'loading')}
               >
                  Say Hello!
               </Button>

               <Button onClick="onError">Show Error</Button>
            </div>

            <div visible={expr("{$page.hello.status} == 'ok'")} ws class="mt-4">
               Server response: <span text={bind('$page.hello.data.text')} />
            </div>
         </div>
      </div>
   </cx>
);
