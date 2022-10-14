import Peer, { DataConnection } from 'peerjs';
import { next } from '../observable/observable';

export let peer : Peer | null = null;

export let makePeer = () => {
    peer = new Peer("", {
        debug: 2
    });
    peer?.on('open',  function (id : string) {    
        console.log("ID is ", id)
        next(id);
    });
};


