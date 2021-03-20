import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import CssBaseLine from '@material-ui/core/CssBaseline'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import './App.css';
import { routes } from '../../config/routes'
import { MessageProvider } from '../../context/messageContext'

const App = () => {
  return (
    <CssBaseLine>
      <MessageProvider>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <Router>
            <Switch>
              {routes.map((route, index) => (
                <Route exact={true} key={index} {...route} />
              ))}
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </MessageProvider>
    </CssBaseLine>
  );
}

export default App;
