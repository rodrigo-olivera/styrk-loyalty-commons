import { Request, Response, NextFunction } from "express";
import { NO_RESPONSE_FOUND } from "../constants/errors.msg";

import sanitizeJson from "../utils/sanitizeJson";

const response = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = res?.locals?.response;
        if (!response) throw new Error(NO_RESPONSE_FOUND);

        const sanitizedResponse = Array.isArray(response) ? response?.map(obj => sanitizeJson(obj)) : sanitizeJson(response);

        res.status(200).send(sanitizedResponse);
    } catch (error) {
        next(error);
    }

    return next();
}

export default response;