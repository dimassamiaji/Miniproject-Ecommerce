// import { Response, Request, NextFunction } from "express";
// import { prisma } from "..";
// import { $Enums, Prisma } from "@prisma/client";
// import { ReqUser } from "../middlewares/auth-middleware";
// export const transactionController = {
//   async getTransaction(req: Request, res: Response, next: NextFunction) {
//     try {
//       const transactions = await prisma.transaction.findMany();
//       return res.send({
//         success: true,
//         result: transactions,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   async addTransaction(req: ReqUser, res: Response, next: NextFunction) {
//     try {
//       const { eventId, point, coupon_id, availability } = req.body;
//       let { price } = req.body;
//       const checkUser = await prisma.transaction.findMany({
//         where: {
//           user: {
//             id: req.user?.id,
//           },
//           event: {
//             id: eventId,
//           },
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// };
