import {useState} from "react";

function App() {

  const [youtubeURL, setYoutubeURL] = useState("");
  const [data, setData] = useState(null);
  function handleValueChange(e){
    setYoutubeURL(e.target.value);
  }

  async function submitLink(e){
    setData(null);
    e.preventDefault();
    const response = await fetch("/predict?url="+youtubeURL);
    const newData = await response.json();
    setData(newData);
  }

  return (
    <div id="page">
      <form>
        <input type="text" value={youtubeURL} onChange={handleValueChange}/>
        <button type="submit" onClick={submitLink}>Submit</button>
      </form>
      {/* {youtubeURL && youtubeURL} */}
      {data && JSON.stringify(data)}
    </div>
  );
}

export default App;
