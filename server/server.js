const express = require('express');
const app = express();
const db = require('./models')
const cors = require('cors');


const PORT = process.env.PORT || 3000;

//allowing cors
app.use(cors());

//Routers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
app.use('/posts', postRouter)

const userRouter = require('./routes/user');
app.use('/user', userRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`APP is running on port ${PORT}`));
})
