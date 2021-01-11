import React from 'react';
import './app.scss';
import { Route, Switch, HashRouter } from 'react-router-dom';
import HomePage from './page/home/index';

/**
 * 首页
 * @return {JSX.Element}
 */
function App() {
  return (
    <div className="app">
      <HashRouter>
        <Switch>
          <Route exact path="/home" component={HomePage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
