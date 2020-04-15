import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({g, n, b}) => {
  const all = g + n + b;
  const average = all !== 0 ? (g- b) / all : 0;
  const positive = all !== 0 ? (g * 100) / all : 0;
  
  if (all > 0) {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <Statistic name="good" val={g} />
            <Statistic name="neutral" val={n} />
            <Statistic name="bad" val={b} />
            <Statistic name="all" val={all} />
            <Statistic name="average" val={average} />
            <Statistic name="positive" val={positive} />
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return <p>No feedback given</p>
  } 
}

const Statistic = ({name, val}) => (
  <tr>
    <td>{name}</td> 
    <td>{val}</td>
  </tr>
  )

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>{setGood(good+1)}} text="good" />
      <Button onClick={()=>{setNeutral(neutral+1)}} text="neutral" />
      <Button onClick={()=>{setBad(bad+1)}} text="bad" />
      <Statistics g={good} n={neutral} b={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));