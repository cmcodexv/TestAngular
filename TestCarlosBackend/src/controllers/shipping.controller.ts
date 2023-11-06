import { Response } from 'express';
import { route, POST, GET, DELETE } from 'awilix-express';
import { ShippingCreateDto } from "../dtos/shipping.dto";
import { ShippingService } from '../services/shipping.service';
import { BaseController } from '../common/controllers/base.controller';

@route('/shipping')
export default class ShippingController extends BaseController {
    constructor(private shippingService: ShippingService) {
        super();
    }

    @route('/list')
    @GET()
    async index(req: any, res: Response) {
        // capture data
        const { role } = req.user;
        if (role === "admin") {
            try {
                const result = await this.shippingService.get();
                res.send({ code: 200, res: result });

            } catch (error) {
                this.handleException(error, res);
            }

        } else {
            // Return error
            res.status(200).json({ message: 'This user does not have permissions to list shippings!' });
        }
    }

    @route('/create')
    @POST()
    public async store(req: any, res: Response) {
        // capture data
        const { role } = req.user;
        if (role === "admin") {
            try {
                await this.shippingService.store({
                    address: req.body.address,
                    zip_code: req.body.zip_code,
                    remitent: req.body.remitent,
                    addressee: req.body.addressee,
                    weight: req.body.weight,
                    created_by: req.user.id

                } as ShippingCreateDto);

                res.send({ code: 200, res: "shipping created!" });

            } catch (error) {
                this.handleException(error, res);
            }

        } else {
            // Return error
            res.status(200).json({ message: 'This user does not have permissions to create shippings!' });
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req: any, res: Response) {
        // capture data
        const { role } = req.user;
        if (role === "admin") {
            try {
                const id = parseInt(req.params.id);

                const idUser = parseInt(req.user.id);

                await this.shippingService.remove(id, idUser);

                res.send({ code: 200, res: "shipping removed!" });
            }
            catch (error) {
                this.handleException(error, res);

            }
        } else {
            // Return error
            res.status(200).json({ message: 'This user does not have permissions to remove shippings!' });
        }


    }
}