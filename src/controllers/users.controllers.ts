import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { userMessage } from '~/constants/messages'
import {
  ForgotPasswordRequestBody,
  LoginRequestBody,
  LogoutRequestBody,
  RegisterRequestBody,
  UserInfoRequestBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userServices from '~/services/users.services'
import { UserVerifyStatus } from '~/utils/enums'
export const loginController = async (
  req: Request<ParamsDictionary, any, LoginRequestBody>,
  res: Response
) => {
  const user = req.user as User
  const userClone = {
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    _id: user._id,
    date_of_birth: user.date_of_birth
  }
  const user_id = user._id as ObjectId
  const result = await userServices.login(user_id.toString())
  return res.json({
    message: userMessage.LOGIN_SUCCESS,
    result,
    user: userClone
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterRequestBody>,
  res: Response
) => {
  console.log(req.body)
  const result = await userServices.register(req.body)
  return res.json({
    message: userMessage.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutRequestBody>,
  res: Response
) => {
  const { refresh_token }: any = req.body
  const result = await userServices.logout(refresh_token)
  return res.json(result)
}

// export const emailVerifyController = async (
//   req: Request<ParamsDictionary, any, VerifyEmailBody>,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { user_id } = req.decoded_email_verify_token as TokenPayload
//   const user = await databaseService.users.findOne({
//     _id: new ObjectId(user_id)
//   })
//   if (!user) {
//     return res.status(httpStatus.NOT_FOUND).json({
//       message: userMessage.USER_NOT_FOUND
//     })
//   }

//   // đã verify thành công
//   if (user.email_verify_token === '') {
//     return res.json({
//       message: userMessage.EMAIL_ALREADY_VERIFIED_BEFORE
//     })
//   }
//   const result = await userServices.verifyEmail(user_id)
//   return res.json({
//     message: userMessage.EMAIL_VERIFY_SUCCESS,
//     result
//   })
// }

// export const resendVerifyEmailController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { user_id } = req.decoded_authorization as TokenPayload
//   const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
//   if (!user) {
//     throw new ErrorWithStatus({
//       message: userMessage.USER_NOT_FOUND,
//       status: httpStatus.UNAUTHORIZED
//     })
//   }
//   if (user.verify === UserVerifyStatus.Verified) {
//     throw new ErrorWithStatus({
//       message: userMessage.USER_IS_VERIFIED,
//       status: httpStatus.UNAUTHORIZED
//     })
//   }
//   await userServices.resendVerifyEmail(user_id)
//   return res.json({
//     message: userMessage.RESEND_EMAIL_SUCCESS
//     // status: httpStatus.ACCEPTED
//   })
// }

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User
  const user_id = user._id.toString()
  const result = await userServices.forgotPassword(user_id)
  return res.json(result)
}

export const updateUserInfoController = async (
  req: Request<ParamsDictionary, any, UserInfoRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User
  console.log('>>> check user', user)

  const user_id = user._id.toString()
  // const data_update = req.data_update as UserInfoRequestBody
  const data_update = {
    email: req.body.email,
    address: req.body.address,
    name: req.body.name
  }

  const result = await userServices.updateUserInfo(user_id, data_update)
  return res.json(result)
}
