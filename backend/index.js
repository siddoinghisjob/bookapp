const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require('path');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(
	cors({
		origin: process.env.origin,
		credentials: true,
	})
);
app.options('*', cors())

app.use(express.json());
app.use(cookieParser());

const router = require("./routes.js");

app.use("/", router);

app.listen(1000, () => console.log("listening to 1000.."));