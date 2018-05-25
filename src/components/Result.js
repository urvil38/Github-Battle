import React from 'react';
import AppBar from 'material-ui/AppBar';
import queryString from 'query-string';
import api from '../utility/api';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';

function Player(props){
    let info = props.profile;
    let style = {
        'avatar' : {
            'width' : '200px',
            'borderRadius' : '15%',
            'marginBottom' : '15px',
            'marginTop' : '15px'
         },
         'card' : {
             'width' : '350px',
             'textAlign' : 'center',
             'padding' : '30px'
         },
         'texth2' : {
             'margin' : '12px',
             'color' : '#6a119a'
         }
    };
    return(
        <div>
            <div className='column'>
                <Paper zDepth={2} style={style.card}>
                    <h1 className='home-text result-text-h1'>{props.draw ? 'It\'s Draw' : props.label } </h1>
                    <h2 className='home-text result-text-h2'>Score : {props.score}</h2>
                    <img 
                        style={style.avatar}
                        src={info.avatar_url}
                        alt={'Avatar for ' + info.login}
                    />
                    <a target="_blank" href={info.html_url}><h2 style={style.texth2}>@{info.login}</h2></a>
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
                    {info.blog && <div className='height'><h3 style={style.texth2}><a style={{'color' : '#6a119a'}} target='_blank' href={info.blog}>{info.blog}</a></h3></div>}
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
            loading: true,
            open: false,
            snakebarisopen: false,
            copied: false,
            link: null
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleCopy = this.handleCopy.bind(this)
    }

    handleOpen = () => {
        this.setState({
            open: true,
            snakebarisopen: false
        });
    };
    
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    
    handleCopy = () => {
        this.setState({
            open: false,
            snakebarisopen: true
        })
    }

    componentDidMount(){
        let players = queryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then((result) => {
            if(result === null){
                return this.setState({
                    error : 'It\'s seem to look like some error , Please check out both the user exist on Github or check internet connection',
                    loading : false
                })
            }
            this.setState({
                error : null,
                winner : result[0],
                loser : result[1],
                loading : false,
                link : window.location.href
            });
        })
    }

    render(){

        let loser = this.state.loser;
        let winner = this.state.winner;
        let loading = this.state.loading;
        let error = this.state.error;
        let draw = false;
        let style = {
            progressStyle : {
                'textAlign' : 'center',
                'marginTop' : '25px'
            },
            label : {
                'color' : 'white'
            }, 
            labelCancle : {
                'color' : '#6a1b9a'
            }
        }
        const underlineFocusStyle = {
            borderColor : '#6a1b9a'
        }
        const textfieldStyle = {
            'textfield' : {
                marginBottom : '20px',
                textColor : '#6a1b9a'
            }
        }
        const snakebarstyle = {
            backgroundColor : 'black',
            textAlign : 'center'
        }

        if(winner && loser){
            if(winner.score === loser.score){
                draw = true;
            }
        }

        const actions = [
            <FlatButton
                label="Cancel"
                labelStyle={style.labelCancel}
                onClick={this.handleClose}
            />,
            <CopyToClipboard text={this.state.link}
                onCopy={() => this.setState({copied: true})}
            >
                <FlatButton
                label="COPY"
                backgroundColor='#6a1b9a'
                hoverColor='#6a1b9a'
                labelStyle={style.label}
                keyboardFocused={false}
                onClick={this.handleCopy}
                />
            </CopyToClipboard>,
          ];

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
                    {console.log(this.props)}
                    <h2 className='error'>{error}</h2>
                    {/* <Link to='/'> */}
                        <RaisedButton 
                        label="Reset" 
                        backgroundColor='#6a1b9a'
                        labelColor='white'
                        style={style.buttonStyle}
                        />
                    {/* </Link> */}
                </div>
                }
                {!error && !loading &&
                <div className='row' style={{'marginBottom':'50px','height':'auto'}}>
                    <Player
                        draw={draw}
                        label='Winner'
                        score={winner.score}
                        profile={winner.profile}
                        stars={winner.totalStars} />
                    <div className='button-battle'> 
                        <Link className='textcolor'
                            to='/'>
                            <button className='button link-button'>
                                Home
                            </button>
                        </Link>
                        <div>
                            <button className='button' onClick={this.handleOpen}>share</button>
                            <Dialog
                                title="SHARE A RESULT:"
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                                >
                                <TextField
                                style={textfieldStyle.textfield}
                                id='link'
                                fullWidth={true}
                                value={this.state.link}
                                underlineFocusStyle={underlineFocusStyle}
                                
                            />
                            </Dialog>
                            <Snackbar
                                open={this.state.snakebarisopen}
                                message="Link Copied to Clipboard!!"
                                autoHideDuration={2000}
                                style={snakebarstyle}
                            />
                        </div>
                    </div> 
                    <Player 
                        draw={draw}
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

Player.proptypes = {
    label : PropTypes.string.isRequired,
    score : PropTypes.number.isRequired,
    profile : PropTypes.object.isRequired,
    stars : PropTypes.number.isRequired,
    draw : PropTypes.bool.isRequired
}

export default Result;