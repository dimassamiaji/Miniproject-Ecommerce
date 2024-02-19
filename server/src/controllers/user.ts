/** @format */
import { Request, Response, NextFunction } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma, secretKey } from "..";
import { ReqUser } from "../middlewares/auth-middlewares";
import { sign } from "jsonwebtoken";
export const userController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!checkUser) throw Error("user not found");

      const checkPassword = await compare(password, checkUser.password);
      if (!checkPassword) throw Error("wrong password");

      const { firstName,lastName, role, id } = checkUser;

      //email,name,role
      const token = sign({ email, firstName, lastName, role }, String(process.env.secretKey), {
        expiresIn: "1hr",
      });

      res.send({
        message: "berhasil login",
        result: {
          id,
          email,
          firstName,
          lastName,
          role,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName } = req.body;

      const check = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (check?.id) throw Error("email sudah terdaftar");
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UserCreateInput = {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber: ""
      };

      await prisma.user.create({
        data: newUser,
      });

      res.status(201).send({
        message: "berhasil daftar",
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },
  async keepLogin(req: ReqUser, res: Response, next: NextFunction) {
    const token = await sign({ ...req.user }, String(secretKey), {
      expiresIn: "1hr",
    });
    res.send({
      message: "keep login",
      result: req.user,
      token,
    });
  },
};
