import React from 'react';
import ReactDOM from  'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import Dashboard from '../components/Dashboard';
import EditExpensePage from '../components/EditExpensePage';
import Header from '../components/Header';
import HelpPage from '../components/Help';
import NotFoundPage from '../components/Page404';

const AppRouter = () => (
    // Because here we'll define many routes so we use BrowserRouter
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component = { Dashboard } exact={true} />
                <Route path="/create" component = { AddExpensePage } />
                <Route path="/edit/:id" component = { EditExpensePage } />
                <Route path="/help" component = { HelpPage } />
                <Route component = { NotFoundPage } />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;