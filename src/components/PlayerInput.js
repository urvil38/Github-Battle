import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class PlayerInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        let value = e.target.value;
        this.setState({
            username : value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }

    render(){
        const style = {
            margin: 12
        };

        const floattextsyle = {
            color : '#6a1b9a'
        }
        const underlineFocusStyle = {
            borderColor : '#6a1b9a'
        }
        const textfieldStyle = {
            'textfield' : {
                marginBottom : '20px'
            }
        }
        let styleCard = {
            'card' : {
             'width' : '300px',
             'textAlign' : 'center',
             'padding' : '30px',
             'height' : '100%'
         }
        }
        return (
            <div>
                <div className='column'>
                    <Paper zDepth={2} style={styleCard.card}>
                        <form className='column' onSubmit={this.handleSubmit}>
                            <label className='home-text home-text-h2' htmlFor='username'>{this.props.label}</label>
                            <TextField
                                style={textfieldStyle.textfield}
                                id='username'
                                hintText='Github Username'
                                floatingLabelText='Username'
                                value={this.state.username}
                                onChange={this.handleChange}
                                floatingLabelFocusStyle={floattextsyle}
                                underlineFocusStyle={underlineFocusStyle}
                            />
                            <RaisedButton 
                                label="Submit" 
                                backgroundColor='#6a1b9a'
                                type="Submit"
                                labelColor='#FFF'
                                style={style} 
                                disabled={!this.state.username}
                                onTouchTap={this.handleSubmit} />
                        </form>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default PlayerInput;