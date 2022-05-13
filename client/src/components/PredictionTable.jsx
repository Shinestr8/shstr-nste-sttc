import { useEffect, useState, useRef, useCallback } from "react"
import useWindowDimensions from "./tool/windowDimensions";



export function PredictionTable(props){

    const isPreview = props.isPreview;

    const ref = useRef(null);

    const {height} = useWindowDimensions()


    const [data, setData] = useState(null);
    const [count, setCount] = useState(0);
    const [isDataRemaining, setIsDataRemaining] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

  
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
            if(ref.current.offsetHeight < height && result.length === batchSize){
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
    
      
    if(data){
        return(
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
                            return(
                                <tr 
                                    key={index}     
                                    className={line.success ? 'prediction-success' : 'prediction-fail'}
                                    id={index === data.length-1 ? 'last' : null}
                                >
                                    <td>{line.predictedLabel}</td>
                                    <td>{line.trueLabel}</td>
                                    <td>
                                        <a 
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
        )
    }
    
}