import { JwtPayload } from 'jsonwebtoken'

export interface RegisterRequestBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
  phone_number: string
}
export interface LoginRequestBody {
  email: string
  password: string
}

export interface VerifyEmailBody {
  email_verify_token: string
}

export interface LogoutRequestBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  token_type: string
  user_id: string
}

export interface ForgotPasswordRequestBody {
  email: string
}

export interface UserInfoRequestBody {
  address: {
    provinceCode: string
    districtCode: string
    wardCode: string
  }
  name: string
}
export interface RefreshTokenReqBody {
  refresh_token: string
}
