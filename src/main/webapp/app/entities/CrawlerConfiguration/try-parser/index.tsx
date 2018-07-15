import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TryParser from './try-parser';
import TryParserDetail from './try-parser-detail';
import TryParserUpdate from './try-parser-update';
import TryParserDeleteDialog from './try-parser-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TryParserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TryParserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TryParserDetail} />
      <ErrorBoundaryRoute path={match.url} component={TryParser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TryParserDeleteDialog} />
  </>
);

export default Routes;
