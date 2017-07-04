import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TabsSwipeable from './TabsSwipeable';
class App extends React.Component{
    render(){
        return (
                <MuiThemeProvider>
                    <div className='container'>
                        <TabsSwipeable />        
                    </div>
                </MuiThemeProvider>
        )
    }
}

export default App;