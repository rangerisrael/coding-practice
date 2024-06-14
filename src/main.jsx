import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ToggleProvider from './provider/toggleProvider.jsx';
import UserProvider from './provider/usersProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ToggleProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</ToggleProvider>
	</React.StrictMode>,
);
