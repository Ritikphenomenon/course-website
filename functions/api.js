const approuter = require("../src/api")
const serverless = require("serverless-http")
const express = require('express');
const cors = require('cors');

const app = express()

// const router = express.Router()
app.use(express.json());
app.use(cors());





app.use(`/api/`, approuter);

module.exports.handler = serverless(app)