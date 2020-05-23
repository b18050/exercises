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

const Statistic = ({ text, value }) => {

    return (
        <tr>
            <td> {text} </td>
            <td> {value} </td>
        </tr>
    )
}

const Statistics = ({ good, bad, neutral, allclicks }) => {

    const all = good + bad + neutral
    const avg = (good - bad) / all
    const positive = 100 * good / all

    if (allclicks.length == 0)
        return (
            <>
                <b> No Feedbacks given </b>
            </>
        )
    return (
        <>
            <table>

                <tbody>
                    <Statistic text={"good"} value={good} />

                    <Statistic text={"neutral"} value={neutral} />
                    <Statistic text={"bad"} value={bad} />
                    <Statistic text={"all"} value={all} />
                    <Statistic text={"average"} value={avg} />
                    <Statistic text={"positive"} value={positive} />
                </tbody>
            </table>

        </>

    )
}
const App = () => {
    // save clicks of each button to own state
    const heading1 = 'give feedback'
    const heading2 = 'statistics'
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allclicks, setAll] = useState([])


    const inc_good = () => {
        setAll(allclicks.concat('G'))
        setGood(good + 1)
    }
    const inc_neutral = () => {
        setAll(allclicks.concat('N'))
        setNeutral(neutral + 1)
    }
    const inc_bad = () => {
        setAll(allclicks.concat('B'))
        setBad(bad + 1)
    }

    return (
        <div>
            <Header content={heading1} />
            <Button eventHandler={inc_good} text={'good'} />
            <Button eventHandler={inc_neutral} text={'neutral'} />
            <Button eventHandler={inc_bad} text={'bad'} />
            <Header content={heading2} />


            <Statistics good={good} bad={bad} neutral={neutral} allclicks={allclicks} />






        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)