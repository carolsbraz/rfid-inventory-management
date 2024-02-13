import fastify from "fastify";
import { register } from "module";
import { createDeviceGroup } from "./routes/create-device-group";
import { getDeviceGroup } from "./routes/get-device-group";

const app = fastify();

app.register(createDeviceGroup);
app.register(getDeviceGroup);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
