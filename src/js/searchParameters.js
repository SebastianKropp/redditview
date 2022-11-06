import 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const SearchParameters = () => {
    const displayTextArray = ["Stream your favorite content.", "Just enter a subreddit.", "like Videos", "YoutubeHaiku", "DeepIntoYoutube", "What are you waiting for?", "|"];

    const navigate = useNavigate();
    const [subreddit, setSubreddit] = useState();
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [messageDone, setMessageDone] = useState(false);

    //Index Manipulation for placeholder 'typing' effect
    useEffect(() => {
        switch (true) {
            //Blinking Caret -> on userClick or finished placeholder sentence sequence
            case messageDone || index === 6:
                if (messageDone) {
                    setIndex(6);
                }
                sleep(850).then(() => {
                    setSubIndex((subIndex + 1) % 2);
                })
                break;
            //Update placeholder sentence slice
            case subIndex < displayTextArray[index].length:
                sleep(75).then(() => {
                    setSubIndex(subIndex + 1);
                })
                break;
            //Switch placeholder sentence
            case subIndex === displayTextArray[index].length && index < displayTextArray[index].length - 1:
                sleep(2200).then(() => {
                    setSubIndex(0);
                    setIndex(index + 1);
                })
                break;

            default:
                break;
        }
    }, [subIndex, messageDone, index])
    //To Implement: useEffect cleanup function to prevent state updates after unmounting

    return (
        <div style={{ width: '100vw' }}>
            <label>
                <input className='userInput'
                    id="subreddit"
                    autoFocus={true}
                    value={subreddit}
                    onChange={(event) => { setSubreddit(event.target.value) }}
                    onKeyPress={(event) => event.key === "Enter" && navigate("/player", { state: { sub: subreddit } })}
                    placeholder={displayTextArray[index].slice(0, subIndex)}
                    onClick={() => setMessageDone(true)} />
            </label>
        </div>
    );
};

export default SearchParameters;