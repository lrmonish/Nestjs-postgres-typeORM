import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// @EntityRepository(User)
export class UserRepository extends Repository<User> {
  //   async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
  //     const { username, password } = authCredentials;
  //     const user = this.create({ username, password });
  //   }
}
