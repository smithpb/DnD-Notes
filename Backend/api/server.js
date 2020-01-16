const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const notesRouter = require("../routes/notes/notes-router.js");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/notes", notesRouter);

module.exports = server;
