import { clsx } from 'clsx';
import React from 'react'
import { useContext } from 'react';
import { ToggleContext } from '../provider/toggleProvider';
import useUsers from '../hooks/users';

const PopupModal = ({children}) => {

const { setToggle } = useContext(ToggleContext);

const { users, deleteOne, active } = useUsers();


console.log(users, 'get active record');
console.log(active,'get active record');

  return (
		<div className='absolute top-0 bottom-0 left-0 right-0 w-screen h-screen text-black text-opacity-50 or bg-black bg-opacity-50'>
			<div className='flex flex-col justify-center items-center h-full'>
				{/*  iwant this not hied when someone clicn in this part of box */}
				<div className={clsx('bg-white w-auto h-2/2 rounded-md animate-fade relative')}>
					<p onClick={() => setToggle(false)} className='flex w-auto justify-end items-center font-bold text-navy pr-5 pt-5 text-3xl'>
						<span>&times;</span>
					</p>

					<div  className='p-4'>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PopupModal;
