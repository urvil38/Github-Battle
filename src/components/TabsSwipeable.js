import React from 'react';
import { Tab , Tabs } from 'material-ui/Tabs';
import SwipebleViews from 'react-swipeable-views';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';

class TabsSwipeable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex : 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.setState({
            slideIndex : value
        })
    }

    render(){
        return(
            <div>
                <Tabs 
                onChange={this.handleChange}
                value={this.state.slideIndex}
                >
                    <Tab label='Home' value={0} />
                    <Tab label='Battle' value={1} />
                    <Tab label='Popular repos' value={2} />
                </Tabs>
                <SwipebleViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange}
                >
                    <div>
                        <Home />
                    </div>
                    <div>
                        <Battle />
                    </div>
                    <div>
                        <Popular />
                    </div>
                </SwipebleViews>
            </div>
        )
    }
}

export default TabsSwipeable;