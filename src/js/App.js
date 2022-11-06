import SearchParameters from './searchParameters';
import { SetAuth } from './loginOAuth.js'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './../css/default.css'
import axios from 'axios';
import DropDown from './dropdown.js'


const App = (props) => {
  let url = useLocation();
  const [isLoading, setLoading] = useState(true);
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    let query = new URLSearchParams(url.search);
    let code = query.get("code");
    if (code == null) {
      setLoading(false)
    }
    axios
      .get(`http://localhost:3001/getUserData?code=${code}`)
      .then((res) => {
        console.log(res)
        setUserData(res);
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return (null)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', paddingTop: '13%' }}>
        <img className="mainLogo" alt="" src={require("./../assets/logo.PNG")} />
        <h1>RedditView</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>

        </div>
        <SearchParameters />
        {userData ?
          <DropDown options={userData.data.subreddits} /> :
          null}
        <div
          className='loginDiv'
          onClick={() => SetAuth()}>
          {userData ?
            `Welcome ${userData.data.username}!`
            :
            'Log in with Reddit'}
        </div>
      </div>
    </>
  );
};

export default App;