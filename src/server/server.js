const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

var connections = []
var users = []

app.use(express.static(__dirname + '/../../build'))

io.on('connection', (socket) => {
    
    connections.push(socket.id)
    console.log("socket id : " + socket.id)
    console.log('connected: %s sockets connected', connections.length)
    console.log(...users, users.length)

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket.id), 1)
        users.splice(connections.indexOf(socket.id), 1)
        console.log('connected: %s sockets connected', connections.length)    
        console.log('connected: %s users connected', users.length)    
    })

    socket.on('new user', (user) => {
        console.log(user)
        users.push(user)
        console.log('users: %s users connected', users.length)   
    })

    socket.on('send message', (data) => {
        console.log(data.receiver)
        console.log(...users)
        for (let index = 0; index < users.length; index++) {
            const e = users[index];
            if((e === data.receiver || e === data.sender) && connections[index] !== socket.id) {
                console.log(index)
                socket.to(connections[index]).emit('new message', data)
            }
        }
        socket.emit('new message', data)
    })
})

const PORT = process.env.PORT || 6969

server.listen(PORT, () => {
    console.log("connected to port " + PORT)
})
