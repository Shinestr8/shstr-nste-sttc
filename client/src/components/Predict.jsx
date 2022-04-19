import {useState} from "react";
import '../App.css';

   

export function Predict(){
    const [youtubeURL, setYoutubeURL] = useState("");
    const [data, setData] = useState({"guess":[{"name":"pop","count":109},{"name":"hiphop","count":31},{"name":"country","count":11},{"name":"classical","count":7},{"name":"rock","count":6},{"name":"disco","count":3},{"name":"metal","count":2},{"name":"jazz","count":1},{"name":"reggae","count":1}],"higherGuess":"pop","higherCount":109,"total":171,"message":"success"});

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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return(
    <div id="predict">
        
            <form>
                <input placeholder="youtube link" type="text" value={youtubeURL} onChange={handleValueChange}/>
                <button type="submit" onClick={submitLink}>Submit</button>
            </form>
            {loading && (
                    <div>Processing your song...</div>
                )}

                {data && data.message!=="success" &&(
                    <div>{data.message}</div>
                )}
                {data && data.message==="success" &&(
            <div id="prediction">
                
                        <div className="top-left">
                            <ul>
                            
                            {data.guess.map(function(genre, index){
                                return(
                                <li key={`genre-${index}`} className={`genre top-${index}`}>
                                    { capitalizeFirstLetter(genre.name)} {Math.round(10000*genre.count/data.total)/100}%
                                </li>
                                )
                            })}
                            </ul>
                        </div>
                        <div className="top-right">
                            <div>Pie Chart</div>
                        </div>
                        <div className="bottom">
                            <div>Histogramme</div>
                        </div>

                
            </div>
            )}
    </div>
    )
}