import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./Header";
import './app.scss'
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import HomeScreen from "../Screens/HomeScreen";

function Main() {
    return (

        <Router>


                <Switch>
                    <Route  path='/login' component={LoginScreen}/>
                    <Route   path='/' component={HomeScreen} exact />
                    <Route path='/register' component={RegisterScreen}/>
                </Switch>

        </Router>
    );
}

export default Main;

ReactDOM.render(<Main/>, document.getElementById('main'));

