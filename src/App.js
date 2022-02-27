import './App.css';
import SearchParameters from './searchParameters';
import './default.css'
import 'font-awesome/css/font-awesome.min.css';
import { text } from '@fortawesome/fontawesome-svg-core';


const App = () => {
  return (
    <div style={{ 'textAlign': 'center', 'paddingTop': '13%' }}>
      <img className="mainLogo" src={require("./logo.PNG")} />
      <h1>RedditView</h1>
      <SearchParameters />
    </div>
  );
};

export default App;