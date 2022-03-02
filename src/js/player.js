import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy'
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faFire, faCertificate, faSignal } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';


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
    return { url: child.data.media.reddit_video.fallback_url, name: child.data.name, permalink: child.data.permalink }
  }

  if (child.data.url != null) {
    return { url: child.data.url, name: child.data.name, permalink: child.data.permalink }
  }
}



const Player = () => {
  const [isactive, setIsActive] = useState([1, 0, 0])
  const navigate = useNavigate();
  const { state } = useLocation();
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState();
  const [selector, setSelector] = useState({ type: "hot" })
  const [isHovering, setIsHovering] = useState()
  const [kind, setKind] = useState("");
  const [dropDownValue, setDropDownValue] = useState("Todays")
  const top = useRef(null);

  //const count = 0;
  useEffect(() => {
    const fetchData = () => {
      var fetchUrl;
      switch (true) {
        case selector.type == "top":
          console.log("this is the time selected: ", selector.time)
          fetchUrl = fetch("https://www.reddit.com/r/" + state.sub + "/" + selector.type + "/.json?t=" + selector.time + "&count=25&after=" + kind);
          console.log("https://www.reddit.com/r/" + state.sub + "/" + selector.type + "/.json?t=" + selector.time + "&count=25&after=" + kind)
          break;
        default:
          fetchUrl = fetch("https://www.reddit.com/r/" + state.sub + "/" + selector.type + ".json?count=25&after=" + kind);
      }

      fetchUrl.then(res => {
        if (res.status !== 200) {
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
  }, [selector, kind]);
  //const fetchURLArray = fetchData();

  const DisplayOverlay = () => {
    return (
      <div className="overlay">
        <div>
          <FontAwesomeIcon icon={faBackward} onClick={() => setCount(count - 1)} />
        </div>
        <div>
          <FontAwesomeIcon icon={faForward} onClick={() => setCount(count + 1)} />
        </div>
      </div>
    )
  }
  const DropDown = () => {
    if (top.current == null) {
      return null;
    }
    console.log(top.current.className == "liSelectorActive");
    if (top.current.className == "liSelectorActive") {
      return (
        <select className="dropDown"
          name="Time"
          value={dropDownValue}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => { setDropDownValue(event.target.value); setSelector({ type: "top", time: event.target.value }) }}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>
      )
    }
    else {
      return null;
    }
  }
  if (count == 24) {
    setKind(posts[count - 1].name);
    setCount(0);
  }
  console.log(count);
  console.log(posts);
  return (
    <body>
      <ul display="inline-block">
        <li>
          <img className="playerLogo" src={require('./../assets/logo.PNG')} onClick={() => navigate("/")} />
        </li>
        <li>
          <h2>{'RedditView '}</h2>
        </li>
        <li className="liSelectorInactive">
          <text font-size="2em">{'=> ' + state.sub}</text>
        </li>
      </ul>
      <ul className="ulSelector">
        <li className={isactive[0] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([1, 0, 0]); setCount(0); setSelector({ type: 'hot' }) }}>
          <FontAwesomeIcon id="Hot" icon={faFire} />
          <label for="Hot"> Hot</label>
        </li>
        <li className={isactive[1] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([0, 1, 0]); setCount(0); setSelector({ type: 'new' }); }}>
          <FontAwesomeIcon id="New" icon={faCertificate} />
          <label for="New"> New</label>
        </li>
        <li ref={top} className={isactive[2] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([0, 0, 1]); setCount(0); setSelector({ type: 'top', time: "day" }); }}>
          <FontAwesomeIcon id="Top" icon={faSignal} />
          <label for="Top"> Top</label>
          <DropDown padding-left="5em" />
        </li>
        <li className="liSelectorActive" onClick={() => window.open("https://www.reddit.com" + posts[count].permalink)}>
          <FontAwesomeIcon id="Comments" icon={faComment} />
        </li>
      </ul>
      <div
        className="player-wrapper"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        {posts ?
          <ReactPlayer
            url={posts[count].url}
            className='react-player'
            width="100%"
            height="100%"
            volume="1"
            playing={true}
            onEnded={() => setCount(count + 1)}
            onError={() => setCount(count + 1)}>
          </ReactPlayer>
          : <h2>Loading...</h2>}
        {isHovering && <DisplayOverlay />}
      </div>
    </body>

  );
};



export default Player;