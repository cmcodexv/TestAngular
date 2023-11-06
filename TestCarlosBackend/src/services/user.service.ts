import { User } from "./repositories/domain/user";
import { UserRepository } from "./repositories/user.repository";

export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) { }
    public async get(): Promise<User[]> {
        return this.userRepository.get();
    }
    
}