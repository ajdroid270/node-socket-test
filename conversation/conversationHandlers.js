module.exports = (io, socket) => {
  const joinConversation = (payload) => {
    console.log(`joined: ${payload}`);
    socket.join(payload);
  };

  const leaveConversation = (payload) => {
    console.log(`left: ${payload}`);
  };

  socket.on("conversation:join", joinConversation);
  socket.on("disconnect", leaveConversation);
};
