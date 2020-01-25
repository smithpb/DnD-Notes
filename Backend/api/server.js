const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const notesRouter = require("../routes/notes/notes-router.js");
const kingdomsRouter = require("../routes/kingdoms/kingdom-router.js");
const npcRouter = require("../routes/npcs/npc-router.js");
const locationsRouter = require("../routes/locations/location-router.js");
const authRouter = require("../routes/auth/auth-router.js");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/notes", notesRouter);
server.use("/api/kingdoms", kingdomsRouter);
server.use("/api/npcs", npcRouter);
server.use("/api/locations", locationsRouter);
server.use("/api/auth", authRouter);

module.exports = server;
