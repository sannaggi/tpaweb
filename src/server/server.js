var server = require('http').createServer()
var io = require('socket.io').listen(server)

var connections = []
var users = []

io.on('connection', (socket) => {
    
    connections.push(socket.id)
    console.log("socket id : " + socket.id)
    console.log('connected: %s sockets connected', connections.length)

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1)
        users.splice(users.indexOf(socket), 1)
        console.log('connected: %s sockets connected', connections.length)    
    })

    socket.on('new user', (user) => {
        if(users.includes(user)) return
        users.push(user)
        console.log('users: %s users connected', users.length)   
    })

    socket.on('send message', (data) => {
        let receiverIndex = users.indexOf(data.receiver);
        if(receiverIndex === -1) return
        socket.to(connections[receiverIndex]).emit('new message', data)
        socket.emit('new message', data)
    })
})

const PORT = process.env.PORT || 6969

server.listen(PORT, () => {
    console.log("connected to port " + PORT)
})
