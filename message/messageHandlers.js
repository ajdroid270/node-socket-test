const { v4: uuidv4 } = require("uuid");
module.exports = (io, socket) => {
  const createMessage = (payload, cb) => {
    console.log(payload);
    let id = uuidv4();
    io.sockets.in(payload.room).emit("message", { ...payload, id });
    cb?.(id);
  };

  socket.on("message:create", createMessage);
};
