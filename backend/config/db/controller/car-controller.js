const boom = require("boom");
const Car = require("../schema/car");

exports.getCars = async (req, res) => {
	try {
		const cars = await Car.find();
		return cars;
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.getCarById = async (req, res) => {
	try {
		const id = req.id;
		const car = await Car.findById(id);
		return car;
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.saveCar = async (req, res) => {
	try {
		const car = new Car(req);
		const newCar = await car.save();
		return newCar;
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.updateCar = async (req, res) => {
	try {
		const id = req.id;
		const car = await Car.findByIdAndUpdate(id, req, { new: true });
		return car;
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.deleteCar = async (req, res) => {
	try {
		const id = req.id;
		const car = await Car.findByIdAndRemove(id);
		return car;
	} catch (err) {
		throw boom.boomify(err);
	}
};
