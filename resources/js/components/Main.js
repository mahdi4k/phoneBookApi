import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./Header";
import './app.scss'
function Main() {
    return (
        <Router>
            <Header/>
            <Router>

            </Router>
        </Router>
    );
}

export default Main;

     ReactDOM.render(<Main/>, document.getElementById('main'));

