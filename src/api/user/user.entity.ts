import { Column, Entity } from 'typeorm';
import { USER_CONST } from './user.constant';
import { BaseEntity } from 'src/database/base.entity';

@Entity({ name: USER_CONST.MODEL_NAME })
export class UserEntity extends BaseEntity {
  @Column({ length: 255, name: 'name', nullable: false })
  name: string;

  @Column({ length: 255, name: 'user_name', unique: true, nullable: false })
  userName: string;

  @Column({ length: 525, name: 'address' })
  address: string;

  @Column({ length: 14, name: 'phone' })
  phone: number;
}
