import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SnackbarProvider } from 'notistack'
import MomentUtils from '@date-io/moment'
import "moment/locale/zh-tw"

import store from 'stores';
import './index.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation1: {
                boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)'
            }
        },
        MuiTypography: {
            body1: {
                fontFamily: '"Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif'
            }
        }
    }
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <Router>
                    <MuiPickersUtilsProvider utils={MomentUtils} >
                        <App />
                    </MuiPickersUtilsProvider>
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
