import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";
export const eventController = {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventName } = req.query;
      const events = await prisma.event.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        where: {
          eventName: {
            contains: String(eventName),
          },
        },
      });

      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },
  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await prisma.event.findUnique({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        where: {
          id: Number(req.params.id),
        },
      });

      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },
  async editEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventName, image_url, price, description, location, eventDate } =
        req.body;
      const editEvent: Prisma.EventUpdateInput = {
        eventName,
        price,
        description,
        location,
        eventDate: new Date(eventDate),
      };

      if (req.file?.filename)
        (editEvent.image_url = String(req.file?.filename)),
          console.log(req.file);

      await prisma.event.update({
        data: editEvent,
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.event.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
  async addEvent(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { eventName, description, price, location, eventDate } = req.body;
      console.log(req.body);

      const newEvent: Prisma.EventCreateInput = {
        eventName,
        image_url: String(req.file?.filename),
        price,
        description,
        location: location,
        eventDate: new Date(eventDate),
        user: {
          connect: {
            id: req.user?.id,
          },
        },
      };
      await prisma.event.create({
        data: newEvent,
      });
      res.send({
        success: true,
        message: "data berhasil ditambahkan",
      });
    } catch (error) {
      next(error);
    }
  },
};
