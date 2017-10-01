import React from 'react';
import ProfilePreview from './ProfilePreview';
import PlayerInput from './PlayerInput';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Battle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playerOneName : '',
            playerTwoName : '',
            playerOneImage : null,
            playerTwoImage : null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id , username){
        this.setState(() => {
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        })
    }

    handleReset(id){
        this.setState(() => {
            let newState = {};
            newState[id+'Name'] = '';
            newState[id+'Image'] = null
            return newState;
        })
    }



    render(){
        let playerOneName = this.state.playerOneName;
        let playerTwoName = this.state.playerTwoName;
        let playerOneImage = this.state.playerOneImage;
        let playerTwoImage = this.state.playerTwoImage;
        let match = this.props.path.match;

        return(
            <div className='column-battle'>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput 
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}
                        />
                    }

                    {playerOneImage &&
                        <ProfilePreview 
                        id='playerOne'
                        username={playerOneName}
                        avatar={playerOneImage}
                        onReset={this.handleReset}
                        />
                    }

                    {playerOneImage && playerTwoImage 
                    ?
                    <div className='button-battle'> 
                        <button className='button link-button'>
                            <Link className='textcolor'
                                to={{
                                    pathname: match.url + 'results',
                                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                                }}>
                            Battle
                            </Link>
                        </button>
                    </div> 
                    : <div className='vs'><h1 className='vsh1'>Vs</h1></div>    
                    }

                    {playerTwoImage &&
                        <ProfilePreview 
                        id='playerTwo'
                        username={playerTwoName}
                        avatar={playerTwoImage}
                        onReset={this.handleReset}
                        />
                    }
   
                    {!playerTwoName &&
                     <PlayerInput 
                      id='playerTwo'
                      label='Player Two'
                      onSubmit={this.handleSubmit}
                     />
                    }   
                </div>
            </div>
        )
    }
}

PlayerInput.propTypes = {
    id : PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    onSubmit : PropTypes.func.isRequired
}

export default Battle;