import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './app/components/Layout';
import { FetchData } from './app/components/FetchData';
import Counter  from './app/components/Counter';
import AuthorizeRoute from './app/components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './app/components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './app/components/api-authorization/ApiAuthorizationConstants';
import {Redirect} from "react-router-dom";
import Dashboard from "./app/Pages/Dashboard";



export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/'>
            <Redirect to={'/dashboard'}/>
        </Route>
        <AuthorizeRoute path='/dashboard' component={Dashboard} />
        <AuthorizeRoute path='/counter' component={Counter} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
