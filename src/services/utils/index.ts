import httpErrors from 'http-errors'
import { CustomError } from '../../utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const errorHandling = (e: any, message?: string): never => {
    console.error(e)

    if (e instanceof CustomError) throw e

    throw new CustomError(message ?? e.message, [message ?? e.message])
}

export * from './messages'
