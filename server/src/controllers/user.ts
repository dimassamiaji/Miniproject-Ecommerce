import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from ".."; //accessing model
import { Prisma } from "@prisma/client"; // accessing interface/types

import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { mailer, transport } from "../lib/nodemailer";
import mustache, { render } from "mustache";
import fs from "fs";
type TUser = {
  email: string;
};

const template = fs
  .readFileSync(__dirname + "/../templates/verify.html")
  .toString();

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        gender,
        phoneNumber,
        referralCode,
      } = req.body;
      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UserCreateInput = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        gender,
        phoneNumber,
        referralCode,
      };

      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkUser?.id) throw Error("user sudah terdaftar");

      await prisma.user.create({
        data: newUser,
      });
      res.send({
        success: true,
        message: "berhasil register",
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;

      const user = await prisma.user.findUnique({
        where: {
          email: String(email),
        },
      });
      if (!user) throw Error("email/password salah");
      const checkPassword = await compare(String(password), user.password);
      const resUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        role: user.role,
      };
      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "5m",
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }
      // npm i jsonwebtoken @types/jsonwebtoken

      throw Error("email/password tidak sesuai");
    } catch (error) {
      next(error);
    }
  },
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;

      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);
      const userEditPassword: Prisma.UserUpdateInput = {
        password: hashedPassword,
      };
      await prisma.user.update({
        data: userEditPassword,
        where: {
          email: String(email),
        },
      });
      res.send({
        success: true,
        message: "berhasil merubah password",
      });
    } catch (error) {
      next(error);
    }
  },
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error("unauthorized");

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          gender: true,
          firstName: true,
          lastName: true,
          role: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error("unauthorized 2");

      const token = sign(checkUser, secretKey, {
        expiresIn: "1hr",
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, fullname } = req.query;

      const rendered = mustache.render(template, {
        email,
        fullname,
        verify_url: "",
      });

      mailer({
        to: String(email),
        subject: "verify account",
        text: "",
        html: rendered,
      });

      res.send({
        message: "email berhasil dikirim",
      });
    } catch (error) {
      next(error);
    }
  },
};
