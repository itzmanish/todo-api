const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("./config/db");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

//app.use((req, res, next) => {
//	res.header("Access-Control-Allow-Origin", "*");
//	res.header(
//		"Access-Control-Allow-Header",
//		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
//	);
//	if (req.method === "OPTIONS") {
//		res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");
//		return res.status(200).json({});
//	}
//	next();
//});

const indexRouter = require("./routes/home");
app.use("/", indexRouter);

app.listen(PORT, () => {
	console.log(`server is listning on http://localhost:${PORT}`);
});
