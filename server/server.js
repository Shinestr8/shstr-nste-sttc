const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 5000
app.get('/', (req, res) => {
 
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python', ['./python/function.py', 1, 3]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.send(dataToSend)
 });
 
})

app.get('/predict', (req, res) => {
    console.log("predict...")
    var result;
    const python = spawn('python', ['./python/predict2.py']);
    python.stdout.on('data', function(data){
        console.log(data);
        result = data.toString();
    })

    python.on('close', function(code){
        // console.log(`closed with code ${code}`);
        console.log("predict close with data " + result);
        res.send(result);
    })

   })

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))