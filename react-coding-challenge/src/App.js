import React from 'react'
import { MessageListProvider } from './components/MessageListContext'
import { MessageList } from './components/MessageList';

function App() {
  return (
    <MessageListProvider>
      <h4>
        React Coding Challenge
      </h4>
      <MessageList />
    </MessageListProvider>
  );
}

export default App;
