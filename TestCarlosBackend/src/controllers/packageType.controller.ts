import { Response } from 'express';
import { route, GET } from 'awilix-express';
import { PackageTypeService } from '../services/packageType.service';
import { BaseController } from '../common/controllers/base.controller';

@route('/packageTypes')
export default class PackageTypeController extends BaseController {
    constructor(private packageTypeService: PackageTypeService) {
        super();
    }

    @route('/list')
    @GET()
    async index(req: any, res: Response) {
        // capture data
        const { role }  = req.user;
        if (role === "admin") {
            try {
                const result = await this.packageTypeService.get();
                res.send({ code: 200, res: result });

            } catch (error) {
                this.handleException(error, res);
            }

        } else {
            // Return error
            res.status(200).json({ message: 'This user does not have permissions to list package types!' });
        }
    }
}