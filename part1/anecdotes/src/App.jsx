import { useState } from "react"

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)

  const generateRandom = (min, max) =>{
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min+1))+min
  }

  const selectAnecdote = () => {
    let random = generateRandom(0,7)
    console.log("Anecdote index: "+random)
    setSelected(random)
  }

  const refreshMostVoted = (newVotes) => {
    let maxValue = Math.max(...newVotes)
    let index = newVotes.indexOf(maxValue)
    setMostVoted(index)
    console.log("Most voted: "+index)
  }

  const voteAnecdote = () => {
    let newVotes = [...votes]
  
    newVotes[selected] += 1
    setVotes(newVotes)
    refreshMostVoted(newVotes)
    console.log("Votes: "+newVotes)
  }

  return (
    <>
      <h1>Anecdote Of the Day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={selectAnecdote}>Next anecdote</button>
      <button onClick={voteAnecdote}>vote</button><br />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes</div>
    </>
  )
}

export default App
