import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import httpStatus from '~/constants/httpStatus'
import { userMessage } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import {
  ForgotPasswordRequestBody,
  LoginRequestBody,
  LogoutRequestBody,
  RegisterRequestBody,
  TokenPayload,
  VerifyEmailBody
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
  const user_id = user._id as ObjectId
  const result = await userServices.login(user_id.toString())
  return res.json({
    message: userMessage.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterRequestBody>,
  res: Response
) => {
  const result = await userServices.register(req.body)
  console.log('register', req.body)
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

export const emailVerifyController = async (
  req: Request<ParamsDictionary, any, VerifyEmailBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  console.log('req.decoded_email_verify_token', req.decoded_email_verify_token)
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: userMessage.USER_NOT_FOUND
    })
  }

  // đã verify thành công
  if (user.email_verify_token === '') {
    return res.json({
      message: userMessage.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const result = await userServices.verifyEmail(user_id)
  return res.json({
    message: userMessage.EMAIL_VERIFY_SUCCESS,
    result
  })
}

export const resendVerifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    throw new ErrorWithStatus({
      message: userMessage.USER_NOT_FOUND,
      status: httpStatus.UNAUTHORIZED
    })
  }
  if (user.verify === UserVerifyStatus.Verified) {
    throw new ErrorWithStatus({
      message: userMessage.USER_IS_VERIFIED,
      status: httpStatus.UNAUTHORIZED
    })
  }
  await userServices.resendVerifyEmail(user_id)
  return res.json({
    message: userMessage.RESEND_EMAIL_SUCCESS
    // status: httpStatus.ACCEPTED
  })
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User
  const user_id = user._id.toString()
  console.log('>>> check user id', user_id)
  const result = await userServices.forgotPassword(user_id)
  return res.json(result)
}