import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import App from './components/app/App';
import 'bootstrap/dist/css/bootstrap.min.css';

// setup mock backend
import { setupMockBackend } from './helpers';
setupMockBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
