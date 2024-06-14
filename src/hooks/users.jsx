

// name,email.address.bio


import { useState,useEffect,useCallback } from "react";
import { faker } from '@faker-js/faker';

import { isEmpty } from "lodash";
import useDebouceRef from "./useDebounce";


const useUsers = () => {

  
const [users, setUser] = useState([]);



useEffect(() => {
	let mounted = true;

	function getUsers() {
		let data = [];

		for (let i = 0; i < 5; i++) {
			let newUser = generatUsers();
			data.push(newUser);
		}

		if (mounted) {
			setUser(data);
		}
	}

	getUsers();

	return () => {
		mounted = false;
	};
}, []);



	const generatUsers = () => {
		const id = faker.string.uuid();
		const fullName = faker.person.fullName();
		const email = faker.internet.email();
		const address = faker.location.streetAddress();
		const bio = faker.lorem.sentence();
		const image = faker.image.avatar();

		return {
			id,
			fullName,
			email,
			address,
			bio,
			image,
		};
	};



	const create = useCallback(
		(newUser) => {
			

			try {
				let newAppendValue = [...users, { ...newUser }];

				console.log('created', newAppendValue);

		
				setUser(newAppendValue);
			} catch (error) {}
		},
		[users],
	);

	



function update(id, updatedUser) {
	const index = users.findIndex((item) => item.id === id);
	

	if (index !== -1) {
		const updatedUsers = [...users];
		updatedUsers[index] = Object.assign({}, updatedUsers[index], updatedUser);

		setUser(updatedUsers);
	} else {
		console.log('No associated user found');
	}
}


  function deleteOne(id) {
    let getId = users.findIndex((item) => item.id == id);

    if (getId !== -1) {
      // Create a new array with the item removed
      const updatedUsers = [...users];
      updatedUsers.splice(getId, 1);

      setUser(updatedUsers);
    } else {
      console.log('no associated id');
    }
  }


    function deleteFilteredOne(id) {
			let deleted = users.filter((item) => item.id !== id);

			setUser(deleted);
		}


		const filtered = useDebouceRef((searchTerm) => {
			
			    let shallowCopy = [...users];

				if(!isEmpty(searchTerm)){
			

					let filteredResults = users.filter((user) => {
						// Iterate over the keys of each user object and check if any value matches the search term
					
						return Object.values(user).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
					});
			

					setUser(filteredResults);
				}else{

					console.log(shallowCopy)

					setUser(shallowCopy);

				}
		}, 500);




	return {
		users: users,
		create: create,
		update: update,
		deleteOne: deleteOne,
		deleteFilteredOne: deleteFilteredOne,
		filtered: filtered,
	};
};


export default useUsers;