
import { useState } from "react"

export function PredictionTable(){


    const [data, setData] = useState([
        {
            status: 'fail',
            predictedLabel: 'hiphop',
            trueLabel: 'pop',
            youtubeURL: 'https://www.youtube.com/watch?v=9KW7hojmoaI'
        },
        {
            status: 'success',
            predictedLabel: 'metal',
            trueLabel: 'metal',
            youtubeURL: 'https://www.youtube.com/watch?v=9KW7hojmoaI'
        }
    ])

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
                            <tr className={`prediction-${line.status}`}>
                                <td>{line.predictedLabel}</td>
                                <td>{line.trueLabel}</td>
                                <td><a href={line.youtubeURL}>{line.youtubeURL}</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}