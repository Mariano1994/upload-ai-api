import { fastify } from "fastify";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAICompletionRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVidoRoute } from "./routes/upload-video";
import { fastifyCors } from "@fastify/cors";


const app = fastify();

app.register(fastifyCors, {
  origin: '*'
})

app.register(getAllPromptsRoute)
app.register(uploadVidoRoute)
app.register(createTranscriptionRoute)
app.register(generateAICompletionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server Running on port 3333");
  });
