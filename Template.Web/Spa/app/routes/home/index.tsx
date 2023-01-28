import { Button } from 'cx/widgets';
import Controller from './Controller';

export default (
   <cx>
      <div class="h-full p-2" controller={Controller}>
         <div class="border rounded bg-white p-4 bg-opacity-75">
            <Button onClick="onHello">Say Hello!</Button>
         </div>
      </div>
   </cx>
);
