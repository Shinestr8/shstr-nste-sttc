import {RadarChart, PolarGrid, PolarAngleAxis, Radar} from "recharts"

export function GenreRadarChart({data}){
    return(
      <div>
        <RadarChart outerRadius={90} width={730} height={300} data={data.guess}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar dataKey="count" stroke="#1C3041" fill="#faf" fillOpacity={0.6} />
      </RadarChart>
      </div>
        
    )
}

