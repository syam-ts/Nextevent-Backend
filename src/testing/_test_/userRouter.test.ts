import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";  
import { User } from "../Schema/User";
import { app } from "../../app";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

it("should return 200 OK and empty array", async () => {
  const res = await request(app).get("/api/v1/users");
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});
