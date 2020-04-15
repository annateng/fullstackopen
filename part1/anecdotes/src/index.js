import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))

  const getRandom = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  }

  function incrementPoints(index) {
    const copy = [...points];
    copy[index] += 1;
    setPoints(copy);
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <Button onClick={()=>incrementPoints(selected)}  text="vote" />
        <Button onClick={getRandom} text="next anecdote" />
      </div>
      <h1>anecdote with most votes</h1>
      {props.anecdotes[points.indexOf(Math.max(...points))]}
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