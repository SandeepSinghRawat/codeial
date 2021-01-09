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
        this.socket.on('connect', function(){
            console.log('connection established using sockets....');
        });
    }
}