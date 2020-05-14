class chatBox{
    constructor(chatBoxId, userEmail)
    {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
        this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
        
            
            self.socket.emit('join_room', {
                chatRoom:'codeial',
                userEmail:self.userEmail
            })

            self.socket.on('user_joined', function(data){
               
            })


            $('input[type=submit]', self.chatBox).click(function(){
            
            let msg = $('input[type=text]', self.chatBox).val();
 
            self.socket.emit('send_msg', {
                msg:msg,
                chatRoom:'codeial',
                userEmail:self.userEmail
            })

            })

            self.socket.on('rcv_msg', function(data){
                let msgType='other-message';
                if(data.userEmail == self.userEmail)
                {
                    msgType='self-message';
                }
                let msg = $('<li>');
                msg.addClass(msgType);
                msg.html(`
                <div>
                    ${data.msg}
                    
                </div>
                <sub>
                        ${data.userEmail}
                </sub>
                `)
                
                $('#messages-container > ul').append(msg);
                var elem = document.getElementById('messages-container');
                elem.scrollTop = elem.scrollHeight;
                 
            })

        })
    }


}