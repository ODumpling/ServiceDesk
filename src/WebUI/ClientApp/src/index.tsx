import ReactDOM from 'react-dom';
import React from "react";
import {BrowserRouter} from 'react-router-dom';
import App from './App';

import './index.css'
import {Provider} from "react-redux";
import {store} from "./app/store/store";
//import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string | undefined;
const rootElement = document.getElementById('root');


ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    rootElement);

// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();

