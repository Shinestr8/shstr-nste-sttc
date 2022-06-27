import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Histogram } from "../Charts/Histogram";
import { GenreRadarChart } from "../Charts/GenreRadarChart";

import { CircleCheck } from "../General/Icons/CircleCheck";
import { CircleXMark } from "../General/Icons/CircleXMark";
import { Modal } from "../General/Modal/Modal";
import { ImprovementModalBody } from "../Process/ImprovementModalBody";
import { Toaster } from "../General/Toaster/Toaster";

export function Prediction(){

    const {id} = useParams();
    const [data, setData] = useState(null);
    
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

    

    useEffect(()=>{
        const allData = [{"data":{"guess":[{"name":"metal","count":58},{"name":"rock","count":19},{"name":"classical","count":16},{"name":"jazz","count":14}],"higherGuess":"metal","higherCount":58,"total":107,"message":"success","rawData":[1,1,1,1,1,1,5,1,1,1,1,1,1,5,1,5,5,5,5,1,1,5,5,5,5,5,1,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9,9,6,6,6,6,6,6,6,6,9,6,6,6,6,6,6,6,6,6,6,9,6,9,9,6,9,9,6,9,6,9,6,9,9,9,9,9,9,9,9,9,6,6,6,6,6]},"_id":"62b99e3abf813517a3bf64e0","predictedLabel":"metal","videoID":"fsPMu_zjSMc","__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e42940e51c713485db9b5","predictedLabel":"classical","trueLabel":"classical","videoID":"l0GN40EL1VU","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e41750e51c713485db9b3","predictedLabel":"metal","trueLabel":"metal","videoID":"UCxgbOBVSfM","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e405a78dfbd80f24b02b4","predictedLabel":"classical","trueLabel":"classical","videoID":"AVChO2jMQM4","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3fc578dfbd80f24b02a3","predictedLabel":"pop","trueLabel":"pop","videoID":"djV11Xbc914","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3f2778dfbd80f24b029e","predictedLabel":"country","trueLabel":"country","videoID":"1vrEljMfXYo","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3e3878dfbd80f24b025c","predictedLabel":"classical","trueLabel":"classical","videoID":"sbTVZMJ9Z2I","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3dcd78dfbd80f24b0257","predictedLabel":"classical","trueLabel":"classical","videoID":"CvFH_6DNRCY","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3d8478dfbd80f24b0255","predictedLabel":"rock","trueLabel":"rock","videoID":"dlejA2rlF3I","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3d3d78dfbd80f24b0253","predictedLabel":"pop","trueLabel":"pop","videoID":"ZEKUG4EJmCs","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3cf278dfbd80f24b0248","predictedLabel":"pop","trueLabel":"hiphop","videoID":"drssgbhggaQ","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0ee496059a87433dc368","predictedLabel":"disco","trueLabel":"rock","videoID":"htgr3pvBr-I","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0ea896059a87433dc366","predictedLabel":"country","trueLabel":"pop","videoID":"XEjLoHdbVeE","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0deb96059a87433dc356","predictedLabel":"pop","trueLabel":"disco","videoID":"6JhVo2zS8hU","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0da696059a87433dc354","predictedLabel":"hiphop","trueLabel":"reggae","videoID":"NUn3lj64oNw","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0d7196059a87433dc352","predictedLabel":"hiphop","trueLabel":"hiphop","videoID":"eviqX3QXd-s","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0cd696059a87433dc350","predictedLabel":"hiphop","trueLabel":"hiphop","videoID":"NwIxIAztiag","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0c4e96059a87433dc348","predictedLabel":"pop","trueLabel":"pop","videoID":"RzEBEKMlGyA","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0c0696059a87433dc33e","predictedLabel":"rock","trueLabel":"rock","videoID":"Gym95cmKR-g","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0bb596059a87433dc33c","predictedLabel":"classical","trueLabel":"jazz","videoID":"A3yCcXgbKrE","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0b8796059a87433dc33a","predictedLabel":"jazz","trueLabel":"jazz","videoID":"TmIwm5RElRs","success":true,"__v":0}]
        for(let i =0; i<allData.length; ++i){
            if(allData[i]._id === id){
                setData(allData[i]);
                return;
            }
        }
    }, [id])


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if(data && data.data.rawData.length === 0){
        return(
            <div id="predict">
                <div id="no-data-prediction">
                predicted <strong>&nbsp;{data.predictedLabel}</strong>, was <strong>&nbsp;{data.trueLabel}</strong> {data.success ? <CircleCheck/> : <CircleXMark/>}&nbsp;
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
                    {data.trueLabel && (
                        <div className="top">
                        predicted <strong>&nbsp;{data.predictedLabel}</strong>, was <strong>&nbsp;{data.trueLabel}&nbsp;</strong> {data.success ? <CircleCheck/> : <CircleXMark/>}&nbsp;<a
                            tabIndex="0"
                            href={`https://www.youtube.com/watch?v=${data.videoID}`}
                            target='_blank'
                            rel="noreferrer"
                            title={`https://www.youtube.com/watch?v=${data.videoID}`}
                        >
                        Listen on youtube
                    </a>
                        </div>
                    )}
                    {!data.trueLabel && (
                        <div className="top">
                        predicted <strong>&nbsp;{data.predictedLabel}</strong>, unknown true genre. <button onClick={toggleShowModal}>tag this music</button><a
                            tabIndex="0"
                            href={`https://www.youtube.com/watch?v=${data.videoID}`}
                            target='_blank'
                            rel="noreferrer"
                            title={`https://www.youtube.com/watch?v=${data.videoID}`}
                        >
                        Listen on youtube
                    </a>
                    <Modal 
                                isShowing={isModalShowing} 
                                toggleShow={toggleShowModal}
                                modalTitle="Help us improve"
                            >
                                <ImprovementModalBody 
                                    showAlert={()=>setShowToaster(true)} 
                                    guess={data.data.higherGuess} 
                                    toggleShow={toggleShowModal}
                                    id={data._id}
                                />
                                
                            </Modal>
                            <Toaster 
                                isShowing={showToaster}
                                message="Thanks for your feedbacks ❤️"
                                style={{backgroundColor:"#C3F3D7", border:"1px solid #2FD573"}}
                            />
                        </div>
                    )}
                    
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