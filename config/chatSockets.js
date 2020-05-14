module.exports.chatSockets = function(socketServer){
    const io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('Connection request received', socket.id);
      
        socket.on('disconnect', function(){
            console.log('Sockets Disconnected');
        })

        socket.on('join_room', (data)=>{
            console.log('Join request received', data);
        
            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user_joined', data);

        })


        socket.on('send_msg', function(data){
            console.log(data);
            io.in(data.chatRoom).emit('rcv_msg', data);
            
        })

        
    
    
    })

   



}