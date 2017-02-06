import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store';

import './App.scss';
import App from './App';
import { DashboardContainer } from 'components';

const Root = () => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRedirect to="/dashboard/home" />
          <Route path="/dashboard/:name" component={DashboardContainer} />
        </Route>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
