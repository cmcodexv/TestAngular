import { Request, Response } from 'express';
import { route, POST } from 'awilix-express';
import { IdentityService } from '../services/identity.service';
import { BaseController } from '../common/controllers/base.controller';
import jwt from 'jsonwebtoken';

@route('/identity')
export default class IdentityController extends BaseController {
    constructor(private identityService: IdentityService) {
        super();
    }

    @route('/authenticate')
    @POST()
    async index(req: Request, res: Response) {
        try {

            const result = await this.identityService.authenticate(
                req.body.email, req.body.password
            );
            
            if (result[0]) {
                if (process.env.jwt_secret_key) {
                    const secretKey: string = process.env.jwt_secret_key;

                    const jwttoken = jwt.sign({
                        id: result[0].id,
                        name: result[0].name,
                        surname: result[0].surname,
                        email: result[0].email,
                        role: result[0].role
                    }, secretKey, { expiresIn: '7h', algorithm: 'HS256' });

                    res.send({
                        code: 200,
                        token: jwttoken,
                        identity: {
                            name: result[0].name,
                            surname: result[0].surname
                        }
                    });
                } else {
                    throw new Error('Secret key is not defined!');
                }
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }
}