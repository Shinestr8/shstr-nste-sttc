import {useState} from "react";
import './App.css';

function App() {

  const [youtubeURL, setYoutubeURL] = useState("");
  const [data, setData] = useState({"guess":[{"name":"blues","count":3},{"name":"classical","count":8},{"name":"country","count":6},{"name":"disco","count":4},{"name":"hiphop","count":7},{"name":"jazz","count":1},{"name":"pop","count":151},{"name":"reggae","count":4},{"name":"rock","count":1}],"higherGuess":"pop","total":185,"message":"success"});

  const [loading, setLoading] = useState(false)
  function handleValueChange(e){
    setYoutubeURL(e.target.value);
  }

  async function submitLink(e){
    setData(null);
    setLoading(true);
    e.preventDefault();
    const response = await fetch("/predict?url="+youtubeURL);
    const newData = await response.json();
    setData(newData);
    setLoading(false);
  }

  return (
    <div id="page">

    
    <div id="content">
      <form>
        <input placeholder="youtube link" type="text" value={youtubeURL} onChange={handleValueChange}/>
        <button type="submit" onClick={submitLink}>Submit</button>
      </form>
      {/* {youtubeURL && youtubeURL} */}
      {loading && (<div>Processing your song...</div>)}
      {data &&(
        <div id="prediction">
          <h2>Main prediction: {data.higherGuess}</h2>

          <ul>

          
          {data.guess.map(function(genre, index){
            return(
              <li key={`genre-${index}`}>
                {genre.name} {Math.round(10000*genre.count/data.total)/100}%
              </li>
            )
          })}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
