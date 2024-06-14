
import { isEmpty, startCase } from "lodash";
import RenderTable from "./components/table";
import PopupModal from './components/Modal';
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { useId } from "react";
import { useContext } from "react";
import { ToggleContext } from "./provider/toggleProvider";
import { UserContext } from "./provider/usersProvider";
import { useMemo } from "react";


const InputForm = ({ identity, type,...props }) => {
	return (
		<div className='my-2'>
			<div className='flex'>
				<label className='w-[30%] font-medium' htmlFor='fullName'>
					{startCase(identity)}
				</label>
				<Field className='ml-5 border border-1 border-gray-300 w-[70%] py-1 rounded outline-none focus:outline-none' type={type ?? 'text'} name={identity} id={identity} {...props}/>
			</div>
			<div className='text-center mt-1'>
				<ErrorMessage name={identity} component={'div'} className='text-red-400 font-medium' />
			</div>
		</div>
	);
};



const SeachForm = ()=>{

	const {filtered} = useContext(UserContext);

	return (
		<Formik>
			<Form>
				<div className='flex gap-2 items-center'>
					<InputForm identity={'search'} type='search' onChange={(e) => filtered(e.target.value)} />
				</div>
			</Form>
		</Formik>
	);
}


const AddForm = ()=>{


const {  toggle,setToggle } = useContext(ToggleContext);

const { users,create,update } = useContext(UserContext);

const [data,setData] = useState({});


const formSchema = yup.object().shape({
	id: yup.string(),
	fullName: yup.string().required('Field required'),
	email: yup.string().email('Invalid email').required('Field required'),
	address: yup.string().required('Field required'),
	bio: yup.string().required('Field required'),
	image: yup.string().required('Field required'),
});

const id = useId();


	useMemo(() => {
	if (toggle.action == 'edit') {
		let data = users.find((iitem) => iitem.id == toggle.rowId);

		setData(data);

		
	}
}, [users, toggle.action]);




 const initialValues = {
		id: data.id ?? '',
		fullName: data.fullName ?? '',
		email: data.email ?? '',
		address: data.address ?? '',
		bio: data.bio ?? '',
		image: data.image ?? '',
 };





return (
	<fieldset>
		<legend className='mb-3 font-semibold text-xl text-center'>Add new user</legend>
		<Formik
			initialValues={initialValues}
			validationSchema={formSchema}
			onSubmit={(values) => {
				console.log(values, 'et valluesd');
				if(toggle.action == 'edit'){
						update(data.id, values);
				}else{
							create(values);
				}
				setToggle(false);
			}}
			enableReinitialize
		>
			<Form>
				<InputForm identity={'fullName'} />
				<InputForm identity={'email'} type={'email'} />
				<InputForm identity={'address'} />
				<InputForm identity={'bio'} />
				<InputForm identity={'image'} type='url' />

				<div className='flex justify-end'>
					<button type='submit' className='btn bg-green-300 px-5 py-2 rounded' p>
						Save
					</button>
				</div>
			</Form>
		</Formik>
	</fieldset>
);



}

const RenderIf = ({value,children})=>{
	if (value) {
		return children;
	}
	return null;
}




const App = ()=>{

const { users, deleteOne } = useContext(UserContext);


const { toggle, setToggle } = useContext(ToggleContext);



const thead = ['id','name','email','address','bio','profile','action','action'];





const tbody =
	!isEmpty(users) &&
	users.map((row) => [
		<span className='px-5 text-center'>{row.id}</span>,
		<span className='px-5 text-center'>{row.fullName}</span>,
		<span className='px-5 text-center'>{row.email}</span>,
		<span className='px-5 text-center'>{row.address}</span>,
		<span className='px-5 text-center'>{row.bio}</span>,
		<img className='py-2 text-center' src={row.image} alt='bio.png' width={50} height={50} />,
		<span onClick={() => setToggle({ modal: true, action: 'edit', rowId: row.id })} className='text-indigo-800 text-lg p-5'>
			Edit
		</span>,
		<span onClick={() => deleteOne(row.id)} className='text-indigo-800 text-lg p-5 cursor-pointer'>
			Delete
		</span>,
	]);



return (
	<div className='w-[1400px] h-full mx-auto mt-10'>
		<div className='flex flex-col justify-evenly items-center '>
			<SeachForm/>
			<RenderTable heads={thead} bodies={tbody} />
			<div className='w-full flex justify-end mt-5'>
				<button onClick={() => setToggle({modal:true,action:'add'})} className='btn bg-indigo-800 px-6 py-4 rounded-full text-white font-bold'>
					+
				</button>
			</div>
		</div>

		<RenderIf value={toggle.modal}>
			<PopupModal>
				<AddForm   />
			</PopupModal>
		</RenderIf>
	</div>
);

}

export default App;