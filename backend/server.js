const express = require('express');
const chats = require('./data/data');
const userRoutes = require('./routes/userRoutes');
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

// API Error Handlers => (add at end of all routes)
app.use(notFound); // handles requests for routes that do not exist
app.use(errorHandler);

app.listen(port, (err) => {
    if(err){
        console.log('error in running the server ', err);
        return;
    }

    console.log('Server is up and running on port', port);
})