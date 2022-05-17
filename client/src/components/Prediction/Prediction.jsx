import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Histogram } from "../Charts/Histogram";
import { GenreRadarChart } from "../Charts/GenreRadarChart";

export function Prediction(){

    const {id} = useParams();
    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchLatestData(){
            const response = await fetch(`/api/feedback/${id}`);
            const result = await response.json();
            setData(result);
        }
        fetchLatestData()
    }, [id])


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    if(data && data.data.rawData.length === 0){
        return(
            <div id="predict">
                <div id="no-data-prediction">
                predicted <strong>&nbsp;{data.predictedLabel}</strong>, was <strong>&nbsp;{data.trueLabel}</strong>.&nbsp;
                <a
                    tabIndex="0"
                    href={`https://www.youtube.com/watch?v=${data.videoID}`}
                    target='_blank'
                    rel="noreferrer"
                    title={`https://www.youtube.com/watch?v=${data.videoID}`}
                >
                    Listen on youtube
                </a>
                <br/>
                <br/>
                <div>Sorry, no more data to show for this song</div>
                </div>
                
            </div>
        )
    }

    if(data && data.data.rawData.length !== 0){
        return(
            <div id="predict">
                <div id="prediction">
                    <div className="top">
                        predicted <strong>&nbsp;{data.predictedLabel}</strong>, was <strong>&nbsp;{data.trueLabel}</strong>.&nbsp;<a href={`https://www.youtube.com/watch?v=${data.videoID}`}>  Listen on youtube </a>
                    </div>
                    <div className="top-left">
                        <ul>
                            {data.data.guess.map(function(genre, index){
                                return(
                                <li key={`genre-${index}`} className={`genre top-${index}`}>
                                    { capitalizeFirstLetter(genre.name)} {Math.round(10000*genre.count/data.data.total)/100}%
                                </li>
                                )
                            })}
                        </ul>
                        <div>
                            <img 
                                className="genre-icon"
                                src={`${process.env.PUBLIC_URL}/images/genres/${data.data.higherGuess}.svg`} 
                                alt={data.data.higherGuess}
                                title={data.data.higherGuess}
                            />
                            <div>{capitalizeFirstLetter(data.data.higherGuess)}</div>
                        </div>  
                    </div>
                    <div className="top-right">
                             {/*Comes from radar Error: <path> attribute d: Expected number, "M NaN,NaNL NaN,NaN…". */}
                        <GenreRadarChart data={data.data}/>
                    </div>
                    <div className="bottom">
                        <Histogram rawData={data.data.rawData}/>
                    </div>
                </div>
            </div>
        )
    }

    else{
        return(<div>No data super sorry</div>)
    }
    
}