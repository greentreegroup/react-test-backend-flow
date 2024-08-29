import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const domain = 'dev-vkj8qno81b4rki7m.us.auth0.com'
const clientId = 'ul5kQm9MFiMGVQDWDb8bVx3NflsJnpZy'
const audience = 'https://crowdsource-automateflow.greentree.com'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider
	domain={domain}
	clientId={clientId}
	authorizationParams={{
		redirect_uri: window.location.origin,
		audience
	}}
	>
	    <App />
	</Auth0Provider>,
);
