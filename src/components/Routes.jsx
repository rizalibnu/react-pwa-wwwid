// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => null;

const Home = Loadable({
  loader: () => import('../containers/HomeContainer'),
  loading: Loading,
});

const Article = Loadable({
  loader: () => import('../containers/ArticleContainer'),
  loading: Loading,
});

const Category = Loadable({
  loader: () => import('../containers/CategoryContainer'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import('../containers/NotFoundContainer'),
  loading: Loading,
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
