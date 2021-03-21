import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './app/components/Layout';
import AuthorizeRoute from './app/components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './app/components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './app/components/api-authorization/ApiAuthorizationConstants';
import {Redirect} from "react-router-dom";
import Counter from './app/Pages/Counter';
import Dashboard from "./app/Pages/Dashboard";
import DeskDetail from "./app/Pages/DeskDetail";
import FetchData from './app/Pages/FetchData';
import CreateTicket from "./app/Pages/CreateTicket";
import ViewTicket from "./app/Pages/ViewTicket";


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/'>
                    <Redirect to={'/dashboard'}/>
                </Route>
                <AuthorizeRoute path='/dashboard' component={Dashboard}/>
                <AuthorizeRoute exact path='/desk/:slug' component={DeskDetail}/>
                <AuthorizeRoute path='/desk/:slug/ticket/:ticketId' component={ViewTicket}/>
                <AuthorizeRoute exact path='/desk/:slug/ticket' component={CreateTicket}/>
                <AuthorizeRoute path='/counter' component={Counter}/>
                <AuthorizeRoute path='/fetch-data' component={FetchData}/>
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
            </Layout>
        );
    }
}
