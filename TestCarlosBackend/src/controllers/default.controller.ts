import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

@route('/check')
export class DefaultController {
    @GET()
    async index(req: Request, res: Response) {
        res.send('Running');
    }
}