const boom = require("boom");

const Service = require("../schema/services");

exports.getServiceById = async (req, res) => {
	try {
		const id = req.id;
		const service = await Service.findById(id);
		return service;
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.getCarsServices = async (req, res) => {
	try {
		const id = req.id;
		const services = await Service.find({ carId: id });
		return services;
	} catch (err) {
		throw boom.boomify(err);
	}
};
