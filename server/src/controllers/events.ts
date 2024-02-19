/** @format */
import { Request, Response, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middlewares";
export const eventController = {
  async create(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const newData: Prisma.EventCreateInput = {
        title,
        description,
        user: {
          connect: {
            id: req.user?.id,
          },
        },
      };

      await prisma.event.create({
        data: newData,
      });

      res.status(201).send({
        message: "data berhasil dibuat",
      });
    } catch (error) {
      next(error);
    }
  },
  async read(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const events = await prisma.event.findMany({
        where: {
          userId: String(req.user?.id),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      res.send({
        message: "fetch event list",
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },
  async update(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.event.update({
        data: req.body,
        where: {
          id,
        },
      });

      res.send({
        message: "data berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.event.delete({
        where: {
          id,
        },
      });

      res.send({
        message: "data berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};
