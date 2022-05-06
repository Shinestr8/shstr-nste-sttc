import React from "react";
import ReactDOM from "react-dom";
import { PropTypes } from "prop-types";


import './Toaster.css'


export function Toaster(props){


    if(props.isShowing){
        return(ReactDOM.createPortal(
            <>
            <div  id="toaster">
                <div id="toast" style={props.style}>
                    {props.message}
                </div>
            </div>
            </>
        ,document.body))
    }
}

Toaster.propTypes = {
    message: PropTypes.string,
    isShowing: PropTypes.bool,
    style: PropTypes.object
}