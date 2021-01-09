class ChatEngine {

    constructor(chatBoxId, userEmail){
        this.userEmail = userEmail;
        this.chatBoxId = $(`#${chatBoxId}`);

        this.socket= io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler()
        }
    }
    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets....');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined', data);
            });
        });
    }
}