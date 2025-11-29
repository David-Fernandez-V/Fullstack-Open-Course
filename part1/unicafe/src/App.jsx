import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0)

  const handelClick = () =>{
    setCounter(counter+1)
    console.log("Clicked")
  }

  return (
    <>
      <div>{counter}</div>
      <button onClick={handelClick}>+</button>
      <button onClick={() => setCounter(counter-1)}>-</button>
    </>
  )
}

export default App