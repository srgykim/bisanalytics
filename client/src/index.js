import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from './Context';
import App from './components/App';
import './css/custom.css';
import './i18n';

ReactDOM.render(
    <Provider>
        {/* Suspense используется для того, чтобы не отображать страницу до тех пор, пока переводы не загрузятся. */}
        <Suspense fallback={<div>Loading...</div>}>
            <App />
        </Suspense>
    </Provider>,
    document.getElementById('root')
);
