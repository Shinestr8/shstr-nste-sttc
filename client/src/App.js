import {useState} from "react";

function App() {

  const [youtubeURL, setYoutubeURL] = useState("");
  const [data, setData] = useState(null);
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
      <form>
        <input placeholder="youtube link" type="text" value={youtubeURL} onChange={handleValueChange}/>
        <button type="submit" onClick={submitLink}>Submit</button>
      </form>
      {/* {youtubeURL && youtubeURL} */}
      {loading && (<div>Processing your song...</div>)}
      {data && (
        <h2>Main prediction: {data.higherGuess}</h2>
      )}
      {data && data.guess.map(function(genre, index){
        return(
          <div key={`genre-${index}`}>
            {genre.name} {Math.round(10000*genre.count/data.total)/100}%
          </div>
        )
      })}
    </div>
  );
}

export default App;
