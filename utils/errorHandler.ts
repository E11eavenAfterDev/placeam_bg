import { ErrorWithStatus } from "../types"

export const errorHandler = (statusCode: number, message: string) => {
    const error = new Error() as ErrorWithStatus
    error.statusCode = statusCode
    error.message = message
    return error
}