import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConfigMapping from './config-mapping';
import ConfigMappingDetail from './config-mapping-detail';
import ConfigMappingUpdate from './config-mapping-update';
import ConfigMappingDeleteDialog from './config-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConfigMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConfigMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConfigMappingDetail} />
      <ErrorBoundaryRoute path={match.url} component={ConfigMapping} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ConfigMappingDeleteDialog} />
  </>
);

export default Routes;
