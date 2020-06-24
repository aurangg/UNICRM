/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

/*Custome code start*/
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from "./reducers";

/*Custome code end*/

import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import TeacherLayout from "layouts/Teacher.js";
import MentorLayout from "layouts/Mentor.js";
import HodLayout from "layouts/Hod.js";
import CommitteeLayout from "layouts/Committee.js";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

import UOLAuthLayout from './layouts/UOLAuth';
import Auth from './hoc/authhoc';

const hist = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Router history={hist}>
        <Switch>
          <Route path="/rtl" component={RtlLayout} />
          <Route path="/committee" component={CommitteeLayout} />
          <Route path="/hod" component={HodLayout} />
          <Route path="/mentor" component={MentorLayout} />
          <Route path="/teacher" component={Auth(TeacherLayout,true,"teacher")} />
          <Route path="/auth" component={AuthLayout} />
          <Route path="/admin" component={Auth(AdminLayout,true,"admin")} />
          <Route path="/uolauth" component={UOLAuthLayout} />
          <Redirect from="/" to="/uolauth/login-page" />
        </Switch>
      </Router>
    </BrowserRouter>
   </Provider>
   ,document.getElementById("root")
);
