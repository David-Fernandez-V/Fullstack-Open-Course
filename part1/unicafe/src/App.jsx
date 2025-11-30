import { useState } from "react"

const Header = () => <h1>Unicafe</h1>

const Button = ({text, onClick}) =>{
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let all = good+bad+neutral
  if (good===0 && neutral===0 && bad===0) return(
    <p>No feedback given</p>
  )
  return(
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {(good-bad)/all}</p>
      <p>Positive: {good*100/all}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header/>
      <Button text={"Good"} onClick={()=>setGood(good+1)}/>
      <Button text={"Neutral"} onClick={()=>setNeutral(neutral+1)}/>
      <Button text={"Bad"} onClick={()=>setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App