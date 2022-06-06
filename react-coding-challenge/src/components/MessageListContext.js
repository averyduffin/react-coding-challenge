import React, { useReducer, useCallback } from 'react'
import Api from '../API/api'

const initialState = {
  messages: [],
  isApiStarted: false
}

const reducerTypes = {
  STOP_API: 'STOP_API',
  START_API: 'START_API',
}

const api = new Api({})

export const MessageListStateContext = React.createContext(initialState)
export const MessageActionsContext = React.createContext(initialState)

const messageListReducer = (state, action) => {
  switch (action.type) {
    case reducerTypes.STOP_API:
      return { ...state, isApiStarted: false }
    case reducerTypes.START_API:
      return { ...state, isApiStarted: true }
    default:
      return state
  }
}

export const MessageListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageListReducer, initialState)

  const addMessage = (message) => console.log(`Recieved new message: ${JSON.stringify(message)}`)
  api.updateCallback(addMessage)

  const startApi = useCallback(() => {
    api.start()
    dispatch({ type: reducerTypes.START_API })
  }, [])

  const stopApi = useCallback(() => {
    api.stop()
    dispatch({ type: reducerTypes.STOP_API })
  }, [])

  return (
    <MessageListStateContext.Provider value={state}>
      <MessageActionsContext.Provider value={{ addMessage, startApi, stopApi }}>
        {children}
      </MessageActionsContext.Provider>
    </MessageListStateContext.Provider>
  )
}

export const useMessageListState = () => {
  const context = React.useContext(MessageListStateContext)
  if (context === undefined) throw new Error('useMessageListState must be used within MessageListProvider')
  return context
}

export const useMessageListActions = () => {
  const context = React.useContext(MessageActionsContext)
  if (context === undefined) throw new Error('useMessageListActions must be used within MessageListProvider')
  return context
}
