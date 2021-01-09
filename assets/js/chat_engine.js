class ChatEngine {

    constructor(chatBoxId, userEmail){
        this.userEmail = userEmail;
        this.chatBoxId = $(`#${chatBoxId1}`);

        this.socket= io.connect('http://localhost:8000/');

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