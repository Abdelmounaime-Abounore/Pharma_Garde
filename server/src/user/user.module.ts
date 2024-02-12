import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity/user.entity';
import { Role, RoleSchema } from '../role/entity/role.entity';
import { UserUtilService } from './user.util';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema},
    { name: Role.name, schema: RoleSchema },

  ])],
  controllers: [UserController],
  providers: [UserService, UserUtilService],
  exports: [UserService]
})
export class UserModule {}
