import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ content }) => <h1> {content} </h1>

const Button = (props) => {
    return (
        <>
            <button onClick={props.eventHandler} >
                {props.text}
            </button>
        </>
    )
}

const Display = ({ text, rate }) => <p> {text} {rate} </p>

const App = () => {
    // save clicks of each button to own state
    const heading1 = 'give feedback'
    const heading2 = 'statistics'
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const inc_good = () => { setGood(good + 1) }
    const inc_neutral = () => { setNeutral(neutral + 1) }
    const inc_bad = () => { setBad(bad + 1) }

    return (
        <div>
            <Header content={heading1} />
            <Button eventHandler={inc_good} text={'good'} />
            <Button eventHandler={inc_neutral} text={'neutral'} />
            <Button eventHandler={inc_bad} text={'bad'} />
            <Header content={heading2} />
            <Display text="good" rate={good} />
            <Display text="neutral" rate={neutral} />
            <Display text="bad" rate={bad} />
            
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)