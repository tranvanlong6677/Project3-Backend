import { checkSchema } from 'express-validator'
import httpStatus from '~/constants/httpStatus'
import { userMessage } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { validate } from '~/utils/validation'

export const dataCreateCarValidator = validate(
  checkSchema({
    license_plate: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: userMessage.LICENSE_PLATE_IS_REQUIRED,
              status: httpStatus.UNAUTHORIZED
            })
          }
          return true
        }
      }
    },
    company: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: userMessage.COMPANY_IS_REQUIRED,
              status: httpStatus.UNAUTHORIZED
            })
          }
          return true
        }
      }
    },
    price_per_day: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: userMessage.PRICE_PER_DAY_IS_REQUIRED,
              status: httpStatus.UNAUTHORIZED
            })
          }
          return true
        }
      }
    },
    deposit: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: userMessage.DEPOSIT_IS_REQUIRED,
              status: httpStatus.UNAUTHORIZED
            })
          }
          return true
        }
      }
    },
    type_car: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: userMessage.TYPE_CAR_IS_REQUIRED,
              status: httpStatus.UNAUTHORIZED
            })
          }
          return true
        }
      }
    }
    // image: {
    //   custom: {
    //     options: async (value, { req }) => {
    //       console.log('image', value)
    //       if (!value) {
    //         throw new ErrorWithStatus({
    //           message: userMessage.IMAGE_IS_REQUIRED,
    //           status: httpStatus.UNAUTHORIZED
    //         })
    //       }
    //       return true
    //     }
    //   }
    // }
  })
)
