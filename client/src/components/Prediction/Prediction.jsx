import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Histogram } from "../Charts/Histogram";
import { GenreRadarChart } from "../Charts/GenreRadarChart";

import { CircleCheck } from "../General/Icons/CircleCheck";
import { CircleXMark } from "../General/Icons/CircleXMark";
import { Modal } from "../General/Modal/Modal";
import { ImprovementModalBody } from "../Process/ImprovementModalBody";
import { Toaster } from "../General/Toaster/Toaster";

export function Prediction(){

    const {id} = useParams();
    const [data, setData] = useState(null);
    
    const [isModalShowing, setShowModal] = useState(false);
    const [showToaster, setShowToaster] = useState(false);


    useEffect(function(){
        let timer;
        if(showToaster){
            timer = setTimeout(function(){
                setShowToaster(false);
            }, 5000);
        }
        return(function(){
            window.clearTimeout(timer)
        })
    }, [showToaster])


    function toggleShowModal(){
        setShowModal(prev => !prev);
    }

    

    useEffect(()=>{
        const allData = [{"data":{"guess":[{"name":"metal","count":55},{"name":"rock","count":23},{"name":"jazz","count":16},{"name":"classical","count":14}],"higherGuess":"metal","higherCount":55,"total":108,"message":"success","rawData":[1,1,1,1,1,1,5,1,1,1,1,1,1,5,1,5,5,5,5,1,5,5,5,5,5,5,5,5,5,9,9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9,9,6,6,9,6,6,6,6,6,9,9,6,6,6,6,6,6,6,9,6,9,9,9,9,6,9,9,6,6,6,9,9,9,9,9,9,9,9,6,6,9,6,6,6,6,6,5]},"_id":"62bad618c471f92a846aee53","predictedLabel":"metal","videoID":"onX5b4F7_k4","__v":0},{"data":{"guess":[{"name":"reggae","count":62},{"name":"disco","count":38},{"name":"pop","count":19},{"name":"country","count":18},{"name":"rock","count":10},{"name":"classical","count":4},{"name":"jazz","count":2},{"name":"blues","count":1}],"higherGuess":"reggae","higherCount":62,"total":154,"message":"success","rawData":[1,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,2,8,8,7,9,7,8,2,2,8,3,3,3,8,8,2,8,8,2,3,8,8,8,3,7,8,3,3,8,3,8,8,3,8,3,3,2,7,8,7,8,7,8,8,7,7,7,9,9,7,2,3,3,8,3,2,7,3,3,7,8,3,3,3,3,8,3,3,3,3,8,7,8,8,9,7,2,8,9,3,7,0,3,3,8,3,8,7,3,2,9,9,2,3,2,3,2,2,8,3,3,2,7,3,3,7,9,3,3,3,2,2,9,9,2,7,8,5,5,1,1,1]},"_id":"62bad5dcc471f92a846aee4f","predictedLabel":"reggae","videoID":"CHekNnySAfM","__v":0,"success":true,"trueLabel":"reggae"},{"data":{"guess":[{"name":"pop","count":83},{"name":"disco","count":25},{"name":"country","count":16},{"name":"rock","count":13},{"name":"classical","count":12},{"name":"hiphop","count":6},{"name":"reggae","count":5},{"name":"jazz","count":2},{"name":"metal","count":1}],"higherGuess":"pop","higherCount":83,"total":163,"message":"success","rawData":[1,1,4,4,4,7,7,8,7,3,9,7,9,7,7,7,7,2,7,7,7,7,7,7,7,3,7,3,7,3,7,2,7,2,7,3,2,3,3,9,7,7,3,7,3,7,3,3,7,7,7,7,2,7,7,2,3,3,7,7,2,7,9,7,3,9,7,3,7,3,7,2,3,3,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,9,8,7,7,7,2,2,7,7,7,7,7,9,7,7,7,8,7,8,4,4,7,3,7,9,2,3,3,7,7,7,7,7,2,9,9,3,7,7,7,7,7,7,7,7,7,3,3,7,7,3,4,6,5,1,1,1,1,1,1,9,2,2,9,9,2,2,5,1,1,1,1]},"_id":"62bad566c471f92a846aee43","predictedLabel":"pop","videoID":"djV11Xbc914","__v":0,"success":true,"trueLabel":"pop"},{"data":{"guess":[{"name":"country","count":88},{"name":"rock","count":32},{"name":"classical","count":8},{"name":"jazz","count":3},{"name":"metal","count":1}],"higherGuess":"country","higherCount":88,"total":132,"message":"success","rawData":[2,9,9,2,2,2,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,2,2,2,9,9,9,9,2,9,9,2,2,2,2,2,2,2,2,2,9,2,2,2,9,2,2,9,2,2,2,2,2,2,2,2,2,9,9,9,2,9,9,2,2,2,2,2,2,2,2,2,2,2,2,9,2,2,2,2,2,2,2,2,2,2,2,9,9,9,2,2,9,9,2,2,2,2,9,2,9,2,9,2,9,9,9,9,9,6,9,2,2,2,2,2,2,2,2,2,2,9,5,1,1,1,1,1,1,1,1]},"_id":"62bad512c471f92a846aee37","predictedLabel":"country","videoID":"1vrEljMfXYo","__v":0,"success":true,"trueLabel":"country"},{"data":{"guess":[{"name":"classical","count":235},{"name":"country","count":9},{"name":"jazz","count":5},{"name":"rock","count":2}],"higherGuess":"classical","higherCount":235,"total":251,"message":"success","rawData":[1,1,1,1,1,5,5,1,1,9,1,9,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,5,2,2,1,1,2,1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1]},"_id":"62bad4eec471f92a846aee33","predictedLabel":"classical","videoID":"NlprozGcs80","__v":0,"success":true,"trueLabel":"classical"},{"data":{"guess":[{"name":"disco","count":80},{"name":"country","count":54},{"name":"pop","count":22},{"name":"jazz","count":21},{"name":"classical","count":11},{"name":"rock","count":10},{"name":"blues","count":1},{"name":"metal","count":1},{"name":"reggae","count":1}],"higherGuess":"disco","higherCount":80,"total":201,"message":"success","rawData":[1,1,2,5,5,0,2,2,1,5,5,2,2,5,5,2,7,7,2,5,2,2,9,5,1,8,2,3,2,3,2,3,2,5,2,3,6,5,2,2,3,3,3,3,3,3,7,2,7,3,2,7,2,3,2,2,2,3,3,3,7,3,3,3,2,2,7,7,3,2,3,3,2,2,3,3,2,3,3,3,3,3,3,3,3,2,3,3,3,3,3,2,2,5,3,2,2,3,3,3,3,3,3,7,7,7,3,3,2,3,3,3,3,3,3,7,7,3,2,3,2,2,3,3,3,3,3,2,3,9,2,2,7,2,2,2,7,2,5,2,1,5,2,2,2,9,9,9,5,5,5,5,5,5,7,3,3,3,3,7,3,5,3,9,7,3,3,7,3,2,3,3,7,3,3,7,3,3,2,3,3,9,2,3,3,2,9,3,7,2,3,9,2,9,5,1,1,1,1,1,1]},"_id":"62bad491c471f92a846aee27","predictedLabel":"disco","videoID":"jc6H2azeBGI","__v":0,"success":false,"trueLabel":"country"},{"data":{"guess":[{"name":"pop","count":66},{"name":"disco","count":20},{"name":"hiphop","count":20},{"name":"rock","count":11},{"name":"reggae","count":6},{"name":"classical","count":5},{"name":"jazz","count":1}],"higherGuess":"pop","higherCount":66,"total":129,"message":"success","rawData":[1,5,8,4,8,8,4,4,4,8,9,4,7,4,1,4,9,7,3,4,7,7,7,4,9,7,7,7,7,7,3,7,7,7,7,7,4,7,7,4,7,7,7,7,9,9,7,4,7,7,7,7,4,9,7,7,7,7,4,7,7,7,7,4,7,7,7,7,3,4,3,4,9,1,7,3,7,7,7,3,3,7,4,9,7,7,7,7,7,7,7,7,7,7,3,3,3,3,3,3,3,3,3,7,3,7,4,7,7,3,7,3,9,3,7,7,7,7,7,7,7,7,9,8,9,4,8,1,1]},"_id":"62bad437c471f92a846aee23","predictedLabel":"pop","videoID":"mOYZaiDZ7BM","__v":0,"success":false,"trueLabel":"country"},{"data":{"guess":[{"name":"metal","count":142},{"name":"rock","count":12},{"name":"country","count":4},{"name":"classical","count":1},{"name":"jazz","count":1}],"higherGuess":"metal","higherCount":142,"total":160,"message":"success","rawData":[6,6,9,9,9,6,6,9,6,9,9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9,6,9,6,6,6,6,6,6,6,6,6,6,6,6,2,6,6,6,6,6,6,9,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,9,6,6,6,6,9,6,6,6,6,6,2,6,6,6,6,6,6,6,6,6,6,2,2,6,6,6,6,6,9,6,6,5,1]},"_id":"62bad3a8c471f92a846aee17","predictedLabel":"metal","videoID":"0weO3xBMjzQ","__v":0,"success":true,"trueLabel":"metal"},{"data":{"guess":[{"name":"pop","count":179},{"name":"hiphop","count":11},{"name":"classical","count":6},{"name":"reggae","count":3}],"higherGuess":"pop","higherCount":179,"total":199,"message":"success","rawData":[1,1,1,1,1,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,7,7,7,7,7,4,7,7,7,7,7,7,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,7,7,7,7,4,7,4,4,7,7,7,7,7,7,7,4,7,7,7,7,7,7,7,7,7,4,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,7,8,7,7,7,1]},"_id":"62bad36cc471f92a846aee13","predictedLabel":"pop","videoID":"COhSLGKv0Sk","__v":0,"success":false,"trueLabel":"hiphop"},{"data":{"guess":[{"name":"classical","count":148},{"name":"jazz","count":121},{"name":"rock","count":28}],"higherGuess":"classical","higherCount":148,"total":297,"message":"success","rawData":[1,1,1,9,9,5,5,1,9,5,5,9,1,5,1,1,5,9,1,9,5,1,1,1,1,1,1,5,9,5,1,5,9,5,1,5,1,1,1,5,1,1,1,1,5,5,1,1,5,5,5,1,1,5,5,5,1,1,5,1,1,5,1,1,1,5,5,5,5,5,5,1,1,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,5,9,9,5,9,1,1,1,1,5,1,5,1,1,1,5,5,5,5,5,5,5,1,5,9,5,1,1,5,5,1,1,1,1,1,1,5,1,5,1,1,1,1,1,5,1,1,1,5,1,1,5,1,1,1,1,1,1,1,1,1,5,1,5,1,1,5,5,9,5,9,5,9,5,1,5,5,1,9,1,5,1,5,1,1,1,5,5,1,1,5,5,9,5,5,1,1,1,5,1,1,5,1,1,5,5,5,5,5,1,5,5,5,1,1,9,1,5,5,1,5,1,1,5,5,5,5,1,5,1,5,5,5,1,1,1,1,1,5,5,5,5,9,1,5,1,5,5,5,1,1,5,9,5,1,5,5,1,1,5,5,1,5,5,5,1,5,5,5,1,5,5,1,1,5,9,1,9,9,5,9,5,9,1,9,1,9,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},"_id":"62bad30ac471f92a846aee07","predictedLabel":"classical","videoID":"sbTVZMJ9Z2I","__v":0,"success":true,"trueLabel":"classical"},{"data":{"guess":[{"name":"classical","count":195},{"name":"jazz","count":6}],"higherGuess":"classical","higherCount":195,"total":201,"message":"success","rawData":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},"_id":"62bad1dcc471f92a846aedf6","predictedLabel":"classical","videoID":"CvFH_6DNRCY","__v":0,"success":true,"trueLabel":"classical"},{"data":{"guess":[{"name":"rock","count":112},{"name":"metal","count":66},{"name":"pop","count":65},{"name":"country","count":40},{"name":"hiphop","count":21},{"name":"disco","count":19},{"name":"reggae","count":4},{"name":"blues","count":1},{"name":"classical","count":1}],"higherGuess":"rock","higherCount":112,"total":329,"message":"success","rawData":[9,9,9,9,9,3,3,2,3,3,9,6,9,6,7,7,7,2,7,7,7,9,7,7,7,7,7,9,7,7,9,9,7,7,9,6,7,7,9,7,7,3,3,3,3,7,7,7,7,7,2,7,3,9,3,7,7,2,3,7,7,7,6,7,7,7,9,7,7,9,9,7,9,9,9,9,9,9,9,9,9,9,6,9,9,9,2,9,9,9,6,9,0,8,4,6,4,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,3,4,7,6,7,9,3,7,9,7,7,9,6,7,9,9,9,7,7,7,6,3,7,7,9,7,6,6,6,9,9,9,9,9,9,9,6,9,6,9,9,9,2,9,2,8,8,8,2,2,2,2,9,2,9,7,9,9,9,9,7,9,2,9,9,2,7,9,2,9,2,9,4,2,3,3,2,9,6,3,2,9,6,6,2,6,6,6,9,7,6,2,9,9,9,9,7,9,2,2,9,7,9,2,9,7,9,9,7,9,9,2,7,9,2,7,7,9,7,9,7,9,2,2,6,6,6,7,6,9,9,9,9,6,2,6,6,6,2,6,7,2,9,9,9,4,2,3,9,9,9,6,9,9,9,9,6,6,9,6,6,9,6,9,9,2,2,2,2,2,2,2,6,6,6,7,6,9,9,9,6,9,2,6,6,6,9,7,9,9,6,6,9,6,6,6,6,6,9,6,6,9,6,6,6,6,6,6,6,6,6,6,6,1]},"_id":"62bad188c471f92a846aedf2","predictedLabel":"rock","videoID":"dlejA2rlF3I","__v":0,"success":true,"trueLabel":"rock"},{"data":{"guess":[{"name":"disco","count":58},{"name":"rock","count":49},{"name":"country","count":34},{"name":"reggae","count":7},{"name":"jazz","count":4},{"name":"pop","count":3},{"name":"classical","count":2},{"name":"metal","count":2}],"higherGuess":"disco","higherCount":58,"total":159,"message":"success","rawData":[5,1,5,5,3,8,8,9,9,8,8,9,9,3,9,2,2,2,2,2,2,2,9,2,2,2,2,2,9,9,9,2,9,3,3,2,8,9,9,3,3,3,3,9,9,2,2,9,9,9,2,2,2,9,9,2,2,2,2,9,9,3,9,3,3,9,8,3,3,2,3,3,3,9,9,3,3,7,3,9,9,9,3,7,3,3,3,9,3,3,9,9,9,7,3,3,3,3,9,9,9,9,2,2,2,9,3,3,2,9,9,2,2,2,2,2,9,9,9,3,3,3,2,9,5,3,3,8,3,3,3,3,3,9,3,3,9,3,3,3,3,3,3,3,3,3,9,3,3,3,3,3,3,9,6,6,9,9,1]},"_id":"62bad060d17f7942a309c5c7","predictedLabel":"disco","videoID":"htgr3pvBr-I","__v":0,"success":false,"trueLabel":"rock"},{"data":{"guess":[{"name":"pop","count":80},{"name":"disco","count":78},{"name":"reggae","count":10},{"name":"hiphop","count":4},{"name":"rock","count":3},{"name":"country","count":1},{"name":"jazz","count":1}],"higherGuess":"pop","higherCount":80,"total":177,"message":"success","rawData":[4,4,4,8,8,3,3,8,3,3,3,3,3,3,3,3,3,3,8,8,8,8,3,3,3,7,7,3,7,7,3,7,7,7,3,3,3,3,3,7,3,8,3,7,7,7,3,7,3,7,3,7,3,3,3,3,7,7,3,3,7,3,3,3,3,3,7,7,7,7,7,7,7,7,3,7,7,3,3,7,3,3,7,3,7,7,7,7,9,8,7,7,7,3,7,7,9,3,7,7,3,7,7,7,3,3,3,3,3,3,3,3,3,3,4,3,9,7,3,7,7,3,3,3,3,3,7,7,7,7,7,7,7,7,3,7,8,7,7,7,7,7,7,7,7,7,7,3,7,7,7,7,7,3,3,3,7,3,7,7,3,7,3,3,3,3,7,3,7,3,7,7,3,2,7,7,5]},"_id":"62bad01fd17f7942a309c5c3","predictedLabel":"pop","videoID":"6JhVo2zS8hU","__v":0,"success":false,"trueLabel":"disco"},{"data":{"guess":[{"name":"hiphop","count":109},{"name":"reggae","count":70},{"name":"pop","count":17},{"name":"country","count":4},{"name":"rock","count":3},{"name":"blues","count":2},{"name":"classical","count":2},{"name":"jazz","count":1}],"higherGuess":"hiphop","higherCount":109,"total":208,"message":"success","rawData":[4,8,8,8,7,7,5,8,7,7,4,4,4,4,4,4,4,4,4,4,8,8,4,4,4,4,4,4,8,4,8,7,4,7,8,8,4,8,8,8,8,8,4,8,8,4,8,8,4,4,8,4,4,8,8,2,0,4,8,4,4,4,4,4,4,2,4,4,4,8,8,8,4,8,4,7,4,8,4,4,4,4,4,4,8,8,8,4,4,8,7,8,8,2,2,9,7,4,8,4,4,4,8,8,7,0,8,4,8,8,7,8,4,4,4,4,4,4,7,4,4,4,4,4,4,8,4,4,4,4,7,8,1,9,8,4,8,4,4,7,4,4,4,8,8,4,4,8,4,4,8,8,8,4,4,4,4,4,8,4,4,4,8,7,8,8,4,4,4,4,8,8,8,8,4,4,8,4,4,4,9,4,4,4,8,8,4,4,8,8,4,4,8,4,8,8,4,4,7,4,8,4,8,7,4,8,4,1]},"_id":"62bacfe6d17f7942a309c5bf","predictedLabel":"hiphop","videoID":"NUn3lj64oNw","__v":0,"success":false,"trueLabel":"reggae"},{"data":{"guess":[{"name":"hiphop","count":57},{"name":"rock","count":27},{"name":"disco","count":14},{"name":"pop","count":14},{"name":"reggae","count":13},{"name":"classical","count":2},{"name":"metal","count":2},{"name":"blues","count":1},{"name":"country","count":1}],"higherGuess":"hiphop","higherCount":57,"total":131,"message":"success","rawData":[9,9,9,9,9,9,6,3,3,3,8,8,3,4,4,8,3,3,3,4,3,4,8,8,4,4,4,4,8,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,9,9,9,9,9,9,9,4,4,4,8,4,4,9,4,8,4,3,3,4,0,4,4,4,4,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,1,1,9,9,3,3,9,4,4,2,8,4,9,9,4,9,9,9,9,9,9,9,9,7,7,8,7,4,8,7,7,7,7,8,7,3,7,7,7,7,7,7]},"_id":"62bacfa9d17f7942a309c5bb","predictedLabel":"hiphop","videoID":"QZXc39hT8t4","__v":0,"success":true,"trueLabel":"hiphop"},{"data":{"guess":[{"name":"hiphop","count":93},{"name":"pop","count":39},{"name":"classical","count":4},{"name":"metal","count":4},{"name":"reggae","count":4},{"name":"rock","count":4},{"name":"jazz","count":3},{"name":"blues","count":1},{"name":"country","count":1}],"higherGuess":"hiphop","higherCount":93,"total":153,"message":"success","rawData":[9,6,6,5,2,6,6,4,9,8,8,4,8,7,4,4,4,4,7,4,7,4,4,4,4,7,4,4,4,4,4,4,4,7,4,4,4,7,4,4,4,4,4,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,7,7,7,7,7,4,7,7,7,7,7,8,4,4,4,4,7,4,4,4,4,4,7,4,4,4,4,4,4,4,4,4,4,4,4,7,4,4,4,7,4,4,4,4,4,4,4,4,4,4,4,4,4,7,4,4,4,4,4,4,4,7,4,7,7,7,7,7,7,7,7,7,7,7,7,9,7,9,7,4,7,4,5,5,0,1,1,1,1]},"_id":"62bacf53d17f7942a309c5b7","predictedLabel":"hiphop","videoID":"i9ZykEJuFrI","__v":0,"success":true,"trueLabel":"hiphop"},{"data":{"guess":[{"name":"pop","count":85},{"name":"country","count":52},{"name":"rock","count":43},{"name":"disco","count":19},{"name":"reggae","count":5},{"name":"classical","count":4},{"name":"jazz","count":3},{"name":"blues","count":1},{"name":"hiphop","count":1},{"name":"metal","count":1}],"higherGuess":"pop","higherCount":85,"total":214,"message":"success","rawData":[1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,3,3,3,3,9,9,7,7,7,7,7,3,3,3,3,7,3,3,9,9,7,9,9,2,3,7,9,2,2,3,7,2,9,9,2,2,2,7,2,2,7,7,2,2,7,7,9,9,7,2,7,7,7,7,7,7,7,7,7,7,7,9,7,9,2,2,7,2,7,9,9,9,9,9,2,2,7,7,9,9,9,3,2,2,9,7,2,7,4,9,7,7,7,9,7,7,7,7,7,7,7,7,7,7,7,7,6,8,8,8,9,9,9,3,9,9,3,3,9,2,2,0,9,2,2,2,7,7,7,9,7,7,9,7,7,7,7,7,7,7,7,7,7,7,7,2,2,7,7,9,2,9,7,9,9,1,1,9,7,7,2,5,2,9,2,7,7,2,2,2,7,7,7,2,7,9,5,5,2,7,7,3,7,7,7,9,3,7,2,7,9,7,7,2,8,3,9]},"_id":"62bacefdd17f7942a309c5b3","predictedLabel":"pop","videoID":"RzEBEKMlGyA","__v":0,"success":true,"trueLabel":"pop"},{"data":{"guess":[{"name":"rock","count":70},{"name":"country","count":56},{"name":"classical","count":51},{"name":"pop","count":19},{"name":"jazz","count":18},{"name":"hiphop","count":7},{"name":"metal","count":7},{"name":"reggae","count":6},{"name":"disco","count":5},{"name":"blues","count":1}],"higherGuess":"rock","higherCount":70,"total":240,"message":"success","rawData":[1,1,7,1,8,9,1,7,8,7,9,7,2,4,2,3,1,9,7,1,7,1,1,7,4,1,7,2,9,5,2,1,1,1,2,1,2,1,2,2,2,2,2,2,5,2,2,2,7,8,7,1,7,2,6,6,5,2,2,2,9,9,9,2,7,2,2,9,9,2,1,1,1,5,5,1,1,1,2,5,8,7,2,7,2,9,7,2,2,5,2,2,9,6,2,9,9,2,2,2,2,2,9,9,2,2,5,5,5,5,9,9,9,1,9,9,9,1,2,9,9,9,9,9,5,4,4,8,4,8,2,2,5,2,4,7,7,2,0,9,9,9,2,1,9,7,9,9,3,9,3,2,9,9,2,2,9,9,4,2,9,2,2,2,6,6,9,9,9,9,9,9,2,9,9,9,9,9,9,2,9,9,9,9,9,9,9,9,9,9,9,9,1,1,9,9,9,1,2,7,9,9,3,9,6,3,2,5,1,5,5,5,9,6,1,1,1,5,1,1,2,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},"_id":"62baceb4d17f7942a309c5af","predictedLabel":"rock","videoID":"Gym95cmKR-g","__v":0,"success":true,"trueLabel":"rock"},{"data":{"guess":[{"name":"classical","count":44},{"name":"jazz","count":25},{"name":"country","count":10},{"name":"pop","count":9},{"name":"rock","count":3}],"higherGuess":"classical","higherCount":44,"total":91,"message":"success","rawData":[1,1,1,1,1,7,7,1,7,2,5,2,1,2,5,5,5,1,5,1,1,1,1,7,5,1,1,1,1,2,7,1,5,5,5,1,5,1,1,1,1,7,5,9,2,1,9,1,5,1,2,9,7,5,5,2,2,5,2,5,1,1,1,1,5,1,5,1,7,5,5,5,5,1,1,1,5,2,5,1,1,1,1,5,1,1,1,1,7,1,1]},"_id":"62bace79d17f7942a309c5ab","predictedLabel":"classical","videoID":"A3yCcXgbKrE","__v":0,"success":false,"trueLabel":"jazz"},{"data":{"guess":[{"name":"jazz","count":94},{"name":"classical","count":15},{"name":"rock","count":7},{"name":"country","count":3},{"name":"blues","count":1}],"higherGuess":"jazz","higherCount":94,"total":120,"message":"success","rawData":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,5,5,9,5,5,5,5,5,9,2,5,5,1,5,5,5,5,5,9,5,5,2,5,5,5,5,5,9,5,5,1,5,5,1,5,5,5,5,5,5,5,5,5,9,5,1,5,5,1,5,5,5,5,5,1,2,5,5,5,9,5,1,1,5,5,5,5,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,9,5,5,1,5,5,5,5,5,5,1,5,5,5,5,1]},"_id":"62bace3fd17f7942a309c59f","predictedLabel":"jazz","videoID":"TmIwm5RElRs","__v":0,"success":true,"trueLabel":"jazz"}]
        for(let i =0; i<allData.length; ++i){
            if(allData[i]._id === id){
                setData(allData[i]);
                return;
            }
        }
    }, [id])


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if(data && data.data.rawData.length === 0){
        return(
            <div id="predict">
                <div id="no-data-prediction">
                predicted <strong>&nbsp;{data.predictedLabel}</strong>, was <strong>&nbsp;{data.trueLabel}</strong> {data.success ? <CircleCheck/> : <CircleXMark/>}&nbsp;
                <a
                    tabIndex="0"
                    href={`https://www.youtube.com/watch?v=${data.videoID}`}
                    target='_blank'
                    rel="noreferrer"
                    title={`https://www.youtube.com/watch?v=${data.videoID}`}
                >
                    Listen on youtube
                </a>
                <br/>
                <br/>
                <div>Sorry, no more data to show for this song</div>
                </div>
                
            </div>
        )
    }

    if(data && data.data.rawData.length !== 0){
        return(
            <div id="predict">
                <div id="prediction">
                    {data.trueLabel && (
                        <div className="top">
                        predicted <strong>&nbsp;{data.predictedLabel}</strong>, was <strong>&nbsp;{data.trueLabel}&nbsp;</strong> {data.success ? <CircleCheck/> : <CircleXMark/>}&nbsp;<a
                            tabIndex="0"
                            href={`https://www.youtube.com/watch?v=${data.videoID}`}
                            target='_blank'
                            rel="noreferrer"
                            title={`https://www.youtube.com/watch?v=${data.videoID}`}
                        >
                        Listen on youtube
                    </a>
                        </div>
                    )}
                    {!data.trueLabel && (
                        <div className="top">
                        predicted <strong>&nbsp;{data.predictedLabel}</strong>, unknown true genre. <button onClick={toggleShowModal}>tag this music</button><a
                            tabIndex="0"
                            href={`https://www.youtube.com/watch?v=${data.videoID}`}
                            target='_blank'
                            rel="noreferrer"
                            title={`https://www.youtube.com/watch?v=${data.videoID}`}
                        >
                        Listen on youtube
                    </a>
                    <Modal 
                                isShowing={isModalShowing} 
                                toggleShow={toggleShowModal}
                                modalTitle="Help us improve"
                            >
                                <ImprovementModalBody 
                                    showAlert={()=>setShowToaster(true)} 
                                    guess={data.data.higherGuess} 
                                    toggleShow={toggleShowModal}
                                    id={data._id}
                                />
                                
                            </Modal>
                            <Toaster 
                                isShowing={showToaster}
                                message="Thanks for your feedbacks ❤️"
                                style={{backgroundColor:"#C3F3D7", border:"1px solid #2FD573"}}
                            />
                        </div>
                    )}
                    
                    <div className="top-left">
                        <ul>
                            {data.data.guess.map(function(genre, index){
                                return(
                                <li key={`genre-${index}`} className={`genre top-${index}`}>
                                    { capitalizeFirstLetter(genre.name)} {Math.round(10000*genre.count/data.data.total)/100}%
                                </li>
                                )
                            })}
                        </ul>
                        <div>
                            <img 
                                className="genre-icon"
                                src={`${process.env.PUBLIC_URL}/images/genres/${data.data.higherGuess}.svg`} 
                                alt={data.data.higherGuess}
                                title={data.data.higherGuess}
                            />
                            <div>{capitalizeFirstLetter(data.data.higherGuess)}</div>
                        </div>  
                    </div>
                    <div className="top-right">
                        <GenreRadarChart data={data.data}/>
                    </div>
                    <div className="bottom">
                        <Histogram rawData={data.data.rawData}/>
                    </div>
                </div>
            </div>
        )
    }

    else{
        return(<div>No data super sorry</div>)
    }
    
}