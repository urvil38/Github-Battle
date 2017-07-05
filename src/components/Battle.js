import React from 'react';
import ProfilePreview from './ProfilePreview';
import PlayerInput from './PlayerInput';
import { Link } from 'react-router-dom';

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
            newState[id + 'Image'] = 'http://github.com/' + username + '.png?size=200';
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
        console.log(match);

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

                    {playerOneImage !== null &&
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
                        <Link
                           className='button result-button'
                            to={{
                                pathname: match.url + 'results',
                                search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                            }}>
                        Battle
                        </Link>
                    </div> 
                    : <div className='vs'><h1 className='vsh1'>Vs</h1></div>    
                    }

                    {playerTwoImage !== null &&
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
                {/*{playerOneImage && playerTwoImage &&
                    <div className='bottom-button'>
                        <Link
                            className='button'
                            to={{
                                pathname: match.url + '/results',
                                search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                            }}>
                        Battle
                        </Link>
                    </div>
                    }    */}
            </div>
        )
    }
}

export default Battle;