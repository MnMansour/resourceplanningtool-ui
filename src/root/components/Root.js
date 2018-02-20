// @flow

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Hello from '../../hello/components/Hello';
import Header from '../../header/components/Header';
import ProjectsContainer from '../../projects-container/components/ProjectsContainer';
import CustomersContainer from '../../customers-container/components/CustomersContainer';
import PeopleContainer from '../../people-container/components/PeopleContainer';
import CustomerView from '../../customer-view/components/CustomerView';
import NotFound from '../../not-found/components/NotFound';
import css from './Root.css';

const Root = () => (
  <div className={css.component}>
    <Router>
      <div className={css.routes}>
        <Header />
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route path="/projects" component={ProjectsContainer} />
          <Route
            path="/customers"
            exact={true}
            component={CustomersContainer}
          />
          <Route path="/customers/:id" component={CustomerView} />
          <Route path="/people" component={PeopleContainer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default Root;
