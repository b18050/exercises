import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <>
            <p> Hello {props.name} </p>
            <p> You are {props.age} years old .</p>
        </>
    )
}

const Credit = () => {
    return (
        <p> App created by <b>Chandan Prakash </b></p>
        )
            }

const App = () => {
    console.log("Hello from component");
    const now = new Date()
    const a = 10
    const b = 20
    return (<div>
        <p> Hello World , it is {now.toString()}</p>
        <p>{a} plus {b} is {a + b} </p>
        <h1> Greetings </h1>
        <Hello name="George" age={a}/>
        <Hello name="Ayush" age={a + b}/>
        <Hello name="Vishal" age={b} />

        <Credit />
                
    </div>
    )
}


   
    
ReactDOM.render(<App />,document.getElementById('root')
);


