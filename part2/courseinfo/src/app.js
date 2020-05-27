import React, { useState } from 'react';
import Course from './components/course';

const App = (props) => {
  
const courses = props.courses

  return (
  	<>
  		{ courses.map(course => 
  			<Course key={course.id} course={course} />
  		 )}
  	</>
   )
}


export default App