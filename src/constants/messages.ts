export const userMessage = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXIST: 'Email already exists',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_IS_REQUIRED: 'Email is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be between 6 and 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter,1 uppercase,1 number and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50:
    'Confirm password length must be between 6 and 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter,1 uppercase,1 number and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_STRING: 'Confirm password must be string',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD:
    'Confirm password must be the same as password',
  DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO 8601',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_STRING: 'Refresh token is string',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  REFRESH_TOKEN_IS_USED_OR_NOT_EXIST: 'Refresh token is used or not exist',
  LOGOUT_SUCCESS: 'Logout successfully',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_VERIFY_TOKEN_IS_STRING: 'Email verify token is string',
  USER_NOT_FOUND: 'User not found',
  USER_IS_VERIFIED: 'User is verified',
  RESEND_EMAIL_SUCCESS: 'Resend email is successfully',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verified successfully',
  CHECK_FORGOT_PASSWORD_SUCCESS: 'Check forgot password success',
  UPDATE_USER_INFO_SUCCESS: 'Update user info successfully',
  CREATE_A_CAR_SUCCESS: 'Create a car successfully',
  LICENSE_PLATE_IS_REQUIRED: 'License plate is required',
  IMAGE_IS_REQUIRED: 'Image is required',
  TYPE_CAR_IS_REQUIRED: 'Type of car is required',
  DEPOSIT_IS_REQUIRED: 'Deposit is required',
  PRICE_PER_DAY_IS_REQUIRED: 'Price per day is required',
  COMPANY_IS_REQUIRED: 'Company is required',
  GET_ALL_CAR_SUCCESS:'Get all cars successfully'
} as const
