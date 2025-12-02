import { useState } from "react"

const Header = () => <h1>Unicafe</h1>

const Button = ({text, onClick}) =>{
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let all = good+bad+neutral
  let average = (good-bad)/all
  let positive = good*100/all
  if (good===0 && neutral===0 && bad===0) return(
    <p>No feedback given</p>
  )
  return(
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"Good: "} value={good}/>
          <StatisticLine text={"Neutral: "} value={neutral}/>
          <StatisticLine text={"Bad: "} value={bad}/>
          <StatisticLine text={"All: "} value={all}/>
          <StatisticLine text={"Average: "} value={average}/>
          <StatisticLine text={"Positive: "} value={positive+"%"}/>
        </tbody>
      </table>
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