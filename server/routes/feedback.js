const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback')


router.get('/:id', async function(req, res){
    try{
        const feedback = await Feedback.findById(req.params.id)
        res.status(200).json(feedback)
    } catch(error){
        res.status(500).json(error)
    }
    
})

router.get('/',  async (req, res) =>{
    console.log("find all")
    try {
        const feedbacks = await Feedback.find().sort({ _id: -1 }).skip(req.query.page*req.query.batchSize).limit(req.query.batchSize);
        res.status(200).json(feedbacks)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', function(req, res){
    try {
        const {data, predictedLabel, trueLabel, success, videoID} = req.body;
        const newFeedback = new Feedback({data: data, predictedLabel:predictedLabel, trueLabel: trueLabel, videoID: videoID, success: success})
        newFeedback.save(function(err){
            if(err) {
                console.log(err);
                res.status(500).send("An error occured while saving this feedback");
            }
        })
        res.status(200);
    } catch (error) {
        res.status(500)
    }
    
})

module.exports = router;
