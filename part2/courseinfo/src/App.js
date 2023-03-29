const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key = {part.id} part = {part}/>)}
  </>

const Course = ({course}) => {
  let parts = course.parts
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts.map(p => p.exercises).reduce((s,p) => s+=p)} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
