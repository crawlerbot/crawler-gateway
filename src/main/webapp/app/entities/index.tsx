import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConfigMapping from './CrawlerConfiguration/config-mapping';
import Channel from './CrawlerConfiguration/channel';
import ConfigGroup from './CrawlerConfiguration/config-group';
import TryParser from './CrawlerConfiguration/try-parser';
import SiteChannel from './CrawlerConfiguration/site-channel';
import ChannelOuterLink from './CrawlerConfiguration/channel-outer-link';
/* simlife-needle-add-route-import - Simlife will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/config-mapping`} component={ConfigMapping} />
      <ErrorBoundaryRoute path={`${match.url}/channel`} component={Channel} />
      <ErrorBoundaryRoute path={`${match.url}/config-group`} component={ConfigGroup} />
      <ErrorBoundaryRoute path={`${match.url}/try-parser`} component={TryParser} />
      <ErrorBoundaryRoute path={`${match.url}/site-channel`} component={SiteChannel} />
      <ErrorBoundaryRoute path={`${match.url}/channel-outer-link`} component={ChannelOuterLink} />
      {/* simlife-needle-add-route-path - Simlife will routes here */}
    </Switch>
  </div>
);

export default Routes;
