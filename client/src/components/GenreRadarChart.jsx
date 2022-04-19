import {RadarChart, PolarGrid, PolarAngleAxis, Radar} from "recharts"

export function GenreRadarChart({data}){
    return(
      <div>
        <RadarChart outerRadius={90} width={730} height={300} data={data.guess}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
      </div>
        
    )
}

