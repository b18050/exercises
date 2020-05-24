import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({eventHandler,text}) => {
	 return (
        	<>
				<button onClick={eventHandler} >
				{text} 
				</button>
			</>
		)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const min = 0;
  const max = 5

  const set_anecdote = () => {
  	const random_int = Math.floor(Math.random() * (max - min + 1) ) + min;
  	console.log(random_int)
  	setSelected(random_int)
  }


  return (
    <div>
      
     <p> {props.anecdotes[selected]} </p>



    <Button eventHandler={set_anecdote} text={"next anecdote"} />

    </div>
   
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)