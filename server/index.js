const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');


const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    console.log('user login')
    socket.on('sendmsg',function(data){
    	console.log(data)
       io.emit('recvmsg',data)
	})
})





server.listen(9090,function(){
	console.log('node app start at port 9090')
})