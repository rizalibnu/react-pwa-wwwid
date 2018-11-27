// @flow
import '@babel/polyfill';
import 'intersection-observer';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';

import App from './components/App';
import configureStore from './store';
import ScrollToTop from './components/ScrollToTop';
import * as serviceWorker from './serviceWorker';

const theme = {
  brandPrimary: '#1abedb',
  textMuted: '#707070',
  baseColor: '#171717',
};

const initialState = {};
const store = configureStore(initialState);

const rootElement = document.getElementById('root');
const ReactApp = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

if (rootElement == null) {
  throw new Error('no rootElement');
} else {
  ReactDOM.render(<ReactApp />, rootElement);
}

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <ReactApp />,
      rootElement,
    );
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
