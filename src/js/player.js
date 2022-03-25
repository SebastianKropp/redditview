import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faCertificate, faSignal } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import DisplayOverlay from './displayPlayer'
import DisplayDropDown from './displayDropDown'


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


const PlayerPage = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  // Hooks for managing buttons (i.e by time, hot/new/top && today/week/month)
  const [isactive, setIsActive] = useState([1, 0, 0])
  const [selector, setSelector] = useState({ type: "hot" })
  // Hooks for managing post data
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState();
  const [kind, setKind] = useState(""); //t3_kind identifier for posts used by Reddit API 

  useEffect(() => {
    const fetchData = () => {
      var fetchUrl;
      switch (true) {
        case selector.type === "top":
          fetchUrl = fetch("https://www.reddit.com/r/" + state.sub + "/" + selector.type + "/.json?t=" + selector.time + "&count=25&after=" + kind);
          break;
        default:
          fetchUrl = fetch("https://www.reddit.com/r/" + state.sub + "/" + selector.type + ".json?count=25&after=" + kind);
          break;
      }

      fetchUrl.then(res => {
        if (res.status !== 200) {
          //Implement an Error Check Message for Users
        }
        return res.json()
      })
        .then(data => {
          var urlArray = data.data.children
            .filter(child => isValidVideo(child))
            .map(child => retrieveURL(child))
          setPosts(urlArray)
        })
    }
    fetchData();
  }, [selector, kind, state.sub]);

  //Triggers fetchData() call to refresh urlArray at end of bounds
  if (count === 24) {
    setKind(posts[count - 1].name);
    setCount(0);
  }

  return (
    <div>
      <ul display="inline-block">
        <li>
          <img className="playerLogo" alt="" src={require('./../assets/logo.PNG')} onClick={() => navigate("/")} />
        </li>
        <li>
          <h2>{'RedditView '}</h2>
        </li>
        <li className="liSelectorInactive">
          <p fontSize="2em">{'=> ' + state.sub}</p>
        </li>
      </ul>
      {/* Button Overlay */}
      <ul className="ulSelector">
        {/* This is particularly disgusting (reminder fix redundancy && improve readability) */}
        <li className={isactive[0] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([1, 0, 0]); setCount(0); setSelector({ type: 'hot' }) }}>
          <FontAwesomeIcon id="Hot" icon={faFire} />
          <label htmlFor="Hot"> Hot</label>
        </li>
        <li className={isactive[1] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([0, 1, 0]); setCount(0); setSelector({ type: 'new' }); }}>
          <FontAwesomeIcon id="New" icon={faCertificate} />
          <label htmlFor="New"> New</label>
        </li>
        <li className={isactive[2] ? "liSelectorActive" : "liSelectorInactive"} onClick={() => { setIsActive([0, 0, 1]); setCount(0); setSelector({ type: 'top', time: "day" }); }}>
          <FontAwesomeIcon id="Top" icon={faSignal} />
          <label htmlFor="Top"> Top</label>
          <DisplayDropDown active={isactive[2]} setSelector={setSelector} padding-left="5em" />
        </li>
        <li className="liSelectorActive" onClick={() => window.open("https://www.reddit.com" + posts[count].permalink)}>
          <FontAwesomeIcon id="Comments" icon={faComment} />
        </li>
      </ul>
      {/* Main Player && Controls */}
      <div className="player-wrapper">
        {posts ?
          <DisplayOverlay url={posts[count].url} count={count} setCount={setCount} />
          : <div className="loader"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        }
      </div>
    </div>

  );
};



export default PlayerPage;
