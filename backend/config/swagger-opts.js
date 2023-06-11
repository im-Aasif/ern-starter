const path = require("path");
const options = {
	failOnErrors: true,
	definition: {
		// swagger: "2.0",
		openapi: "3.0.0",
		info: {
			title: "Express API with Swagger",
			version: "0.1.0",
			description:
				"This is a simple CRUD API application made with Express and documented with Swagger",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "Asif Tamboli",
				email: "aasif.aeez@gmail.com",
			},
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./backend/routes/*.js"],
};
module.exports = options;
