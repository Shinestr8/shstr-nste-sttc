const mongoose = require('mongoose');

const collectionName = 'feedback';

const feedbackSchema = new mongoose.Schema({
    predictedLabel:{
        type: String,
        required: true
    },
    trueLabel: {
        type: String,
        required: true
    },
    videoID:{
        type:String,
        required: true
    },
    success:{   
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model(collectionName, feedbackSchema);