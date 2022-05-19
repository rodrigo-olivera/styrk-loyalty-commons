import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        const error = JSON.parse(err.message)
        const message = error?.message
        const status = error?.status

        console.log('error1', message, status, typeof error, error);

        res.status(status || 500);
        res.send(message);
    } catch (error) {
        console.log('error 2', error);
        res.status(500);
        res.send(err.message);
    }
}

export default errorHandler;