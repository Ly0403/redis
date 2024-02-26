import { createClient } from "redis";
import productSchema from "./models/product";
import express from "express";
import pubsubRoute from "./route/pubsub";
import client from "./config/redis";

const app = express();

app.use("/pubsub", pubsubRoute);

try {
  app.listen(process.env.PORT, () => {
    console.log(`The server is listening on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}



client
  .connect()
  .then(async () => {
    console.log("Redis connected");
    await client.set("aaa", "ccc");
    await client.hSet("obj:1", {
      name: "aaa",
      type: "bbb",
    });
    console.log(await client.hGetAll("obj:1"));
    console.log(await client.hGet("obj:1", "type"));

    // create index
    // await client.ft.create("idx:product", productSchema, {
    //   ON: "JSON",
    //   PREFIX: "product:",
    // });

    // add document
    const product = [
      { name: "nnn", quantity: 6 },
      { name: "aaa", quantity: 6 },
    ];
    await Promise.allSettled(
      product.map((v, i) => client.json.set(`product:${i}`, "$", v))
    );

    let result = await client.ft.search("idx:product", "*");
    console.log(result);
    result = await client.ft.search("idx:product", "@name:nnn");
    console.log(result);

    // pub sub subscriber
    client.subscribe("msg", (msg) => console.log(msg));
  })
  .catch((err) => console.log(err));
