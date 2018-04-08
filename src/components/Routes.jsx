// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from 'loadable-components';

const Loading = () => (
  <div>
    <div>Loading...</div>
  </div>
);

const HasErrored = () => (
  <div>
    <div>Error...</div>
  </div>
);

export const Home = loadable(() => import('../containers/HomeContainer'), {
  LoadingComponent: Loading,
  ErrorComponent: HasErrored,
});

export const Article = loadable(() => import('../containers/ArticleContainer'), {
  LoadingComponent: Loading,
  ErrorComponent: HasErrored,
});

export const Category = loadable(() => import('../containers/CategoryContainer'), {
  LoadingComponent: Loading,
  ErrorComponent: HasErrored,
});

export const NotFound = loadable(() => import('../containers/NotFoundContainer'), {
  LoadingComponent: Loading,
  ErrorComponent: HasErrored,
});

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/articles/:slug" component={Article} />
    <Route path="/categories/:slug" component={Category} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
