import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  rolename: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
