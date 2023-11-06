import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { UserMysqlRepository } from './services/repositories/impl/mysql/user.repository';
import { PackageTypeMysqlRepository } from './services/repositories/impl/mysql/packageType.repository';
import { ShippingMysqlRepository } from './services/repositories/impl/mysql/shipping.repository';
import { IdentityService } from './services/identity.service';
import { UserService } from './services/user.service';
import { PackageTypeService } from './services/packageType.service';
import { ShippingService } from './services/shipping.service';

export default (app: Application) => {
    const container = createContainer({
        injectionMode: "CLASSIC"
    });

    container.register({
        // repositories
        userRepository: asClass(UserMysqlRepository).scoped(),
        packageTypeRepository: asClass(PackageTypeMysqlRepository).scoped(),
        shippingRepository: asClass(ShippingMysqlRepository).scoped(),
        //services
        identityService: asClass(IdentityService).scoped(),
        userService: asClass(UserService).scoped(),
        packageTypeService: asClass(PackageTypeService).scoped(),
        shippingService: asClass(ShippingService).scoped()
    });

    app.use(scopePerRequest(container));
}