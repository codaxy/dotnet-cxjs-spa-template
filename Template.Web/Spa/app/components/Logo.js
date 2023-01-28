import { Icon, Link } from 'cx/widgets';
import '../icons/index';

export const Logo = ({ className }) => (
   <cx>
      <Link href="~/" class="flex items-center" className={className}>
         <div class="p-2 rounded-full bg-sky-500 text-white">
            <Icon name="home" class="w-6 h-6 block" />
         </div>
         <div class="ml-3 text-lg font-bold text-sky-500">Template</div>
      </Link>
   </cx>
);
