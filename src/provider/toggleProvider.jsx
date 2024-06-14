import { useState } from "react";
import { createContext } from "react";

const initialValues = {
  toggle:false
}


export const ToggleContext = createContext(initialValues);


const ToggleProvider  = ({children}) =>{

  const [toggle, setToggle] = useState({modal:false,action:'add',rowId:null});


  return <ToggleContext.Provider value={{ toggle, setToggle }}>{children}</ToggleContext.Provider>;
}


export default ToggleProvider;