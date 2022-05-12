
import { useEffect, useState, useRef } from "react"
import useWindowDimensions from "./tool/windowDimensions";



export function PredictionTable(){

    const ref = useRef(null);

    const {height, width} = useWindowDimensions()

    
    


    const [data, setData] = useState(null);
    const [count, setCount] = useState(0);


    // useEffect(() => {
    //     console.log("height", ref.current.offsetHeight);
    //     console.log("total", height)
    //     if(ref.current.offsetHeight < height){
    //         setCount(c=>c+1)
    //     }
    //   }, []);

    useEffect(()=>{
        async function fetchData(){
          const response = await fetch(`/api/feedback?page=${count}`);
          const result = await response.json();
          if(count === 0){
            setData(result);
          }
          else {
            setData((data) => [...data, ...result]);
          }
          if(ref.current.offsetHeight < height && result.length > 0){
              setCount(c=>c+1)
          }
        }
        fetchData()
        
      }, [count, height])


      function handleScroll(e){
        const el = e.target.documentElement;
        const bottom = el.scrollHeight - el.scrollTop - 1 < el.clientHeight;
        if (bottom) {
          setCount(c => c+1)
         }
      }

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll);
        return(function(){
            window.removeEventListener("scroll", handleScroll)
        })
    }, [])
    
      

    return(
        <div 
            id="table-container" 
            ref={ref}
        >
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
                                <td>{index} {line.predictedLabel}</td>
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