import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AboutPage from './Pages/AboutPage';
import HomePage from './Pages/HomePage';

function DefaultRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/about">
                    <AboutPage />
                </Route>
            </Switch>
        </Router>
    )
}

export default DefaultRouter;