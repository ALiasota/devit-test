import { Request, Response, NextFunction } from 'express'

const asyncWrapper = (controller: Function) => (req: Request, res: Response, next: NextFunction) => {
  controller(req)
    .then((data: any) => res.json(data))
    .catch(next)
}

export default asyncWrapper
