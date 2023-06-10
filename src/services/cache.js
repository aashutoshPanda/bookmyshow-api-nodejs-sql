import redis from "redis";

let redisClient;

(async () => {
  redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  });

  redisClient.on("error", (error) => console.error(`REDIS CONN Error : ${error}`));

  await redisClient.connect();
})();

// Get a value from Redis
export const getValueCache = async (key) => {
  try {
    const value = await redisClient.get(key);
    console.log("Got value from Redis for ", key);
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error getting value for key ${key}: ${error}`);
    return null;
  }
};

// Set a value in Redis
export const setValueCache = async (key, value, timeoutSeconds = process.env.REDIS_DEFAULT_TIMEOUT_SECONDS) => {
  try {
    // console.log(key, value, timeoutSeconds);
    await redisClient.set(key, JSON.stringify(value), "EX", timeoutSeconds);
    console.log("Set value from Redis for ", key);
  } catch (error) {
    console.error(`Error setting value for key ${key}: ${error}`);
  }
};
