import { Response, Request, Router } from 'express'

import { response } from '../../network/response'

const Home = Router()

//Home path
Home.route('').get((req: Request, res: Response) => {
    response({
        error: false,
        message: 'Welcome to free company Backend!',
        res,
        status: 200
    })
})

export { Home }
