import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from '../components/Game';
import MainMenu from '../components/MainMenu';


const Routes=()=> {
    return (
        <Router>
            <Switch>
                <Route path="/game" exact component={Game} />
                <Route path="/" exact component={MainMenu} />
            </Switch>
        </Router>
    )
}
export default Routes
