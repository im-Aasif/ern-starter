const express = require("express");
const { get } = require("../http/api-requests");
const router = express.Router();
const carController = require("../config/db/controller/car-controller");

/**
 * @swagger
 * components:
 *  schemas:
 *      Todo:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id
 *              description:
 *                  type: string
 *                  description: Task description
 *          example:
 *              id: diwe830d0k
 *              description: UI UX review task to be completed today
 */
router.get("/todos", async (req, res, next) => {
	try {
		const data = await get("https://jsonplaceholder.typicode.com/todos/1");
		res.json(data);
	} catch (err) {
		next(err);
	}
});

/**
 * @swagger
 * components:
 *  schemas:
 *      Car:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id
 *              title:
 *                  type: string
 *                  description: Name of the car
 *              brand:
 *                  type: string
 *                  description: Brand of the car
 *              price:
 *                  type: string
 *                  description: Price of the car
 *              age:
 *                  type: number
 *                  description: Car's total age
 *              services:
 *                  type: array
 *                  description: Services provided in the car
 *          example:
 *              id: diwe830d0k
 *              title: Audi R8 v10
 *              brand: Audi
 *              price: $140000
 *              age: 4
 *              services: ['sports', 'manual', 'vroom vroom']
 */
router.get("/cars", async (req, res, next) => {
	try {
		const data = await carController.getCars();
		res.json(data);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
