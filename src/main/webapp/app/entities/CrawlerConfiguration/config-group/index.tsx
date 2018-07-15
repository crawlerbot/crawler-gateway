import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConfigGroup from './config-group';
import ConfigGroupDetail from './config-group-detail';
import ConfigGroupUpdate from './config-group-update';
import ConfigGroupDeleteDialog from './config-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConfigGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConfigGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConfigGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={ConfigGroup} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ConfigGroupDeleteDialog} />
  </>
);

export default Routes;
