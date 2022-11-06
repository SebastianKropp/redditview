import 'react-router-dom';
import { useState, useRef } from 'react';
import { Slider } from '@mui/material';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player/lazy';

/* Video Player and Controls
   Minor Issue: Update the final videobar value before the onEnded call triggers a rerender for the next video */
const DisplayPlayer = (props) => {

    const urlToView = props.url;
    console.log(urlToView + '/audio')
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
                <div>
                    <FontAwesomeIcon
                        icon={faBackward}
                        onClick={() => count > 0 ? setCount(count - 1) : setCount(count)} />
                </div>

                <Slider
                    //className="videoBar"
                    style={{
                        color: '#fe4500'
                    }}
                    width='5em'
                    size="large"
                    min={0}
                    max={videoState.totalTime}
                    valueLabelFormat={(seconds) => `${Math.trunc(videoState.currentTime / 60)}:${('0' + Math.trunc(videoState.currentTime % 60)).slice(-2)}`}
                    value={videoState.currentTime}
                    aria-label="large"
                    valueLabelDisplay="auto"
                    onChange={(event) => {
                        videoBarReference.current.seekTo(event.target.value);
                        setVideoState({ currentTime: event.target.value, totalTime: videoState.totalTime })
                    }}

                />
                <div>
                    <FontAwesomeIcon icon={faForward} onClick={() => setCount(count + 1)} />
                </div>
            </div>
        </>
    )
}

export default DisplayPlayer;