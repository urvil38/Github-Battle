import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

class ProfilePreview extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            isAvatar : false
        }
        setTimeout(() => {
        this.setState({
            isAvatar : true
         })
    },2000)
    }
      
    render(){
        let style = {
        'avatar' : {
            'width' : '200px',
            'borderRadius' : '15%',
            'marginBottom' : '25px'
         },
         'textH2' : {
             'color' : '#6a1b9a',
             'fontSize' : '25px',
             'border' : '2px solid #6a1b9a',
             'padding' : '20px'
         },
         'buttonStyle' : {
             margin : 12
         },
         'card' : {
             'width' : '300px',
             'textAlign' : 'center',
             'padding' : '30px'
         }
    };
    return(
        <div>
            <div className='column'>
                <Card style={style.card}>
                    {!this.state.isAvatar
                     ? <CircularProgress />
                     : <img 
                        style={style.avatar}
                        src={this.props.avatar}
                        alt={'Avatar for ' + this.props.username}
                    />}
                    <h2 style={style.textH2}>{this.props.username}</h2>
                    <RaisedButton 
                    label="Reset" 
                    backgroundColor='#6a1b9a'
                    labelColor='white'
                    style={style.buttonStyle} 
                    onTouchTap={this.props.onReset.bind(null,this.props.id)} />
                </Card>
            </div>
        </div>
    )}
}

export default ProfilePreview;