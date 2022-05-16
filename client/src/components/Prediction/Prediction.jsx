import { useParams } from "react-router-dom";

export function Prediction(){
    const {id} = useParams();
    return(
        <div>
            {id}
        </div>
    )
}