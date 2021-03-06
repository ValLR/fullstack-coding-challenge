import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import ConnectedApp from './components/app/App';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
);
