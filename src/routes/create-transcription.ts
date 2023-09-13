import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (req) => {
    const parmasSchema = z.object({
      videoId: z.string().uuid(),
    });

    const { videoId } = parmasSchema.parse(req.params);

    const bodySchema = z.object({
      prompt: z.string()
    })

    const {prompt} = bodySchema.parse(req.body)

    return {
      videoId,
      prompt,
    }
  });
}
