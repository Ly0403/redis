import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({ url: process.env.REDISURL });

export const publisher = createClient({ url: process.env.REDISURL });

export default redisClient;