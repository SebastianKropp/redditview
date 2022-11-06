import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const SetAuth = () => {
    //Store in env file
    let clientID = 'SYRGGbs36i7P28xlGFzonw'
    let type = 'code'
    //use crypto for production
    let state = 'return'
    let redirectURI = 'http://localhost:3000/callback'

    window.location.replace(
        `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${type}&state=${state}&redirect_uri=${redirectURI}&duration=permanent&scope=identity,mysubreddits`
    )

}

const StoreAuth = ({ location }) => {
    let url = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(url.search);
        console.log(url);
        axios
            .get(`http://localhost:3001/queryUser?code=${query.get("code")}`)
            .then((res) => {
                navigate(`/?code=${query.get("code")}`)
            })
    })

    return (
        <div className="loader"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    )
}

export { SetAuth, StoreAuth };