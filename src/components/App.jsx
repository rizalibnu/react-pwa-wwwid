// @flow
import * as React from 'react';
import injectSheet from 'react-jss';

import Routes from './Routes';
import styles from '../globalStyles';

const App = () => (
  <div className="App">
    <Routes />
  </div>
);

export default injectSheet(styles)(App);
