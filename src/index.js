// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';

import App from './components/App';
import configureStore from './store';
import ScrollToTop from './components/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';

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

ReactDOM.render(<ReactApp />, rootElement);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <ReactApp />,
      rootElement,
    );
  });
}

registerServiceWorker();
