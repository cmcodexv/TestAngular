import { UserRepository } from "./repositories/user.repository";
import { ApplicationException } from '../common/exceptions/application.exception';
import { User } from "./repositories/domain/user";

export class IdentityService {

    constructor(
        private readonly userRepository: UserRepository
    ) { }
    async authenticate(email: string, password: string): Promise<User[]> {
        const res = await this.userRepository.login(email, password);
        if (res[0]?.id) {
            return res;
        }
        throw new ApplicationException('Invalid user credentials supplied!');
    }
}