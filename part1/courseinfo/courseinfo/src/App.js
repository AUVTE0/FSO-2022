


  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

const App = () => {


  return (
    <div>
      <Header course = {course}/>
      <Content/>
      <Total sum={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

const Header =  props => <h1>{props.course}</h1>
const Content = () => {
  return (
    <div>
      <Part part = {part1} />
      <Part part = {part2} />
      <Part part = {part3} />
    </div>
  )
}
const Total = props => <p>Number of exercises {props.sum}</p>

const Part = props => <p>{props.part.name} {props.part.exercises}</p>

export default App
