const { addNewMessage } = require("../db");

module.exports = (io, socket) => {
  const createMessage = async (payload, cb) => {
    console.log(payload);
    let id = await addNewMessage(payload);
    io.sockets.in(payload.room).emit("message", { ...payload, id });
    cb?.(id);
  };

  socket.on("message:create", createMessage);
};
