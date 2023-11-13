import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  updateUserInfoController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  userInfoValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouters = Router()

/**
 * Login
 * Path: /login
 * Method :Post
 * Body: { email:string, password:string}
 */
userRouters.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Register a new user
 * Path: /register
 * Method :Post
 * Body: {name:string, email:string, password:string, confirm_password:string, date_of_birth:Date}
 */
userRouters.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Logout
 * Path: /logout
 * Method :Post
 * Header: {Authorization: Bearer <access_token>}
 * Body: {refresh_token:string}
 */
userRouters.post('/logout', refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Verify email when user click on the link in email
 * Path: /verify-email
 * Method :Post
 * Body: {email_verify_token:string}
 */
// userRouters.post(
//   '/verify-email',
//   emailVerifyTokenValidator,
//   wrapRequestHandler(emailVerifyController)
// )

/**
 * Resend verify email
 * Path: /resend-verify-email
 * Method :Post
 * Header:{Authorization : Bearer <access_token>}
 * Body: {}
 */
// userRouters.post(
//   '/resend-verify-email',
//   accessTokenValidator,
//   wrapRequestHandler(resendVerifyEmailController)
// )

/**
 * Forgot password
 * Path: /forgot-password
 * Method :Post
 * Body: {email:string}
 */
// userRouters.post(
//   '/forgot-password',
//   forgotPasswordValidator,
//   wrapRequestHandler(forgotPasswordController)
// )

userRouters.put(
  '/update',
  accessTokenValidator,
  userInfoValidator,
  wrapRequestHandler(updateUserInfoController)
)

// userRouters.post('/upload-image', wrapRequestHandler(uploadImageController))

export default userRouters
