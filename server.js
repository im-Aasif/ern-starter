const express = require("express");
const routes = require("./backend/routes/api");
const app = express();
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./backend/config/swagger-opts");
const { createHandler } = require("graphql-http/lib/use/express");
const expressPlayground =
	require("graphql-playground-middleware-express").default;
const schema = require("./backend/config/graphql");
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(bodyParser.json());
const specs = swaggerJsDoc(options);
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true })
);

app.use("/graphql", createHandler({ schema }));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.use("/api", routes);
app.use((err, req, res, next) => {
	console.log(err);
	next();
});

const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/cars_db")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
