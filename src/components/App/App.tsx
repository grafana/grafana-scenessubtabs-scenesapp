import React from 'react';

import { AppRootProps } from '@grafana/data';

import { Redirect, Route, Switch } from 'react-router-dom';
import { prefixRoute } from '../../utils/routing';
import { ROUTES } from '../../constants';
import { Home } from '../../pages/Home';

export class App extends React.PureComponent<AppRootProps> {
  render() {
    return (
      <Switch>
        <Route path={prefixRoute(`${ROUTES.Home}`)} component={Home} />
        <Redirect to={prefixRoute(ROUTES.Home)} />
      </Switch>
    );
  }
}
