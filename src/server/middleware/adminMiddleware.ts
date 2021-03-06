import { Request, Response, NextFunction } from 'express'

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}
