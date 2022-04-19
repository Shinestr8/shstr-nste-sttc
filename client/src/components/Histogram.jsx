import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomTooltip({active, payload, label, genres}){
    console.log(payload)
    if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
            <p className="intro">{label}</p> */}
            <p>Time: {formatTime(label)}</p>
            <p>Genre: {genres[payload[0].value]}</p>
          </div>
        );
}
}

function formatTime(value){
    // if(value > 60){
        let minutes = Math.floor(value/60);
        let seconds = Math.floor(value%60);
        if(seconds < 10){
            seconds = "0" + seconds
        }
        return `${minutes}:${seconds}`
    // }
    // return Math.floor(value);
}

export function Histogram({rawData}){

    const genres = useMemo(function(){
        return ["Blues", "Classical", "Country", "Disco", "Hiphop", "Jazz", "Metal", "Pop", "Reggae", "Rock"];
    }, [])
    
    const [data, setData] = useState(null);

    useEffect(function(){
        let newData = [];
        let newEntry = {};
        let existingGenres = [];
        for(let i = 0; i < rawData.length; ++i){
            if(!existingGenres.includes(genres[rawData[i]])){
                existingGenres.push(genres[rawData[i]]);
            }
            newEntry = {
                index: rawData[i],
                genre: genres[rawData[i]],
                time: i*1.5
            }
            // newData.sort(function(a, b){
            //     let keyA = a.index;
            //     let keyB = b.index;
            //     if(keyA < keyB) return -1;
            //     if(keyA > keyB) return 1;
            //     return 0;
            // })
            newData.push(newEntry);
            
            // console.log(i);
        }
        setData(newData)
    }, [rawData, genres])

    function yFormatter(value){
        return(`${genres[value]}`);
    }

    function xFormatter(value){
        return formatTime(value)
    }

    function tooltipFormatter(x){
        return <div>{genres[x]}</div>
    }

    return(
        <div id="histogram">
        {data && (
            <ResponsiveContainer width="99%" height={500}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis dataKey="time" tickFormatter={xFormatter}/>
              <YAxis tickCount={10} dataKey="index" name="genre" tickFormatter={yFormatter} />
              <Tooltip content={<CustomTooltip genres={genres}/>}/>
              <Line 
                isAnimationActive={false}
                name="genre" 
                type="monotone" 
                dataKey="index"
                // strokeDasharray="3 3"
                stroke="#1c3041" 
                // dot={<CustomDot/>   }
                activeDot={{ r: 8 }}
                dot={{ fill: "#FAF", stroke: '#1C3041', strokeWidth: 2, r: 4,strokeDasharray:' '}}
            />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>    
            
     
        )}
        </div>
    )
}
