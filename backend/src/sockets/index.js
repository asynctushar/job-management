const jobSocket = require("./job.socket");

const initSockets = async (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 Client connected:", socket.id);

        // register job-related event handlers for this socket
        jobSocket(io, socket);

        socket.on("disconnect", (reason) => {
            console.log("🔴 Client disconnected:", socket.id, reason);
        });
    });
};

module.exports = { initSockets };
