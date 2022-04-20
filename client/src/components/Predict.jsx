import {useState} from "react";
import '../App.css';
import { Histogram } from "./Histogram";
import { GenreRadarChart } from "./GenreRadarChart";
   

export function Predict(){
    const [youtubeURL, setYoutubeURL] = useState("");
    const [data, setData] = useState({"guess":[{"name":"hiphop","count":68},{"name":"pop","count":45},{"name":"classical","count":10},{"name":"country","count":4},{"name":"disco","count":4},{"name":"jazz","count":2},{"name":"rock","count":2},{"name":"reggae","count":1}],"higherGuess":"hiphop","higherCount":68,"total":136,"message":"success","rawData":[1,1,1,1,1,1,1,1,1,4,4,7,3,7,4,7,4,7,7,7,4,7,7,7,7,7,7,4,4,4,4,4,4,4,7,4,4,7,4,7,7,7,7,7,7,7,7,4,7,4,4,4,4,7,4,7,7,4,7,7,4,7,4,7,5,2,5,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,7,2,7,3,7,7,3,9,7,7,7,7,7,7,7,7,7,7,4,7,2,4,4,4,3,4,4,4,4,9,4,4,4,1]});
    const [loading, setLoading] = useState(false);

    function handleValueChange(e){
        setYoutubeURL(e.target.value);
    }
    
    async function submitLink(e){
        e.preventDefault();
        if(!youtubeURL.includes("watch?v=")){
            setData({message: "invalid URL"});
            return
        }
        setData(null);
        setLoading(true);
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
                            <div>
                                <img 
                                    className="genre-icon"
                                    src={`${process.env.PUBLIC_URL}/images/genres/${data.higherGuess}.svg`} 
                                    alt={data.higherGuess}
                                    title={data.higherGuess}
                                />
                                <div>{capitalizeFirstLetter(data.higherGuess)}</div>
                            </div>    
                            
                        </div>
                        <div className="top-right">
                            <GenreRadarChart data={data}/>
                        </div>
                        <div className="bottom">
                            <Histogram rawData={data.rawData}/>
                        </div>

                
            </div>
            )}
    </div>
    )
}