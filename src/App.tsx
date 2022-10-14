import React, { useEffect, useState } from 'react';
import { tap } from 'rxjs';
 
import './App.css';
import { getObservable } from './features/observable/observable';
import { makePeer } from './features/peer/peerSuff';

function App(props: any) {

  let [showCopyLink, setShowCopyLink] = useState(false);
  let [showStart, setShowStart] = useState(true);
  let [linkCopied, setLinkCopied] = useState(false);
  let [link, setLink] = useState("");


  let [connections, setConnections] = useState<string[]>([]);

  const clickHandler = () => {
    makePeer();
  }

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
  }

  useEffect( () => {
    getObservable().pipe( tap( (t) => {
      let msg = t as string;
      let data = msg.replace("Server:", "").replace("Connection:", "");
      if(msg.includes("Server:")){
        setShowCopyLink(true);
        setLink(data); //window.location.href + 
        setShowStart(false);
      }
      if(msg.includes("Connection:")){
        setConnections([...connections, data]);
      }
    })).subscribe();
  }, [connections, link]);

  return (
    <div className="App" style={ {padding: "50px"} }>
      Name: {props.name}
      <br></br>
      <button disabled= {!showStart} onClick={clickHandler}>Start Game Server</button>
      <br></br>
      <a href={link}>{link}</a>
      <br></br>
      <br></br>
      <button disabled= {!showCopyLink} onClick={copyLinkHandler}>Copy link {linkCopied ? "✅": "" } </button>
      <h3> {!!connections.length ? `Connections: ${connections}`  : "No connections"} </h3>
    </div>
  );
}

export default App;
