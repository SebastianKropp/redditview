import SearchParameters from './searchParameters';
import './../css/default.css'

const App = () => {
  return (
    <>
      <div style={{ 'textAlign': 'center', 'paddingTop': '13%' }}>
        <img className="mainLogo" alt="" src={require("./../assets/logo.PNG")} />
        <h1>RedditView</h1>
        <SearchParameters />
      </div>
    </>
  );
};

export default App;