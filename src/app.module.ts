import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './Controllers/app.controller';
import { UsersController } from './Controllers/users.controller';
import { User, UserSchema } from './Models/User.schema';
import { AppService } from './Services/app.service';
import { UsersService } from './Services/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, cache: true}),
    MongooseModule.forRoot(process.env.BANCO),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
