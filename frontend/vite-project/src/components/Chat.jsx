import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [])

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', message)
      setMessage('')
    }
  }

  return (
    <div>
      <div>
        <div
          style={{
            border: '1px solid black',
            height: '500px',
            overflowY: 'scroll',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                margin: '10px 0',
                padding: '10px',
                background: '#f1f1f1',
                borderRadius: '5px',
              }}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        style={{ padding: '10px', width: '80%', marginRight: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px', width: '15%' }}>
        Send
      </button>
    </div>
  )
}

export default Chat
