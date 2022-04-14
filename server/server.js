const express = require('express')
const {fork, spawn} = require('child_process');
const app = express()
const port = 5000

app.use(express.json())

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

app.get('/', (req, res) => {
 
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python', ['./python/function.py', 1, 3]);
 python.stderr.pipe(process.stderr);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 console.log(dataToSend)
 result = replaceAll(dataToSend, "'", '"')
 res.json(JSON.parse(result))
 });
 
})

app.get('/predict', (req, res) => {
    const url = req.query.url;
    console.log(url)
    // res.json(url)
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

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))