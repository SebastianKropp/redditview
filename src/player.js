import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faFire, faCertificate, faSignal } from '@fortawesome/free-solid-svg-icons';


function isValidVideo(child) {
  if (child.data.url != null) {
    return true
  }
  if (child.data.media.is_video) {
    return true
  }
}

function retrieveURL(child) {
  if (child.data.is_video && child.data.media.reddit_video.fallback_url != null) {
    return child.data.media.reddit_video.fallback_url
  }

  if (child.data.url != null) {
    return child.data.url
  }
}



const Player = () => {
  const [isactive, setIsActive] = useState([1, 0, 0])
  const navigate = useNavigate();
  const { state } = useLocation();
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [selector, setSelector] = useState("hot")
  const [isHovering, setIsHovering] = useState()

  //const count = 0;
  useEffect(() => {
    const fetchData = () => {
      fetch("https://www.reddit.com/r/" + state.sub + "/" + selector + ".json")
        .then(res => {
          if (res.status != 200) {
            //console.log('error')
          }
          return res.json()
        })
        .then(data => {
          console.log("json:", data.data.children);
          var urlArray = data.data.children
            .filter(child => isValidVideo(child))
            .map(child => retrieveURL(child))
          setPosts(urlArray)
        })
    }
    fetchData();
  }, [selector]);
  //const fetchURLArray = fetchData();

  const DisplayOverlay = () => {
    return (
      <div className="overlay">
        <ul className="controlOverlay">
          <li className='overlaySkip'>
            <FontAwesomeIcon icon={faBackward} onClick={() => setCount(count - 1)} />
          </li>
          <li>
            <FontAwesomeIcon icon={faForward} onClick={() => setCount(count + 1)} />
          </li>
        </ul>
      </div>
    )
  }
  console.log(posts);

  return (
    <div display="inline" height="10vh">
      <ul display="inline">
        <li>
          <img className="playerLogo" src={require('./logo.PNG')} onClick={() => navigate("/")} />
        </li>
        <li>
          <h2>{'RedditView '}</h2>
        </li>
        <li className="liSelectorInactive">
          <text font-size="2em">{'=> ' + state.sub}</text>
        </li>
      </ul>
      <ul className="ulSelector">
        <li className={isactive[0] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([1, 0, 0]); setCount(0); setSelector('hot') }}>
          <FontAwesomeIcon id="Hot" icon={faFire} />
          <label for="Hot"> Hot</label>
        </li>
        <li className={isactive[1] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([0, 1, 0]); setCount(0); setSelector('new'); }}>
          <FontAwesomeIcon id="New" icon={faCertificate} />
          <label for="New"> New</label>
        </li>
        <li className={isactive[2] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([0, 0, 1]); setCount(0); setSelector('top'); }}>
          <FontAwesomeIcon id="Top" icon={faSignal} />
          <label for="Top"> Top</label>
        </li>
      </ul>
      <div
        className="player-wrapper"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        {posts ?
          <ReactPlayer
            url={"urls:", posts[count]}
            className='react-player'
            width="100%"
            height="90%"
            volume="1"
            playing={true}
            onEnded={() => setCount(count + 1)}>
          </ReactPlayer>
          : <h2>Loading...</h2>}
        {isHovering && <DisplayOverlay />}
      </div>
    </div>

  );
};



export default Player;