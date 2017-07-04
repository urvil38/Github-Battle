import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

let style = {
    progressStyle : {
        'textAlign' : 'center',
        'marginTop' : '25px',
        'height' : '80vh'
    } 
}
function CircularProgressThick(){
    return(
        <div style={style.progressStyle} >
            <CircularProgress size={60} thickness={7} />
        </div>
    )
}

export default CircularProgressThick;

