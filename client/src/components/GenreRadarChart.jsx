import { useEffect, useState} from "react"
import {RadarChart, PolarGrid, PolarAngleAxis, Radar} from "recharts"

export function GenreRadarChart({data}){
  const [sortedData, setSortedData] = useState(null);

  useEffect(function(){
    let newData = [...data.guess];
    newData.sort(function(a, b) {
      let keyA = a.name;
      let keyB = b.name;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    setSortedData(newData)
  }, [data])
  
    return(
      <div>
        <RadarChart outerRadius={90} width={730} height={300} data={sortedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar dataKey="count" stroke="#1C3041" fill="#faf" fillOpacity={0.6} />
      </RadarChart>
      </div>
        
    )
}

