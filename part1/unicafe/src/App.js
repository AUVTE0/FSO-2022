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
      <Part name = 'good' value = {good}/>
      <Part name = 'neutral' value = {neutral}/>
      <Part name = 'bad' value = {bad}/>
      <Part name = 'all' value = {good + neutral + bad}/>
      <Part name = 'average' value = {(good + bad*-1)/(good + neutral + bad)}/>
      <Part name = 'positive' value = {String(good/(good + neutral + bad)*100) + '%'} />
    </div>
  )
}


const Header =  props => <h1>{props.text}</h1>

const Part = props => <p>{props.name} {props.value}</p>


export default App