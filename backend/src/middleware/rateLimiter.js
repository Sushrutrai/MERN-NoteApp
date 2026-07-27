import rateLimit from "../config/upstash/upstash.js";

const user = "my-limit-key"; //This is the user id or any other data to uniquely identiy a individual to limit per individual=>Raju
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit(user);
    if (!success)
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;