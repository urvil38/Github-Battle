import React from 'react';
import PropTypes from 'prop-types';

Home.propTypes = {
    onChange : PropTypes.func.isRequired
}

function Home(props){
        return(
            <div className='home-container'>
                <h1 className='home-text home-text-h1'>Github Battle</h1>
                <h2 className='home-text home-text-h2'>Battle with Your Friend On Github Profile</h2>
                <button className='button' onClick={props.onChange.bind(null,1)} >Battle</button>
            </div>    
    )
}

export default Home;