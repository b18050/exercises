import React from 'react';

interface course {
  name: string,
  exerciseCount: number
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header = ( {courseName}:{ courseName:string}) => 
    (
      <>
        <h1>{courseName}</h1>
      </>
    );

const Content = ({courseParts}: {courseParts:course[]}) => (
  <>
    <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
  </>
);
  
const Total = ({courseParts}: {courseParts:course[]}) => (
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