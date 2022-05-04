import { HeatMapGrid } from 'react-grid-heatmap';


//TODO: Make this responsive
export function ConfusionMatrix(){

  const xLabels = ['Blues', 'Classical', 'Country', 'Disco', 'HipHop', 'Jazz', 'Metal', 'Pop', 'Reggae', 'Rock'];
  const yLabels = ['Blues', 'Classical', 'Country', 'Disco', 'HipHop', 'Jazz', 'Metal', 'Pop', 'Reggae', 'Rock'];
  
  const data = [
    [92, 0, 4, 0, 1, 1, 1, 0, 1, 1],
    [0, 83, 2, 2, 0, 8, 0, 0, 0, 3],
    [9, 0, 66, 3, 0, 2, 2, 4, 5, 9],
    [6, 0, 0, 78, 7, 0, 1, 2, 4, 1],
    [1, 0, 0, 6, 82, 0, 2, 2, 7, 0],
    [9, 4, 9, 0, 0, 69, 0, 1, 3, 5],
    [6, 0, 0, 0, 6, 1, 81, 0, 1, 5],
    [0, 0, 1, 12, 9, 0, 0, 74, 3, 2],
    [2, 0, 2, 3, 9, 0, 1, 2, 80, 2],
    [7, 0, 7, 9, 3, 2, 6, 6, 6, 54]
  ]

  function cellRender(x, y, value){
    return <div title={value}>{value}%</div>
  }


  return(
    <div>
        <h4 style={{textAlign: 'center'}}>Confusion matrix (1.5sec segments)</h4>
        <div style={{textAlign: 'center'}}>Predicted labels</div>
        <div style={{display: 'flex'}}>
            <div style={{flex: "0", writingMode: 'vertical-rl', alignSelf: 'center', marginRight: 'auto'}}>True labels</div>
            <div style={{marginLeft: 'auto'}}>
            <HeatMapGrid
                data={data}
                xLabels={xLabels}
                yLabels={yLabels}
                cellHeight="4rem"
                cellRender={cellRender}
                xLabelsStyle={() => ({
                    // color: index % 2 ? 'transparent' : '#777',
                    fontSize: '.8rem'
                    })}
                yLabelsStyle={()=>({fontSize: '.8rem'})}
                cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(248, 0, 248, ${ratio})`,
                    fontSize: '.8rem',
                    color: `rgb(0, 0, 0)`
                })}


                square={true}
            />
            </div>
            
        </div>
        
    </div>
    
  )
}