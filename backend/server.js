const express = require('express');
const chats = require('./data/data');
// for setting environment variables
const dotenv = require('dotenv')
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
    res.send("API is running");
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    console.log(req.params.id);
    const singleChat = chats.find(c => c._id == req.params.id);
    res.send(singleChat);
});

app.listen(port, (err) => {
    if(err){
        console.log('error in running the server ', err);
        return;
    }

    console.log('Server is up and running on port', port);
})