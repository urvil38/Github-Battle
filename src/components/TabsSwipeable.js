import React from 'react';
import { Tab , Tabs } from 'material-ui/Tabs';
import SwipebleViews from 'react-swipeable-views';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';
import PropTypes from 'prop-types';

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
                    <Tab label='Popular repositories' value={2} />
                </Tabs>
                <SwipebleViews animateHeight='true'
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange}
                >
                    <div>
                        <Home onChange={this.handleChange} />
                    </div>
                    <div>
                        <Battle path={this.props} onChange={this.handleChange}/>
                    </div>
                    <div>                       
                        <Popular />
                    </div>
                </SwipebleViews>
            </div>
        )
    }
}

Tabs.propTypes = {
    onChange : PropTypes.func.isRequired,
    value : PropTypes.number
}

Tab.propTypes = {
    label : PropTypes.string.isRequired,
    value : PropTypes.number
}

SwipebleViews.propTypes = {
    onChangeIndex : PropTypes.func.isRequired,
    index : PropTypes.number.isRequired
}

export default TabsSwipeable;