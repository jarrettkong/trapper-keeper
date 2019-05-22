import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import 'normalize.css';
import './index.scss';

const store = createStore(rootReducer, composeWithDevTools());

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
