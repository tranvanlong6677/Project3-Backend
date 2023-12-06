import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { userMessage } from '~/constants/messages'
import {
  ForgotPasswordRequestBody,
  LoginRequestBody,
  LogoutRequestBody,
  RefreshTokenReqBody,
  RegisterRequestBody,
  TokenPayload,
  UserInfoRequestBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import userServices from '~/services/users.services'
export const loginController = async (
  req: Request<ParamsDictionary, any, LoginRequestBody>,
  res: Response
) => {
  const user = req.user as User
  console.log('user login', user)
  const userClone = {
    email: user.email,
    name: user.name,
    _id: user._id,
    date_of_birth: user.date_of_birth,
    phone_number: user.phone_number
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

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  console.log(1)
  const { user_id, verify } = req.decoded_refresh_token as TokenPayload
  const result = await userServices.refreshToken({ user_id, verify, refresh_token })
  return res.json({
    message: userMessage.REFRESH_TOKEN_SUCCESS,
    result
  })
}

export const updateUserInfoController = async (
  req: Request<ParamsDictionary, any, UserInfoRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User

  const user_id = user._id.toString()
  // const data_update = req.data_update as UserInfoRequestBody
  const data_update = {
    address: req.body.address
  }
  console.log('data_update', data_update)
  const result = await userServices.updateUserInfo(user_id, data_update)
  return res.json(result)
}
