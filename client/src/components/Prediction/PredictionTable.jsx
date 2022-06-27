import { useEffect, useState, useRef} from "react"
import { useNavigate } from "react-router-dom";
import { OnoStats } from "./OnoStats";

import { MagnifyingGlass } from "../General/Icons/MagnifyingGlass";
import { useMemo } from "react";


export function PredictionTable(props){

    const navigate = useNavigate();
    const ref = useRef(null);

    const data = useMemo(()=>{
        return [{"data":{"guess":[{"name":"metal","count":58},{"name":"rock","count":19},{"name":"classical","count":16},{"name":"jazz","count":14}],"higherGuess":"metal","higherCount":58,"total":107,"message":"success","rawData":[1,1,1,1,1,1,5,1,1,1,1,1,1,5,1,5,5,5,5,1,1,5,5,5,5,5,1,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9,9,6,6,6,6,6,6,6,6,9,6,6,6,6,6,6,6,6,6,6,9,6,9,9,6,9,9,6,9,6,9,6,9,9,9,9,9,9,9,9,9,6,6,6,6,6]},"_id":"62b99e3abf813517a3bf64e0","predictedLabel":"metal","videoID":"fsPMu_zjSMc","__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e42940e51c713485db9b5","predictedLabel":"classical","trueLabel":"classical","videoID":"l0GN40EL1VU","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e41750e51c713485db9b3","predictedLabel":"metal","trueLabel":"metal","videoID":"UCxgbOBVSfM","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e405a78dfbd80f24b02b4","predictedLabel":"classical","trueLabel":"classical","videoID":"AVChO2jMQM4","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3fc578dfbd80f24b02a3","predictedLabel":"pop","trueLabel":"pop","videoID":"djV11Xbc914","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3f2778dfbd80f24b029e","predictedLabel":"country","trueLabel":"country","videoID":"1vrEljMfXYo","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3e3878dfbd80f24b025c","predictedLabel":"classical","trueLabel":"classical","videoID":"sbTVZMJ9Z2I","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3dcd78dfbd80f24b0257","predictedLabel":"classical","trueLabel":"classical","videoID":"CvFH_6DNRCY","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3d8478dfbd80f24b0255","predictedLabel":"rock","trueLabel":"rock","videoID":"dlejA2rlF3I","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3d3d78dfbd80f24b0253","predictedLabel":"pop","trueLabel":"pop","videoID":"ZEKUG4EJmCs","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627e3cf278dfbd80f24b0248","predictedLabel":"pop","trueLabel":"hiphop","videoID":"drssgbhggaQ","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0ee496059a87433dc368","predictedLabel":"disco","trueLabel":"rock","videoID":"htgr3pvBr-I","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0ea896059a87433dc366","predictedLabel":"country","trueLabel":"pop","videoID":"XEjLoHdbVeE","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0deb96059a87433dc356","predictedLabel":"pop","trueLabel":"disco","videoID":"6JhVo2zS8hU","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0da696059a87433dc354","predictedLabel":"hiphop","trueLabel":"reggae","videoID":"NUn3lj64oNw","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0d7196059a87433dc352","predictedLabel":"hiphop","trueLabel":"hiphop","videoID":"eviqX3QXd-s","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0cd696059a87433dc350","predictedLabel":"hiphop","trueLabel":"hiphop","videoID":"NwIxIAztiag","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0c4e96059a87433dc348","predictedLabel":"pop","trueLabel":"pop","videoID":"RzEBEKMlGyA","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0c0696059a87433dc33e","predictedLabel":"rock","trueLabel":"rock","videoID":"Gym95cmKR-g","success":true,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0bb596059a87433dc33c","predictedLabel":"classical","trueLabel":"jazz","videoID":"A3yCcXgbKrE","success":false,"__v":0},{"data":{"rawData":[],"guess":[]},"_id":"627d0b8796059a87433dc33a","predictedLabel":"jazz","trueLabel":"jazz","videoID":"TmIwm5RElRs","success":true,"__v":0}]
    }, [])
    const stats = useMemo(()=>{
        return {"total":21,"goodPred":14,"untagged":1};
    }, [])
    const [displayData, setDisplayData] = useState(null);
    const [filter, setFilter] = useState('all');
    const [textFilter, setTextFilter] = useState('');
    const [textFilteredData, setTextFilteredData] = useState('');



    //filter with text input
    useEffect(()=>{
        if(!displayData){
            return
        }
        setTextFilteredData(displayData.filter(function(line){
            if(line.trueLabel !== undefined){
                return (line.trueLabel.includes(textFilter.toLowerCase()));
            }
            return 0
        }))
    }, [displayData, data, textFilter])


    //filter with radio
    useEffect(()=>{
        setDisplayData(data);
        switch(filter){
            case 'untagged':
                setDisplayData(data.filter(line=>line.success===undefined))
                break;
            case 'success':
                setDisplayData(data.filter(line=>line.success===true))
                break;
            case 'failed':
                setDisplayData(data.filter(line=>line.success===false))
                break;
            default:
                setDisplayData(data);
                break;
        }
    }, [data, filter])

      
    function handleLineClick(id){
        navigate(`/prediction/${id}`);
    }

    function handleEnterPress(e,id){
        if(e.key === "Enter"){
            handleLineClick(id);
        }
    }

    function handleLinkClick(e){
        e.stopPropagation();
    }

    function processClassname(success){
        if(success===undefined){
            return 'prediction-unknown';
        }
        if(success === true){
            return 'prediction-success';
        }
        if(success === false){
            return 'prediction-fail'
        }
    }   

    function handleTextChange(e){
        setTextFilter(e.target.value);
    }


    function handleRadioChange(e){
        setFilter(e.target.value)
    }
    
        return(
            <div 
                style={{display:"flex", flexDirection: "column", alignItems: "center", width:"100%"}}
            >
            
            
            {!props.isPreview && stats && (
                <>
                    <OnoStats data={stats}/>
                    <div id="radio-group">
                        <div>
                            <input 
                                type="radio" 
                                value="all" 
                                id="all" 
                                checked={filter === 'all'} 
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="all">Show all</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                value="success" 
                                id="success" 
                                checked={filter === 'success'} 
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="success">Successful predictions</label>
                        </div>
                        
                        <div>
                            <input 
                                type="radio" 
                                value="failed" 
                                id="failed" 
                                checked={filter === 'failed'} 
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="failed">Failed predictions</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                value="untagged" 
                                id="untagged" 
                                checked={filter === 'untagged'} 
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="untagged">Untagged predictions</label>
                        </div>
                        
                        <div>
                            <span className="filter-text-group">
                                <MagnifyingGlass/> 
                                <input id="filter-text" type="text" value={textFilter} onChange={handleTextChange}/>
                                {!textFilter &&(
                                    <label htmlFor="filter-text">
                                        Search a genre
                                    </label>
                                )}
                            </span>
                        </div>
                        
                        
                    </div>
                </>
            )}

            
            {data && displayData && textFilter === '' &&  (
                <div id="table-container" ref={ref}>
                <table id="prediction-table">
                    <thead>
                        <tr>
                            <th>Predicted label</th>
                            <th>True label</th>
                            <th>Song URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map(function(line, index){
                            processClassname(line.success);
                            return(
                                <tr 
                                    tabIndex="0"
                                    onKeyUp={(e)=>handleEnterPress(e, line._id)}
                                    onClick={()=>{handleLineClick(line._id)}}
                                    key={index + line._id}     
                                    className={processClassname(line.success)}
                                    id={index === data.length-1 ? 'last' : null}
                                >
                                    <td>{index+1} {line.predictedLabel}</td>
                                    <td>{line.trueLabel}</td>
                                    <td>
                                        <a 
                                            onClick={handleLinkClick}
                                            tabIndex="0"
                                            href={`https://www.youtube.com/watch?v=${line.videoID}`}
                                            target='_blank'
                                            rel="noreferrer"
                                            title={`https://www.youtube.com/watch?v=${line.videoID}`}
                                        >
                                            {line.videoID}
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            )}

            {textFilter !== '' && textFilteredData.length === 0 && (
                <div>No data matching genre <strong>{textFilter}</strong></div>
            )}
            {data && displayData && textFilteredData.length!==0 && textFilter!=='' && (
                <div id="table-container" ref={ref}>
                    <table id="prediction-table">
                    <thead>
                        <tr>
                            <th>Predicted label</th>
                            <th>True label</th>
                            <th>Song URL</th>
                        </tr>
                    </thead>
                    <tbody>
                    {textFilter !== '' && textFilteredData.map(function(line, index){
                            processClassname(line.success);
                            return(
                                <tr 
                                    tabIndex="0"
                                    onKeyUp={(e)=>handleEnterPress(e, line._id)}
                                    onClick={()=>{handleLineClick(line._id)}}
                                    key={index + line._id}     
                                    className={processClassname(line.success)}
                                    id={index === data.length-1 ? 'last' : null}
                                >
                                    <td>{index+1} {line.predictedLabel}</td>
                                    <td>{line.trueLabel}</td>
                                    <td>
                                        <a 
                                            onClick={handleLinkClick}
                                            tabIndex="0"
                                            href={`https://www.youtube.com/watch?v=${line.videoID}`}
                                            target='_blank'
                                            rel="noreferrer"
                                            title={`https://www.youtube.com/watch?v=${line.videoID}`}
                                        >
                                            {line.videoID}
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
            )}
            
            </div>
            
        )
    
    
}