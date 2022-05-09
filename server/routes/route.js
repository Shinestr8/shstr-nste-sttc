const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    console.log("someone wants all feedbacks");
    res.status(200);
})

router.post('/', function(req, res){
    console.log(req.body);
    console.log("Someone wants to send a feedback")
    res.status(200).json(req.body);
})

module.exports = router;
