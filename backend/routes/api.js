const express = require("express");
const { get } = require("../http/api-requests");
const router = express.Router();

router.get("/todos", async (req, res, next) => {
	try {
		const data = await get("https://jsonplaceholder.typicode.com/todos/1");
		res.json(data);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
