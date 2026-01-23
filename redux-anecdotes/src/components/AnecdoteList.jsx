import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    const handleVoteClick = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const filteredAnecdotes = filter === ''
            ? anecdotes
            : anecdotes.filter(andt => andt.content.toLowerCase().includes(filter))
        
        return filteredAnecdotes.toSorted((andtA, andtB) => andtB.votes - andtA.votes)
    })
    
    return (
        <div>
            {anecdotes.map(anecdote => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVoteClick(anecdote)}/>
            ))}
        </div>
    )
}

export default AnecdoteList