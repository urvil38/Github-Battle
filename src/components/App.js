import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TabsSwipeable from './TabsSwipeable';
import { BrowserRouter as Router , Route } from 'react-router-dom';

class App extends React.Component{
    render(){
        return (
            <MuiThemeProvider>
            <Router>
                <div>
                    <Route exact path='/' component={TabsSwipeable} />
                    <Route path='/result' component={TabsSwipeable} />       
                    </div>
            </Router>
                </MuiThemeProvider>
        )
    }
}

export default App;