// import external dependencies

const mongoose = require("mongoose");
const boom = require("boom");
const faker = require("faker");

// Fake data
const cars = [
	{
		name: "Tesla",
		models: ["S", "E", "X", "Y"],
	},
	{
		name: "Mercedes",
		models: ["GLA", "GLC", "GLE", "GLS"],
	},
	{
		name: "BMW",
		models: ["X4", "Z3", "M2", "7"],
	},
	{
		name: "Audi",
		models: ["A1", "A3", "A4", "A5"],
	},
	{
		name: "Ford",
		models: ["Fiesta", "Focus", "Fusion", "Mustang"],
	},
];
const serviceGarages = [
	"A++ Auto Services",
	"Gary's Garage",
	"Super Service",
	"iGarage",
	"Best Service",
];

const Car = require("./db/schema/car");
const Owner = require("./db/schema/owner");
const Service = require("./db/schema/services");

const generateOwnerData = () => {
	let ownerData = [];
	let i = 0;
	while (i < 10) {
		const firstName = faker.fake("{{name.firstName}}");
		const lastName = faker.fake("{{name.lastName}}");
		const email = faker.fake(
			`${firstName.toLowerCase()}.${lastName.toLowerCase()}@mail.com`
		);
		const owner = {
			firstName,
			lastName,
			email,
		};
		ownerData.push(owner);
		i++;
	}
	return ownerData;
};

const generateCarData = (ownersIds) => {
	let carData = [];
	let i = 0;

	while (i < 10) {
		const ownerId = faker.random.arrayElement(ownersIds);
		const carObject = faker.random.arrayElement(cars);
		const title = faker.random.arrayElement(carObject.models);
		const price = faker.random.number({ min: 5000, max: 30000 });
		const age = faker.random.number({ min: 2, max: 10 });

		const car = {
			ownerId,
			brand: carObject.name,
			title,
			price,
			age,
		};

		carData.push(car);
		i++;
	}

	return carData;
};

const generateServiceData = (carsIds) => {
	let serviceData = [];
	let i = 0;

	while (i < 10) {
		const carId = faker.random.arrayElement(carsIds);
		const name = faker.random.arrayElement(serviceGarages);
		const date = faker.fake("{{date.past}}");

		const service = {
			carId,
			name,
			date,
		};

		serviceData.push(service);
		i++;
	}

	return serviceData;
};
mongoose
	.connect("mongodb://localhost:27017/cars_db")
	.then(() => {
		console.log("mongodb connected!");
		(async () => {
			try {
				const owners = await Owner.insertMany(generateOwnerData());
				const ownerIds = owners.map((x) => x._id);

				const cars = await Car.insertMany(generateCarData(ownerIds));
				const carIds = cars.map((x) => x._id);

				const services = await Service.insertMany(generateServiceData(carIds));
				console.log(`
                Data successfully added:
                - ${owners.length} owners added
                - ${cars.length} cars added
                - ${services.length} services added`);
			} catch (err) {
				throw boom.boomify(err);
			}
			process.exit();
		})();
	})
	.catch((err) => {
		throw boom.boomify(err);
		process.exit();
	});
