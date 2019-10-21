import React from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from '../helpers';
import Homepage from './HomePage';
import LoginPage from './LoginPage';
import OrderEditPage from './OrderEditPage';

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <React.Fragment>
          <PrivateRoute exact path="/" component={Homepage} />
          <PrivateRoute path="/order/:id/edit" component={OrderEditPage} />
          <Route exact path="/login" component={LoginPage} />
        </React.Fragment>
      </Router>
    </div>
  )
}

export default App;