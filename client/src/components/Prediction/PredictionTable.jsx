import { useEffect, useState, useRef, useCallback } from "react"
import useWindowDimensions from "../tool/windowDimensions";
import { useNavigate } from "react-router-dom";
import { OnoStats } from "./OnoStats";


export function PredictionTable(props){

    const isPreview = props.isPreview;

    const navigate = useNavigate();
    const ref = useRef(null);

    const {height} = useWindowDimensions()


    const [data, setData] = useState(null);
    const [stats, setStats] = useState(null);
    const [count, setCount] = useState(0);
    const [isDataRemaining, setIsDataRemaining] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(()=>{
        async function loadStats(){
            const response = await fetch('/api/feedback/stats');
            const result = await response.json();
            setStats(result);
        }
        loadStats();
    }, [])
  
    useEffect(()=>{
        async function fetchLatestData(){
            setIsLoading(true);
            const batchSize = 10;
            const response = await fetch(`/api/feedback?page=0&batchSize=${batchSize}`);
            const result = await response.json();
            setData(result);
            setIsLoading(false);
        }  

        async function fetchBatchData(){
            setIsLoading(true);
            const batchSize=20;
            const response = await fetch(`/api/feedback?page=${count}&batchSize=${batchSize}`);
            const result = await response.json();
            if(result.length < batchSize){
            setIsDataRemaining(false);
            }
            if(count === 0){
            setData(result);
            setIsLoading(false);
            }
            else {
            setData((data) => [...data, ...result]);
            setIsLoading(false);
            }
            if(ref.current && ref.current.offsetHeight < height && result.length === batchSize){
                setCount(c => c +1);
            }
        }
        if(!isPreview){
            fetchBatchData()
        } else {
            fetchLatestData()
        }
        
      
    }, [count, height, isPreview])



    const handleScroll = useCallback(function(e){
    const el = e.target.documentElement;
    const bottom = el.scrollHeight - el.scrollTop - 1 < el.clientHeight;
    if (bottom && isDataRemaining) {
        setCount(c => c +1);
        }
    }, [isDataRemaining])



    useEffect(()=>{
        if(!isPreview){
            window.addEventListener('scroll',handleScroll);
            return(function(){
                window.removeEventListener("scroll", handleScroll)
            })
        }
        
    }, [handleScroll, isPreview])
    
      
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

    if(data){
        return(
            <div 
                style={{display:"flex", flexDirection: "column", alignItems: "center", width:"100%"}}
            >
            {!props.isPreview && stats && (
                <OnoStats data={stats}/>
            )}
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
                        {data.map(function(line, index){
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
                {isLoading && (
                    <div>Loading...</div>
                )}
                {!isDataRemaining && !isPreview &&(
                    <div style={{paddingTop:'1rem'}}>No more data to show</div>
                )}
            </div>
            </div>
            
        )
    }
    
}