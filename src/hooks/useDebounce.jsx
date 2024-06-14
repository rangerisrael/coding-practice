import { useEffect,useRef } from "react";

const useDebouceRef = (cb,delay)=>{
  const argsRef = useRef();
  const timeout = useRef();


const clearTimer = ()=>{
  if(timeout.current){
    clearTimeout(timeout.current);
  }
}


useEffect(()=>{
  return clearTimer();
},[]);



const debounceCB = (...args) =>{
  argsRef.current = args;

  clearTimer();

  timeout.current = setTimeout(() => {
    if(argsRef.current){
      cb(...argsRef.current);
    }
  }, delay);

  
}


return debounceCB;

}

export default useDebouceRef;