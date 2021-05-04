import React from 'react';
import { parseJsonText } from 'typescript';
import {CoursePart} from './types'

const App = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

const Header = ( {courseName}:{ courseName:string}) => (
      <>
        <h1>{courseName}</h1>
      </>
);

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = ({part}: {part:CoursePart }) => {
    switch(part.type){
      case "normal":
        return(
          <>
          <p><b>{part.name} {part.exerciseCount} </b><br></br>{part.description} </p>
          </>
        )
      case "groupProject":
        return(
          <>
          <p><b> {part.name} {part.exerciseCount}</b>
          <br></br>project exercises {part.groupProjectCount}</p>
          </>
        )
        
      case "submission":
        return (
          <>
          <p> <b>{part.name} {part.exerciseCount}</b><br></br><i> {part.description}</i>
          <br></br> submit to {part.exerciseSubmissionLink}</p>
          </>
        )
        
      case "special":
        return (
          <>
          <p><b>{part.name} {part.exerciseCount} </b>
          <br></br>{part.description} <br></br>
          required skills:{part.requirements.map (r => (r+' '))}</p>
          </>
        )
        
      default:
        return assertNever(part);
    }
};

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <>
      
      {courseParts.map((part) => (<Part key={part.name} part={part} />))}  
      
    </>
  );
};
  
const Total = ({courseParts}: {courseParts: CoursePart[]}) => (
  <>
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>

  </>
);

return (
    <div>
      <Header courseName = {courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
      
    </div>
  );
};

export default App;