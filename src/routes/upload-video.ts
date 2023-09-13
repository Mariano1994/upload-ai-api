import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import path from "node:path";
import fs from 'node:fs'
import {pipeline} from 'node:stream'
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";
import { prisma } from "../lib/prisma";


const pump = promisify(pipeline)

export async function uploadVidoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1048576 * 25, // igual a 25mb
    },
  });

  
  app.post("/videos", async (request, reply) => {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ error: "Missing file input." });
    }

    const extention = path.extname(data.filename);

    if (extention !== ".mp3") {
      return reply
        .status(400)
        .send({ error: "Invalid file extension, plase upload a MP3 file." });
    }

    const fileBaseName = path.basename(data.filename, extention);

    const fileUploadName = `${fileBaseName}-${randomUUID()}${extention}`;

    const uploadDestination = path.resolve(
      __dirname,
      "../../temp",
      fileUploadName
    );

    await pump(data.file, fs.createWriteStream(uploadDestination))

      return reply.send()

  });
}
