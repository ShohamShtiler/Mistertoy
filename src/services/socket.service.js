import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.DEV ? 'http://localhost:3030' : ''
const socket = io(BASE_URL)

function setupSocket(toyId) {
	socket.emit('join-toy', toyId)
}

function on(event, cb) {
	socket.on(event, cb)
}

function off(event, cb = null) {
	if (!cb) socket.removeAllListeners(event)
	else socket.off(event, cb)
}

function emit(event, data) {
	socket.emit(event, data)
}

export const socketService = {
	setupSocket,
	on,
	off,
	emit,
}