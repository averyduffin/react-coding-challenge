import React, { useEffect } from 'react'
import { useMessageListActions, useMessageListState } from './MessageListContext'

export const MessageList = () => {
  const { startApi, stopApi } = useMessageListActions()
  const { isApiStarted } = useMessageListState()

  useEffect(() => {
    startApi()
  }, [startApi])

  return (
    <div>
      <button
        onClick={() => isApiStarted ? stopApi() : startApi()}
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </button>
    </div>
  )
}
