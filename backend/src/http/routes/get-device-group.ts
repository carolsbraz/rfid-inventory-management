import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getDeviceGroup(app: FastifyInstance) {
  app.get("/devices/:deviceGroupId", async (request, reply) => {
    const getDeviceGroupParams = z.object({
      deviceGroupId: z.string().uuid(),
    });

    const { deviceGroupId } = getDeviceGroupParams.parse(request.params);

    const deviceGroup = await prisma.deviceGroup.findUnique({
      where: {
        id: deviceGroupId,
      },
      include: {
        Device: {
          select: {
            id: true,
            serialNumber: true,
          },
        },
      },
    });

    if (!deviceGroup) {
      return reply.status(404).send({ message: "Device group not found" });
    }

    return reply.send({
      deviceGroup: {
        id: deviceGroup.id,
        title: deviceGroup.title,
        devices: deviceGroup.Device.map((device) => {
          return {
            id: device.id,
            serialNumber: device.serialNumber,
          };
        }),
      },
    });
  });
}
