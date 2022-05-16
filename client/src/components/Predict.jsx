import {useState, useEffect, useMemo} from "react";

import { Histogram } from "./Histogram";
import { GenreRadarChart } from "./GenreRadarChart";
import { Modal } from "./Modal";
import { Toaster } from "./Toaster";
import { LoadingIcon } from "./Icons/LoadingIcon";
import { ImprovementModalBody } from "./ImprovementModalBody";

import '../App.css';
import { PredictionTable } from "./PredictionTable";


export function Predict(){

    const [youtubeURL, setYoutubeURL] = useState("");
    const [data, setData] = useState(null)
    // const [data, setData] = useState({"guess":[{"name":"hiphop","count":134},{"name":"pop","count":44},{"name":"classical","count":31},{"name":"jazz","count":17},{"name":"reggae","count":8},{"name":"country","count":3},{"name":"disco","count":2},{"name":"metal","count":2},{"name":"blues","count":1}],"higherGuess":"hiphop","higherCount":134,"total":242,"message":"success","rawData":[5,5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,8,4,4,8,7,4,4,7,7,7,4,7,4,8,4,8,4,4,4,4,4,4,7,8,7,4,4,4,7,4,4,4,4,4,4,4,4,4,4,7,4,7,7,7,8,2,8,7,4,4,4,4,4,4,4,7,7,4,7,4,7,7,4,7,4,4,4,4,2,4,7,7,4,4,4,4,7,4,4,4,4,4,4,7,4,4,4,4,4,4,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,7,4,4,7,4,5,5,5,5,5,7,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,4,6,4,4,6,4,4,2,4,4,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,7,8,4,7,7,7,7,7,7,7,7,7,4,7,7,4,7,7,7,7,1,4,5,5,1,1,1,1]})
    const [loading, setLoading] = useState(false);
    const [isModalShowing, setShowModal] = useState(false);
    const [showToaster, setShowToaster] = useState(false);


    useEffect(function(){
        let timer;
        if(showToaster){
            timer = setTimeout(function(){
                setShowToaster(false);
            }, 5000);
        }
        return(function(){
            window.clearTimeout(timer)
        })
    }, [showToaster])


    function toggleShowModal(){
        setShowModal(prev => !prev);
    }

    function handleValueChange(e){
        setYoutubeURL(e.target.value);
    }
    
    async function submitLink(e){
        e.preventDefault();
        if(!(youtubeURL.includes("watch?v=") || youtubeURL.includes("youtu.be"))){
            setData({message: "invalid URL"});
            return
        }
        setData(null);
        setLoading(true);
        try{
            const response = await fetch("/ai/predict?url="+youtubeURL);
            const newData = await response.json();
            setData(newData);
            setLoading(false);
        }
        catch(e){
            setData({message: "An error occured, please try again later"})
            setLoading(false);  
        }    
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const isButtonDisabled = useMemo(()=>{
        if(!(youtubeURL.includes("watch?v=") || youtubeURL.includes("youtu.be/"))){
            return true;
        } else {
            return false;
        }
    }, [youtubeURL])

    return(
    <div id="predict">

            <form>
                <input 
                    id="yt-link-input"
                    placeholder="youtube link" 
                    type="text" 
                    value={youtubeURL} 
                    onChange={handleValueChange}
                />
                <button 
                    id="process-link-btn"
                    type="submit" 
                    onClick={submitLink}
                    disabled={isButtonDisabled}
                >
                    Submit
                </button>
            </form>

                {/* Loading */}
                {loading && (
                    <div className="loading-container">
                        <LoadingIcon/>
                    </div>
                )}

                {!loading && !data && (
                    <PredictionTable isPreview={true}/>
                )}

                {/* Error */}
                {data && data.message!=="success" &&(
                    <div className="error-message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
                        </svg>
                        <span>{data.message}</span>
                    </div>
                )}

                {/* Data */}
                {data && data.message==="success" &&(
                <div id="prediction">
                        <div className="top">
                            <span>
                                is <strong>{data.higherGuess}</strong> a good guess ?
                            </span> 
                            <button onClick={toggleShowModal}>Help us improve</button>
                            <Modal 
                                isShowing={isModalShowing} 
                                toggleShow={toggleShowModal}
                                modalTitle="Help us improve"
                            >
                                <ImprovementModalBody 
                                    showAlert={()=>setShowToaster(true)} 
                                    guess={data.higherGuess} 
                                    toggleShow={toggleShowModal}
                                    url={youtubeURL}
                                    data={data}
                                />
                            </Modal>
                            <Toaster 
                                isShowing={showToaster}
                                message="Thanks for your feedbacks ❤️"
                                style={{backgroundColor:"#C3F3D7", border:"1px solid #2FD573"}}
                            />
                        </div>
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
                             {/*Comes from radar Error: <path> attribute d: Expected number, "M NaN,NaNL NaN,NaN…". */}
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