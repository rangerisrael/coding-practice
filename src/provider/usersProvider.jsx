import { createContext } from 'react';
import useUsers from '../hooks/users';


// Define initial values or assign them defaults if needed
const initialValues = {
	users: [], 
	deleteOne: () => {}, 
	active: null,
	create: () => {}, 
};

export const UserContext = createContext(initialValues);

const UserProvider = ({ children }) => {
	// Fetch values using custom hook
	const { users, deleteOne, active, create, update, filtered } = useUsers();

	return <UserContext.Provider value={{ users, deleteOne, active, create, update, filtered }}>{children}</UserContext.Provider>;
};

export default UserProvider;
