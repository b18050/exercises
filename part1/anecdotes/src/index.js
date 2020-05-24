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

const Display_max = ({selected,anecdotes}) => {
	console.log(anecdotes)
	const arr = selected.points
	console.log(arr)
	const index = arr.indexOf(Math.max(...arr))
  	console.log(index)
  	
  		return(
  			<>
  				<p> {anecdotes[index]} </p>	
  			</>
  		)
  			

  }


const App = (props) => {
	
	const [selected, setSelected] = useState(
		{value: 0 ,
		 points : new Array(6+1).join('0').split('').map(parseFloat)
		})
   
  	const min = 0;
  	const max = 5;

  	const set_anecdote = () => {
  		const random_int = Math.floor(Math.random() * (max - min + 1) ) + min;
  		console.log(random_int)
  		setSelected({ ...selected, value:random_int})
  	}
  	
  	const cast_vote = () => {
  		
  		const copy = [...selected.points]
		// increment the value in position 2 by one
		copy[selected.value] += 1 
		setSelected({ ...selected, points:copy})
		console.log(selected.points)
			 
		
  }

  
  return (
    <div>
      
     <p> {props.anecdotes[selected.value]} </p>



    <Button eventHandler = {set_anecdote} text = {"next anecdote"} />
    <Button eventHandler = {cast_vote} text={"vote"} />

    <p> has {selected.points[selected.value]} votes </p>

    <h1> Anecdotes with most votes </h1>
    <Display_max selected={selected} anecdotes={props.anecdotes} />
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