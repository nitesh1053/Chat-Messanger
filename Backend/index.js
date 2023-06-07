const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// const userRoute = require('./routes/user_router');
const authRoute = require('./routes/auth_router');
// const chatRoute = require('./routes/chat_router');
// const messageRoute = require('./routes/message_router');
// const path = require("path");
const { MissingParamError, ResourceNotFoundError, HttpStatusError } = require('./utils/error');


mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose Connection ERROR: ' + err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected!');
});

// app.use("/images", express.static(path.join(__dirname, "public/images")));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

function errorHandlerCustom(err, req, res, next) {
  console.log(`Error Handler Stack: ${err.stack}`);
  if (err instanceof MissingParamError) return res.status(400).send(`Missing Param: ${err.param}`);
  if (err instanceof ResourceNotFoundError) return res.status(404).send(`Resource Not Found: ${err.resource}`);
  if (err instanceof HttpStatusError) return res.status(err.statusCode).send(err.message);
  return res.status(500).send({reason: 'Internal Server Error. Please try again later'});
}

app.use(errorHandlerCustom);
app.use('/api/auth', authRoute);
// app.use('/api/user', userRoute);
// app.use('/api/chats', chatRoute);
// app.use('/api/messages', messageRoute);

const port = (process.env.PORT);
app.listen(port, () => {
  console.log(`Backend server is running at ${port}!`);
});


const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});


io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) { /* empty */ }
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
      users.push({userId, socketId});
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  // when ceonnect
  console.log('a user connected.');

  // take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // send and get message
  socket.on('sendMessage', ({senderId, receiverId, text}) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

