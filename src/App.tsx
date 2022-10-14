import React, { useEffect, useState } from 'react';
import { tap } from 'rxjs';
 
import './App.css';
import { getObservable } from './features/observable/observable';
import { makePeer } from './features/peer/peerSuff';

function App() {

  let [showCopyLink, setShowCopyLink] = useState(false);
  let [showStart, setShowStart] = useState(true);
  let [linkCopied, setLinkCopied] = useState(false);
  let [link, setLink] = useState("");

  const clickHandler = () => {
    makePeer();
  }

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
  }


  useEffect( () => {
    getObservable().pipe( tap( (t) => {
      setShowCopyLink(true);
      setLink(window.location.href + t);
      setShowStart(false);
    })).subscribe();
  }, []);

  return (
    <div className="App" style={ {padding: "50px"} }>
      <button disabled= {!showStart} onClick={clickHandler}>Start Game Server</button>
      <br></br>
      <br></br>
      {link}
      <br></br>
      <br></br>
      <button disabled= {!showCopyLink} onClick={copyLinkHandler}>Copy link {linkCopied ? "✅": "" } </button>
    </div>
  );
}

export default App;
