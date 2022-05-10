
import { useEffect, useState } from "react"

export function PredictionTable(){

    useEffect(()=>{
        async function fetchData(){
          const res = await fetch('/api/feedback/');
          const data = await res.json();
          setData(data);
        }
        fetchData()
      }, [])

    const [data, setData] = useState(null);

    return(
        <div id="table-container">
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
                                className={line.status ? 'prediction-succcess' : 'prediction-fail'}
                            >
                                <td>{line.predictedLabel}</td>
                                <td>{line.trueLabel}</td>
                                <td>
                                    <a href={`https://www.youtube.com/watch?v=${line.videoID}`}>
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