import React from "react";
import ReactDOM from "react-dom";
// import { filterProps } from "recharts/types/util/types";


import './Toaster.css'


export function Toaster(props){


    if(props.isShowing){
        return(ReactDOM.createPortal(
            <>
            <div  id="toaster">
                {/* <div id="test-toast">Thanks blabla</div> */}
                <div id="toast" style={props.style}>
                    {props.message}
                </div>
            </div>
            </>
        ,document.body))
    }
}