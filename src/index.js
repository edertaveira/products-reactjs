import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Api from './Api'

ReactDOM.render(<App api={Api} />, document.getElementById('root'));
registerServiceWorker();
