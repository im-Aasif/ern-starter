const boom = require("boom");

const Owner = require("../schema/owner");
const Car = require("../schema/car");

exports.getOwners = async (req, res) => {
	try {
		const owners = await Owner.find();
		return owners;
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.getOwnerById = async (req, res) => {
	try {
		const id = req.id;
		const owners = await Owner.findById(id);
		return owners;
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.getOwnersCar = async (req, res) => {
	try {
		const id = req.id;
		const cars = await Car.find({ ownerId: id });
		return cars;
	} catch (err) {
		throw boom.boomify(err);
	}
};
