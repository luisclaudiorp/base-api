import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from '../Models/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ){}

  async create(createUserDto: CreateUserDto) {
    if(await this.userModel.findOne({cpf: createUserDto.cpf})) return 'user already entered'
    await this.userModel.create(createUserDto)
    return 'user entered'
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findOne(cpf: string) {
    const user = await this.userModel.findOne({cpf: cpf})
    if(!user) return 'user not found'
    return user
  }

  async update(cpf: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({cpf: cpf})
    if(!user) return 'user not found'
    await this.userModel.findOneAndUpdate({cpf: cpf}, updateUserDto)
    return `user updated with cpf #${cpf}`;
  }

  async remove(cpf: string) {
    const user = await this.userModel.findOne({cpf: cpf})
    if(!user) return 'user not found'
    await this.userModel.findOneAndDelete({cpf: cpf})
    return `user deleted with cpf #${cpf}`;
  }
}
