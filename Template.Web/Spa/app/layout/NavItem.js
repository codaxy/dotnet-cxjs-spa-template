import { Icon, Link, PureContainer } from 'cx/widgets';

export const NavItem = ({ text, href, tooltip, onClick, className, icon, badge, expanded }) => (
   <cx>
      <Link
         href={href}
         url-bind="url"
         class="hover:bg-gray-100 flex items-center px-3 py-3 text-gray-800 relative font-semibold whitespace-nowrap text-opacity-70 text-[15px] border-l-[3px] border-transparent cursor-pointer"
         className={className}
         activeClass="!bg-sky-100 !border-sky-500 !text-sky-500 !opacity-100"
         tooltip={tooltip}
         onClick={onClick}
         match="subroute"
      >
         <Icon name={icon} class="w-7 h-7 ml-3 mr-3 opacity-70" />
         <div text={text} class="flex-grow" />
         <div text={badge} visible={badge} class="text-xs bg-black bg-opacity-20 rounded-full px-3 py-1" />
         <Icon
            name="drop-down"
            class="w-5 h-5 mr-2 transform transition-all opacity-80"
            visible={!!expanded}
            className={{
               'rotate-180': expanded,
            }}
         />
      </Link>
   </cx>
);

export const GroupItem = ({ text, href, tooltip, className, icon, badge, children, expanded }) => (
   <cx>
      <NavItem
         href={href}
         text={text}
         tooltip={tooltip}
         className={className}
         icon={icon}
         badge={badge}
         onClick={(e, { store }) => {
            e.preventDefault();
            store.toggle(expanded.bind);
         }}
         expanded={expanded}
      />
      <PureContainer visible={expanded}>{children}</PureContainer>
   </cx>
);

export const ChildItem = ({ text, href, badge }) => (
   <cx>
      <NavItem href={href} text={text} className="!pl-16 opacity-80" badge={badge} />
   </cx>
);
