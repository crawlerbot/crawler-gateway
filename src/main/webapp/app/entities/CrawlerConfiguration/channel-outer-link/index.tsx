import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChannelOuterLink from './channel-outer-link';
import ChannelOuterLinkDetail from './channel-outer-link-detail';
import ChannelOuterLinkUpdate from './channel-outer-link-update';
import ChannelOuterLinkDeleteDialog from './channel-outer-link-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChannelOuterLinkUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChannelOuterLinkUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChannelOuterLinkDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChannelOuterLink} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChannelOuterLinkDeleteDialog} />
  </>
);

export default Routes;
