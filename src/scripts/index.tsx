import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import Main from './components/main';

import MainPage from './MainPage';

//

ReactDOM.render(
    <Provider store={ store }>
        <Main />
    </Provider>,
    document.getElementById('reactRoot')
);

//

window.addEventListener( 'DOMContentLoaded', MainPage.init );

window['mainPage'] = MainPage;