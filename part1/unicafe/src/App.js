import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text = 'give feedback'/>
      <button onClick = {() => setGood(good+1)}>good</button>
      <button onClick = {() => setNeutral(neutral+1)}>neutral</button>
      <button onClick = {() => setBad(bad+1)}>bad</button>
      <Header text = 'statistics'/>
      <Part name = 'good' total={good}/>
      <Part name = 'neutral' total={neutral}/>
      <Part name = 'bad' total={bad}/>
    </div>
  )
}


const Header =  props => <h1>{props.text}</h1>

const Part = props => <p>{props.name} {props.total}</p>


export default App