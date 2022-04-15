const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 5000

app.use(express.json())

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function isValidLink(url){
    if(url.includes("watch?v=")){
        return true
    }
    return false
}   

app.get('/predict', (req, res) => {
    const url = req.query.url;
    if(!isValidLink(url)){
        res.json({"message": "This is not a valid youtube URL"})
        return
    }
    var result;
    const python = spawn('python', ['./python/predict.py', url]);
    python.stdout.on('data', function(data){
        rawString = data.toString();
    })

    python.on('close', function(code){
        console.log("predict close with code" + code);
        result = replaceAll(rawString, "'", '"')
        res.json(JSON.parse(result))
    })

   })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))