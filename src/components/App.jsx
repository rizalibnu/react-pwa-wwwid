// @flow
import * as React from 'react';
import injectSheet from 'react-jss';

import Routes from './Routes';
import styles from '../globalStyles';

type Props = {};

class App extends React.Component<Props> {
  componentDidMount() {
    const elem = document.getElementById('startingLoader');
    window.onload = () => {
      if (elem) {
        elem.remove();
      }
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
