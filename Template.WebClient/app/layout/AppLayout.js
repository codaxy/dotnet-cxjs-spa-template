import { Logo } from '../components/Logo';
import Controller from './Controller';
import { ChildItem, GroupItem, NavItem } from './NavItem';
import UserMenu from './UserMenu';
import Nav from './Nav';

export default ({ children }) => (
   <cx>
      <div class="h-full grid grid-cols-2" style="grid-template-columns: 250px 1fr;" controller={Controller}>
         <div class="border-r  flex flex-col">
            <div class="py-4 pl-6">
               <Logo />
            </div>
            <div class="pt-3 flex-grow overflow-auto">{Nav}</div>
            {UserMenu}
         </div>
         <div class="relative bg-gray-100">{children}</div>
      </div>
   </cx>
);
