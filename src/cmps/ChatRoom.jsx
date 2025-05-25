import { useEffect, useRef, useState } from 'react'
import { socketService } from '../services/socket.service.js'
import { userService } from '../services/user.service.js'
import { toyService } from '../services/toy.service.js'

export function ChatRoom({ toyId }) {
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState([])
    const [typingUser, setTypingUser] = useState(null)
    const loggedInUser = userService.getLoggedInUser()
    const [userName, setUserName] = useState(() => loggedInUser?.fullname || 'Guest')
    const timeoutRef = useRef(null)

    useEffect(() => {
    // 1. Join the WebSocket room
    socketService.setupSocket(toyId)

    // 2. Load existing chat from backend
    toyService.getById(toyId).then(toy => {
        setChat(toy.chat || [])
    })

    // 3. Listen to new chat messages
    socketService.on('chat-msg', newMsg => {
        setChat(prev => [...prev, newMsg])
    })

    // 4. Listen to typing indication
    socketService.on('typing', user => {
        setTypingUser(user)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setTypingUser(null), 2000)
    })

    return () => {
        socketService.off('chat-msg')
        socketService.off('typing')
    }
}, [toyId])
    function sendMsg(ev) {
        ev.preventDefault()
        if (!msg) return
        const newMsg = { txt: msg, userName }
        socketService.emit('chat-msg', { toyId, msg: newMsg })
        setMsg('')
    }

    function handleTyping() {
        socketService.emit('typing', { toyId, userName })
    }

    return (
        <section className="chat-room">
            <h4>Live Chat</h4>
            <ul className="chat-log">
                {chat.map((m, idx) => (
                    <li key={idx}><b>{m.userName}:</b> {m.txt}</li>
                ))}
            </ul>
            {typingUser && <p className="typing">{typingUser} is typing…</p>}
            <form onSubmit={sendMsg}>
                <input
                    type="text"
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    onInput={handleTyping}
                    placeholder="Type a message"
                />
                <button>Send</button>
            </form>
        </section>
    )
}