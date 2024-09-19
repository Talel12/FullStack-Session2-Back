const express = require('express');
const cors = require('cors');
const connectDB = require('./config/DB')
const postRoute = require('./routes/Post.route')
const storyRoute = require('./routes/Story.route')
const authRoute = require('./routes/Auth.route')


const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/posts',postRoute)
app.use('/api/story',storyRoute)
app.use('/api/auth',authRoute)

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
  