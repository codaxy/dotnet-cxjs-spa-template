import { FirstVisibleChildLayout } from 'cx/ui';
import { DocumentTitle, RedirectRoute } from 'cx/widgets';

import { SandboxedRoute } from '../components/SandboxedRoute';
import AppLayout from '../layout/AppLayout';

import Home from './home';

import { enableMsgBoxAlerts, enableTooltips } from 'cx/widgets';

enableTooltips();
enableMsgBoxAlerts();

export default () => (
   <cx>
      <FirstVisibleChildLayout>
         <RedirectRoute route="~/" redirect="~/home" url-bind="url" />

         <AppLayout>
            <SandboxedRoute route="~/home">
               <Home />
            </SandboxedRoute>
         </AppLayout>
      </FirstVisibleChildLayout>

      <DocumentTitle append text="Template" separator=" | " />
   </cx>
);
