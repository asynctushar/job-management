const jobSocket = require("./job.socket");

const initSockets = async (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 Client connected:", socket.id);

        // Register job-related socket events
        jobSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("🔴 Client disconnected:", socket.id);
        });
    });
};

module.exports = { initSockets };
