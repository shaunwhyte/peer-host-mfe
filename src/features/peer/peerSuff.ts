import Peer, { DataConnection } from 'peerjs';
import { next } from '../observable/observable';

export let peer : Peer | null = null;

export let makePeer = () => {
    peer = new Peer("", {
        debug: 2
    });
    peer?.on('open',  function (id : string) {    
        console.log("ID is ", id)
        next("Server:" + id);
        peer?.on('connection', function (client : any)  {
            next("Connection:" + client.peer);
            client?.on('data',  function (data : string) { 
                next("Message:" + data);
            });
        });
    });
    
};


