import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card } from 'material-ui/Card';
import api from '../utility/api';
import CircularProgressThick from './Progress';

//---------------------------------------------------------------//

function handleAvtive(tab) {
  tab.props.onSelect(tab.props.label);
}

function SelectedLanguage(props) {
  let languages = ['All', 'Javascript', 'CSS', 'Ruby', 'Java', 'Python', 'Go', 'C', 'PHP'];
  return (
    <Tabs>
      {languages.map((lang) => {
        return (
          <Tab
            label={lang}
            key={lang}
            onSelect={props.onSelect}
            onActive={handleAvtive}
          >
          </Tab>
        )
      })}
    </Tabs>
  )
}

//--------------------------------------------------------------------------//

let style = {
  ul: {
    'display': 'flex',
    'justifyContent': 'space-around',
    'flexWrap': 'wrap'
  },
  li: {
    'margin': '20px',
    'textAlign': 'center'
  },
  popularrank: {
    'fontSize': '20px',
    'margin': '10px',
    'fontWeight': 'bold'
  },
  spacelistitems: {
    'marginBottom': '7px'
  },
  avatar: {
    'width': '150px',
    'borderRadius': '15%',
    'marginBottom': '5px'
  },
  card: {
    'margin': '15px 6px'
  }
};

function RepoGrid(props) {
  return (
    <ul style={style.ul}>
      {props.repos.map((repo, index) => {
        return (
          <Card style={style.card} key={index}>
            <li style={style.li}>
              <div style={style.popularrank}>#{index + 1}</div>
              <ul style={style.spacelistitems} className='spacelistitems'>
                <li>
                  <img
                    style={style.avatar}
                    src={repo.owner.avatar_url}
                    alt={'Avatar for ' + repo.owner.login}
                  />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
            </li>
          </Card>
        )
      })}
    </ul>
  )
}

//--------------------------------------------------------------------------//
class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: null
    })

    api.fetchRepo(lang)
      .then((repos) => {
        this.setState({
          repos: repos
        })
      })
  }

  render() {
    return (
      <div className='lang-list'>
        <SelectedLanguage onSelect={this.updateLanguage} />
        {!this.state.repos
          ? <CircularProgressThick />
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

export default Popular;