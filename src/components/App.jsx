// @flow
import * as React from 'react';
import injectSheet from 'react-jss';

import Routes from './Routes';
import styles from '../globalStyles';

class App extends React.Component {
  componentDidMount() {
    window.onload = () => {
      document.getElementById('startingLoader').remove();
    };
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
