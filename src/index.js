import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import  InjectTapEventPlugin  from 'react-tap-event-plugin';

InjectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));

