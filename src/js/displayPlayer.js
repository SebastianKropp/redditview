import 'react-router-dom';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy'

import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Video Player and Controls
   Minor Issue: Update the final videobar value before the onEnded call triggers a rerender for the next video */
const DisplayPlayer = (props) => {

    const urlToView = props.url;
    let count = props.count;
    let setCount = props.setCount;

    const videoBarReference = useRef(null);
    const [videoState, setVideoState] = useState({ onPlay: true, currentTime: 0, totalTime: 0 })
    const [totalTime, setTotalTime] = useState(100);

    return (
        <>
            <ReactPlayer
                url={urlToView}
                className='react-player'
                width="100%"
                height="100%"
                volume={1}
                ref={videoBarReference}
                playing={true}
                onReady={(event) => setTotalTime(event.getDuration())}
                onProgress={(event) => { setVideoState({ currentTime: event.playedSeconds, totalTime: totalTime }) }}
                onEnded={() => setCount(count + 1)}
                onError={() => setCount(count + 1)}>
            </ReactPlayer>

            <div className="overlay">
                <div >
                    <FontAwesomeIcon icon={faBackward} onClick={() => count > 0 ? setCount(count - 1) : setCount(count)} />
                </div>

                <input className="videoBar"
                    type="range"
                    min={0}
                    max={videoState.totalTime}
                    value={videoState.currentTime}
                    onInput={(event) => {
                        videoBarReference.current.seekTo(event.target.value);
                        setVideoState({ currentTime: event.target.value, totalTime: videoState.totalTime })
                    }} />

                <div >
                    <FontAwesomeIcon icon={faForward} onClick={() => setCount(count + 1)} />
                </div>
            </div>
        </>
    )
}

export default DisplayPlayer;