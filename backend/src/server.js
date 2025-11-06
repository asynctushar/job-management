const http = require("http");
const socketIo = require("socket.io");
const createApp = require("./app");
const { initSockets } = require("./sockets");

(async () => {
    try {
        const server = http.createServer();

        const io = socketIo(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "DELETE"],
            },
        });

        const app = createApp(io);
        server.on("request", app);

        // Initialize socket modules
        await initSockets(io);

        const PORT = process.env.PORT || 4000;
        server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
    }
})();
