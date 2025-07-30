import { useState,useEffect } from 'react'
import './App.css'

function useIsOnline() 
{
    const [isOnline,setIsOnline] = useState(window.navigator.onLine);
    
    useEffect(() => {
      window.addEventListener("online",()=>{setIsOnline(true)})
      window.addEventListener("offline",()=>{setIsOnline(false)})
    }, [])

    return isOnline;

}

function useDebounce(input,timeOut) {
  const [debouncedVal, setDebouncedVal] = useState(input);
  useEffect(() => {
    setTimeout(() => {
      setDebouncedVal(input);
    }, timeOut);
  }, [input]);
  return debouncedVal;
}

function App() {
  const isOnline = useIsOnline();
  const [input,setInput] = useState("");
  const value = useDebounce(input,600);
  return (
    <>
      {
        isOnline?(
          <h1>"You are online"</h1>
        ):(
          <h1>"You are offline"</h1>
        )
      }
      <input placeholder='Enter your words here' onChange={(e)=>{setInput(e.target.value)}}/>
      Debounced Value is {value}
    </>
  )
}

export default App
