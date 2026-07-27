import pkg from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const { Ratelimit } = pkg;
import dotenv from "dotenv";

dotenv.config();
//creating a ratelimiter that allows 100 requests per 60 seconds
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default rateLimit;