"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDatabase = exports.closeDatabase = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
// Connect to in-memory database for testing
const connectDB = async () => {
    await mongoose_1.default.disconnect(); // Disconnect any existing connection
    const mongoUri = await mongoServer.getUri();
    return mongoose_1.default.connect(mongoUri);
};
exports.connectDB = connectDB;
// Close database connection and stop mongo server
const closeDatabase = async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
    await mongoServer.stop();
};
exports.closeDatabase = closeDatabase;
// Clear database collections
const clearDatabase = async () => {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
exports.clearDatabase = clearDatabase;
//# sourceMappingURL=testUtils.js.map