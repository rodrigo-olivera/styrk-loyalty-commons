import { NextFunction, Request, Response } from "express"

const logErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    next(err)
}

export default logErrors;