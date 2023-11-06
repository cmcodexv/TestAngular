import { Response } from 'express';
import { route, GET } from 'awilix-express';
import { UserService } from '../services/user.service';
import { BaseController } from '../common/controllers/base.controller';

@route('/user')
export default class UserController extends BaseController {
    constructor(private userService: UserService) {
        super();
    }

    @route('/list')
    @GET()
    async index(req: any, res: Response) {
        // capture data
        const { role }  = req.user;
        if (role === "admin") {
            try {
                const result = await this.userService.get();
                res.send({ code: 200, res: result });

            } catch (error) {
                this.handleException(error, res);
            }

        } else {
            // Return error
            res.status(200).json({ message: 'This user does not have permissions to list users!' });
        }
    }
}