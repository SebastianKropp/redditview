import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-router-dom';
/*
{function () {
    for (let i = 0; i < sampleTextArray.length; i++) {
        let j = 0;
        var textToShow = ""
        while (j < sampleTextArray[i].length) {
            textToShow = textToShow.concat(sampleTextArray[j]);
            setText(textToShow)
            console.log(text);
            sleep(275);
            j++;
        }
    }
}}


//import Player from './player';
//import reactplayer from 'react-player';
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
*/

const SearchParameters = () => {
    //const sampleTextArray = ["Enter a Subreddit", "YoutubeHaiku", "Videos", "IdiotsInCars", "What are you waiting for?"]
    const navigate = useNavigate();
    const [subreddit, setSubreddit] = useState();
    //const [text, setText] = useState();
    //setText("");
    return (
        <div text-align="center" className="search-parameters">
            <form>
                <label htmlFor="subreddit">
                    <input
                        id="subreddit"
                        onChange={(event) => setSubreddit(event.target.value)}
                        onKeyPress={(event) => event.key === "Enter" && navigate("/player", { state: { sub: subreddit } })}
                        placeholder="IdiotsInCars" />
                </label>
            </form>
        </div>
    );
};



export default SearchParameters;