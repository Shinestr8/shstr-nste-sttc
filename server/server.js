const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 5000

app.use(express.json())

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

app.get('/predict', (req, res) => {
    const url = req.query.url;
    var result;
    const python = spawn('python', ['./python/predict.py', url]);
    python.stdout.on('data', function(data){
        console.log(data.toString());
        rawString = data.toString();
    })

    python.on('close', function(code){
        // console.log(`closed with code ${code}`);
        console.log("predict close with code" + code);
        result = replaceAll(rawString, "'", '"')
        res.json(JSON.parse(result))
    })

   })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))