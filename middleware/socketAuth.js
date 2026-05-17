export default (socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("Unauthorized connection attempt"));
    }
    socket.username = username;
    next();
};