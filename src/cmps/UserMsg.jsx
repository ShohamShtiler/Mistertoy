import { useEffect, useState } from 'react'
import { eventBusService } from '../services/event-bus.service.js'

export function UserMsg() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const removeListener = eventBusService.on('show-user-msg', msg => {
      setMsg(msg)
      setTimeout(() => setMsg(null), 3000)
    })

    return () => removeListener()
  }, [])

  if (!msg) return null

  return (
    <section className={`user-msg ${msg.type}`}>
      {msg.txt}
      <button onClick={() => setMsg(null)}>x</button>
    </section>
  )
}