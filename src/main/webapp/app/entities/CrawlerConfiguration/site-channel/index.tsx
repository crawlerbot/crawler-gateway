import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SiteChannel from './site-channel';
import SiteChannelDetail from './site-channel-detail';
import SiteChannelUpdate from './site-channel-update';
import SiteChannelDeleteDialog from './site-channel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SiteChannelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SiteChannelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SiteChannelDetail} />
      <ErrorBoundaryRoute path={match.url} component={SiteChannel} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SiteChannelDeleteDialog} />
  </>
);

export default Routes;
