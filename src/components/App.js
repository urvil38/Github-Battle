import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TabsSwipeable from './TabsSwipeable';
class App extends React.Component{
    render(){
        return (
                <MuiThemeProvider>
                     <TabsSwipeable />        
                </MuiThemeProvider>
        )
    }
}

export default App;