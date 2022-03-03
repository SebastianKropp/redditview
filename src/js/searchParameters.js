import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-router-dom';




//import Player from './player';
//import reactplayer from 'react-player';
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const SearchParameters = () => {
    const sampleTextArray = ["Stream your favorite content.", "Just enter a subreddit.", "like YoutubeHaiku", "Videos", "DeepIntoYoutube", "What are you waiting for?", "|", ""]
    const navigate = useNavigate();
    const [subreddit, setSubreddit] = useState();
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);

    useEffect(() => {
        switch (true) {
            case index == 7:
                break;
            case index == 6:
                sleep(850).then(() => {
                    setSubIndex((subIndex + 1) % 2);
                })
                break;
            case subIndex < sampleTextArray[index].length:
                sleep(75).then(() => {
                    setSubIndex(subIndex + 1);
                })
                break;
            case subIndex == sampleTextArray[index].length && index < sampleTextArray[index].length - 1:
                sleep(2200).then(() => {
                    setSubIndex(0);
                    setIndex(index + 1);
                })
        }
    }, [subIndex, index])
    //console.log(subIndex, index);
    return (
        <div text-align="center" className="search-parameters">
            <form>
                <label htmlFor="subreddit">
                    <input
                        id="subreddit"
                        onChange={(event) => { setSubreddit(event.target.value) }}
                        onKeyPress={(event) => event.key === "Enter" && navigate("/player", { state: { sub: subreddit } })}
                        placeholder={sampleTextArray[index].slice(0, subIndex)}
                        onClick={() => setIndex(7)} />
                </label>
            </form>
        </div>
    );
};



export default SearchParameters;