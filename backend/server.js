const express = require('express');
const chats = require('./data/data');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandlingMiddleware');
// for setting environment variables
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());  // parsing JSON data from the request body

app.get('/', (req, res) => {
    res.send("API is running");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/messages', messageRoutes);

// API Error Handlers => (add at end of all routes)
app.use(notFound); // handles requests for routes that do not exist
app.use(errorHandler);

const server = app.listen(port, (err) => {
    if(err){
        console.log('error in running the server ', err);
        return;
    }

    console.log('Server is up and running on port', port);
});

// FOR SOCKET IO CONFIGURATION
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);  // created a room for particular user
        socket.emit('connected');
    });
});