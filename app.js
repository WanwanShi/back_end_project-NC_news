const cors = require("cors");
const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
} = require("./errors/index");
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.get("*", (req, res, next) => {
	res.status(404).send({ msg: "Route does not exist" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
