import React, { useState } from 'react'

const Statistics = (props) => {
  return(
    <div>
      <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine type="Good" value={props.good} />
            <StatisticLine type="Neutral" value={props.neutral} />
            <StatisticLine type="Bad" value={props.bad} />
            <StatisticLine type="All" value={props.good + props.neutral + props.bad} />
            <StatisticLine type="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
            <StatisticLine type="Positive" value={(props.good / (props.good + props.neutral + props.bad)*100)} />
          </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({type, value}) => {
  return(
    type==="Positive" ? (
      <tr>
        <th>{type}</th>
        <td>{value} %</td>
      </tr>
    ) : (
      <tr>
        <th>{type}</th>
        <td>{value}</td>
      </tr>
    )
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const plusGood = () => setGood(good + 1)
  const plusNeutral = () => setNeutral(neutral + 1)
  const plusBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={plusGood} text="Good" />
      <Button handleClick={plusNeutral} text="Neutral" />
      <Button handleClick={plusBad} text="Bad" />
      {good || neutral || bad ? (
      <Statistics good={good} neutral={neutral} bad={bad}/>
      ) : (
        <p>No feedback given</p>
      )} 
    </div>
  )
}

export default App