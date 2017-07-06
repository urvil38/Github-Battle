import React from 'react';
import AppBar from 'material-ui/AppBar';
import queryString from 'query-string';
import api from '../utility/api';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider'

function Player(props){
    let info = props.profile;
    let style = {
        'avatar' : {
            'width' : '200px',
            'borderRadius' : '15%',
            'marginBottom' : '15px'
         },
         'card' : {
             'width' : '300px',
             'textAlign' : 'center',
             'padding' : '30px'
         },
         'texth2' : {
             'margin' : '12px',
             'color' : '#6a119a',
             'width' : '200px'
         }
    };
    return(
        <div>
            <div className='column'>
                <Paper zDepth={2} style={style.card}>
                    <h1 className='home-text result-text-h1'>{props.label}</h1>
                    <h2 className='home-text result-text-h2'>Score : {props.score}</h2>
                    <img 
                        style={style.avatar}
                        src={info.avatar_url}
                        alt={'Avatar for ' + info.login}
                    />
                    <h2 style={style.texth2}>@{info.login}</h2>
                    <Divider />
                    {info.name && <h3 style={style.texth2}>{info.name}</h3>}
                    <Divider />
                    {info.location && <h3 style={style.texth2}>{info.location}</h3>}
                    <Divider />
                    {<h3 style={style.texth2}>FOLLOWERS : {info.followers}</h3>}
                    <Divider />
                    {<h3 style={style.texth2}>FOLLOWING : {info.following}</h3>}
                    <Divider />
                    {<h3 style={style.texth2}>STARS : {props.stars}</h3>}
                    <Divider />
                    {<h3 style={style.texth2}>PUBLIC REPOS : {info.public_repos}</h3>}
                    <Divider />
                    {info.blog && <div className='anchor'><h3 style={style.texth2}><a style={{'color' : '#6a119a'}} href={info.blog}>{info.blog}</a></h3></div>}
                    <Divider />
                </Paper>
            </div>
        </div>
    )
}

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            loser: null,
            winner: null,
            loading: true
        }
    }

    componentDidMount(){
        let players = queryString.parse(this.props.location.search);
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then((result) => {
            if(result === null){
                return this.setState({
                    error : 'It\'s seem to look like some error , Please check out both the user exist on Github',
                    loading : false
                })
            }
            this.setState({
                error : null,
                winner : result[0],
                loser : result[1],
                loading : false
            });
        })
    }

    render(){

        let loser = this.state.loser;
        let winner = this.state.winner;
        let loading = this.state.loading;
        let error = this.state.error;
        console.log(this.state);
        let style = {
            progressStyle : {
                'textAlign' : 'center',
                'marginTop' : '25px'
            } 
        }

        return(
            <div>
                <AppBar 
                title='BATTLE  FIELD'
                showMenuIconButton={false}
                zDepth={2}
                titleStyle={{'textAlign' : 'center'}}
                />
                {loading && 
                <div style={style.progressStyle} >
                     <CircularProgress size={60} thickness={7} />
                </div>
                }
                {error && !loading && 
                <div className='div-error'>
                    <h2 className='error'>{error}</h2>
                    <Link to='/'>
                        <RaisedButton 
                        label="Reset" 
                        backgroundColor='#6a1b9a'
                        labelColor='white'
                        style={style.buttonStyle} 
                        />
                    </Link>
                </div>
                }
                {!error && !loading &&
                <div className='row'>
                    <Player
                        label='Winner'
                        score={winner.score}
                        profile={winner.profile}
                        stars={winner.totalStars} />
                    <div className='button-battle'> 
                        <Link
                           className='button result-button'
                            to='/'>
                        Home
                        </Link>
                    </div> 
                    <Player 
                        label='Loser'
                        score={loser.score}
                        profile={loser.profile}
                        stars={loser.totalStars} />    
                </div>
                }
            </div>

        )
    }
}

export default Result;