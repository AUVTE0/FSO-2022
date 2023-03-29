import { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad} = props
  
  if(good + neutral + bad === 0){
    return <p>No feedback given</p>
  }
  return(
    <div>
      <StatisticLine text = 'good' value = {good}/>
      <StatisticLine text = 'neutral' value = {neutral}/>
      <StatisticLine text = 'bad' value = {bad}/>
      <StatisticLine text = 'all' value = {good + neutral + bad}/>
      <StatisticLine text = 'average' value = {(good + bad*-1)/(good + neutral + bad)}/>
      <StatisticLine text = 'positive' value = {String(good/(good + neutral + bad)*100) + '%'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text = 'give feedback'/>
      <Button text = 'good' onClick = {() => setGood(good+1)} />
      <Button text = 'neutral' onClick = {() => setNeutral(neutral+1)} />
      <Button text = 'bad' onClick = {() => setBad(bad+1)} />
      <Header text = 'statistics'/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}


const Header =  props => <h1>{props.text}</h1>
const Button = props => <button onClick={props.onClick}>{props.text}</button>
const StatisticLine = props => <p>{props.text} {props.value}</p>


export default App