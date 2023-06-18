const graphql = require("graphql");

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

const carController = require("../db/controller/car-controller");
const ownerController = require("../db/controller/owner-controller");
const serviceController = require("../db/controller/service-controller");
const owner = require("../db/schema/owner");

const carType = new GraphQLObjectType({
	name: "Car",
	fields: () => ({
		_id: { type: GraphQLID },
		title: { type: GraphQLString },
		brand: { type: GraphQLString },
		price: { type: GraphQLString },
		age: { type: GraphQLInt },
		ownerId: { type: GraphQLID },
		owner: {
			type: ownerType,
			async resolve(parent, args) {
				return await ownerController.getOwnerById({ id: parent.ownerId });
			},
		},
		services: {
			type: new GraphQLList(serviceType),
			async resolve(parent, args) {
				return await serviceController.getCarsServices({ id: parent._id });
			},
		},
	}),
});

const ownerType = new GraphQLObjectType({
	name: "Owner",
	fields: () => ({
		_id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		cars: {
			type: new GraphQLList(carType),
			async resolve(parent, args) {
				return await ownerController.getOwnersCar({ id: parent._id });
			},
		},
	}),
});

const serviceType = new GraphQLObjectType({
	name: "Service",
	fields: () => ({
		_id: { type: GraphQLID },
		car_id: { type: GraphQLID },
		name: { type: GraphQLString },
		date: { type: GraphQLString },
		car: {
			type: carType,
			async resolve(parent, args) {
				return await carController.getCarById({ id: parent.carId });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		car: {
			type: carType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await carController.getCarById(args);
			},
		},
		cars: {
			type: new GraphQLList(carType),
			async resolve(parent, args) {
				return await carController.getCars();
			},
		},
		owner: {
			type: ownerType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await ownerController.getOwnerById(args);
			},
		},
		service: {
			type: serviceType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await serviceController.getServiceById(args);
			},
		},
	},
});

const Mutations = new GraphQLObjectType({
	name: "Mutations",
	fields: {
		addCar: {
			type: carType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				brand: { type: new GraphQLNonNull(GraphQLString) },
				price: { type: GraphQLString },
				age: { type: GraphQLInt },
				ownerId: { type: GraphQLID },
			},
			async resolve(parent, args) {
				const data = await carController.saveCar(args);
				return data;
			},
		},
		updateCar: {
			type: carType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				brand: { type: new GraphQLNonNull(GraphQLString) },
				price: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				ownerId: { type: GraphQLID },
			},
			async resolve(parent, args) {
				const data = await carController.updateCar(args);
				return data;
			},
		},
		deleteCar: {
			type: carType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				const data = await carController.deleteCar(args);
				return data;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations,
});
