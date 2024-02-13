import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createDeviceGroup(app: FastifyInstance) {
  app.post("/devices", async (request, reply) => {
    const createDeviceBody = z.object({
      title: z.string(),
      devices: z.array(z.string()),
    });

    const { title, devices } = createDeviceBody.parse(request.body);

    const deviceGroup = await prisma.deviceGroup.create({
      data: {
        title,
      },
    });

    const createdDevices = await prisma.device.createMany({
      data: devices.map((device) => {
        return {
          serialNumber: device,
          deviceGroupId: deviceGroup.id,
        };
      }),
    });

    return reply
      .status(201)
      .send({ deviceGroupID: deviceGroup.id, createdDevices });
  });
}
