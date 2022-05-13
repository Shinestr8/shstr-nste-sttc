
import { useEffect, useState, useRef, useCallback } from "react"
import useWindowDimensions from "./tool/windowDimensions";



export function PredictionTable(){

    const ref = useRef(null);

    const {height, width} = useWindowDimensions()


    const [data, setData] = useState(null);
    const [count, setCount] = useState(0);
    const [isDataRemaining, setIsDataRemaining] = useState(true);


    function increment(from){
      setCount(c => c +1);
      console.log("from", from)
    }

  
    useEffect(()=>{
      async function fetchData(){
        const batchSize=20;
        const response = await fetch(`/api/feedback?page=${count}&batchSize=${batchSize}`);
        const result = await response.json();
        // console.log("result length" + result.length, count)
        if(result.length < batchSize){
          setIsDataRemaining(false);
        }
        if(count === 0){
          setData(result);
          console.log("initial data", count)
        }
        else {
          setData((data) => [...data, ...result]);
          console.log("more data", count)
        }
        if(ref.current.offsetHeight < height && result.length === batchSize){
            increment("fill")
        }
      }
      fetchData()
      
    }, [count, height])

      const handleScroll = useCallback(function(e){
        console.log("Elder scroll")
        const el = e.target.documentElement;
        const bottom = el.scrollHeight - el.scrollTop - 1 < el.clientHeight;
        if (bottom && isDataRemaining) {
          console.log("bottom")
          increment("scroll")
         }
      }, [isDataRemaining])

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll);
        return(function(){
            window.removeEventListener("scroll", handleScroll)
        })
    }, [handleScroll])
    
      

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
                    {data && data.map(function(line, index){
                        return(
                            <tr 
                                key={index}     
                                className={line.success ? 'prediction-success' : 'prediction-fail'}
                                id={index === data.length-1 ? 'last' : null}
                            >
                                <td>{index +1} {line.predictedLabel}</td>
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
        </div>
    )
}