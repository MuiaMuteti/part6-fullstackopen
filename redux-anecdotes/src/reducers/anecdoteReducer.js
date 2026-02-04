import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const anecdote = action.payload
      
      return state.map(andt => andt.id === anecdote.id? anecdote : andt)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const upvoteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const andt = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const upvotedAnecdote = await anecdoteService.updateAnecdote(andt)
    dispatch(voteAnecdote(upvotedAnecdote))
  }
}

export default anecdoteSlice.reducer