import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, status } = JSON.parse(err.message)
        console.log('error1', message, status, JSON.parse(err.message));

        res.status(status || 500);
        res.send(message);
    } catch (error) {
        console.log('error 2', error);
        res.status(500);
        res.send(err.message);
    }
}

export default errorHandler;