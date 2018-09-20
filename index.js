const express = require("express");
const redis = require("redis");

const app = express();
const redisClient = redis.createClient({
  host: "redis-server",
  port: 6379
});

redisClient.set("visits", 0);

app.get("/", (req, res) => {
  redisClient.get("visits", (err, visit) => {
    res.send(`The number of visits is ${visit}`);
    redisClient.set("visits", parseInt(visit) + 1);
  });
});

app.listen(8081, () => console.log(`Listening to the port 8081`));
