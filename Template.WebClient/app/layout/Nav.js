import { ChildItem, GroupItem, NavItem } from './NavItem';

export default (
   <cx>
      <div class="px-6 py-3 text-gray-400 text-sm">Main Menu</div>
      <NavItem text="Home" icon="home" href="~/home" />

      <div class="mt-4 px-6 py-3 text-gray-400 text-sm">Administration</div>
      <NavItem text="Users" icon="user-group" href="~/users" />
      <GroupItem text="Settings" icon="cog" expanded-bind="nav.expand.settings">
         <ChildItem text="Setting X" href="~/settings/x" />
         <ChildItem text="Setting Y" href="~/settings/y" />
      </GroupItem>
   </cx>
);
