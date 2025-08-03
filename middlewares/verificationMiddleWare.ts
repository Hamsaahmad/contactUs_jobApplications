import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express'

const validationMiddleware = function (req : Request, res : Response, next : NextFunction) {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() }); 
  }
  next(); 
};

export default validationMiddleware;