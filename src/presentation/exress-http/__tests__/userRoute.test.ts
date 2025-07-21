import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../../app";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

afterEach(async () => {
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
  const db = mongoose.connection.db; 
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
}

});

describe("User Route", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toBe(200);
  });
});
