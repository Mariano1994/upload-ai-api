import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVidoRoute } from "./routes/upload-video";


const app = fastify();

app.register(getAllPromptsRoute)
app.register(uploadVidoRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server Running on port 3333");
  });
