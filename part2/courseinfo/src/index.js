import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course}) => {
	return(
		<>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</>
	)
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
	const parts = course.parts
  	const total_exercises = parts.reduce(
  		(total_exercises,part) => total_exercises + part.exercises,0
  		)
  return(
    <p><b>total of {total_exercises} exercises </b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
	const parts=course.parts
	console.log(parts)
  return (
    <div>
    {parts.map(part => 
    	<Part key = {part.id} part={part} />
    	)}
    
      
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

ReactDOM.render(<App />, document.getElementById('root'))