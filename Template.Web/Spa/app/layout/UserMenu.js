import { Dropdown, Icon, Menu, MenuItem } from 'cx/widgets';

export default (
   <cx>
      <div
         class="border-t"
         onClick={(e, { store }) => {
            store.toggle('nav.expand.user');
         }}
         tabIndex="0"
      >
         <div class="flex items-center px-4 py-2 cursor-pointer">
            <div class="w-10 h-10 bg-gray-300 rounded-full align-middle flex items-center justify-center relative flex-shrink-0 cursor-pointer">
               <span text-bind="user.initials" visible-expr="!{user.pictureUrl}" />
               <img
                  src-tpl="{user.pictureUrl}"
                  visible-expr="!!{user.pictureUrl}"
                  class="w-full h-full object-cover rounded-full absolute left-0 top-0"
               />
            </div>
            <div class="ml-4 mr-4 leading-tight">
               <div text-tpl="{user.firstName} {user.lastName}" class="text-sky-600" />
               <div class="opacity-50 text-sm" text-bind="user.email" />
            </div>
            <Icon
               name="drop-down"
               class="w-4 h-4 transform transition-all opacity-50"
               className={{
                  'rotate-180': { bind: 'nav.expand.user' },
               }}
            />
         </div>
         <Dropdown
            visible-bind="nav.expand.user"
            dismissOnFocusOut
            arrow
            offset={5}
            focusable
            autoFocus
            placementOrder={'up up-right'}
         >
            <Menu class="m-2">
               <MenuItem onClick="onSignOut">Sign Out</MenuItem>
            </Menu>
         </Dropdown>
      </div>
   </cx>
);
