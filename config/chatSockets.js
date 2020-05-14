module.exports.chatSockets = function(socketServer){
    const io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        socket.on('disconnect', function(){
            
        })

        socket.on('join_room', (data)=>{
        
            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user_joined', data);

        })


        socket.on('send_msg', function(data){
          
            io.in(data.chatRoom).emit('rcv_msg', data);
            
        })

        
    
    
    })

   



}