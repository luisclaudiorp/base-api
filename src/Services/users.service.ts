
import { BadRequestErrorException } from '../Exceptions/BadRequestErrorException';
import { NotFoundErrorException } from '../Exceptions/NotFoundErrorException';
import { InvalidErrorException } from '../Exceptions/InvalidErrorException';
import { UpdateUserDto } from '../Validation/user/update-user.dto';
import { CreateUserDto } from '../Validation/user/create-user.dto';
import { GetUserDto } from '../Validation/user/get-user.dto';
import { User, UserDocument } from '../Models/User.schema';
import { UserMapper } from '../Mappers/UserMapper';
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from '@nestjs/common';
import { clear } from '../Utils/clear';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ){}

  /**
   * This method insert one user into the database.
   * @param createUserDto 
   * @returns User
   */
  async create(createUserDto: CreateUserDto): Promise<User>{
    this.validCpfEmail(createUserDto.cpf, createUserDto.email)
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = encryptedPassword;
    await this.userModel.create(createUserDto)
    return UserMapper.mapResponseUserCreate(createUserDto)
  }

  /**
   * This method executes a query using parameters that match the entered properties.
   * @param query 
   * @returns User[]
   */
  async find(query: GetUserDto): Promise<User[]> {
    let options: object = {};
    if (query) {
      options = {
        name: new RegExp(query.name),
        email: new RegExp(query.email),
        cpf: new RegExp(query.cpf),
        type: query.type,
        active: query.active,
      };
    }
    clear(options)
    return await this.userModel.find().where(options).exec()
  }

  /**
   * This method find the CPF match with database and update this data with updateUserDto.
   * @param cpf 
   * @param updateUserDto 
   * @returns User
   */
  async update(cpf: string, updateUserDto: UpdateUserDto):Promise<User> {
    await this.findNotCpf(cpf)
    if (updateUserDto.password) {
      await this.validCpfEmail(undefined, updateUserDto.email)
      if (updateUserDto.password !== updateUserDto.passwordConfirmation)  throw new InvalidErrorException('the password is not the same')
      const encryptedPassword = await bcrypt.hash(updateUserDto.password, 10)
      updateUserDto.password = encryptedPassword
    }
    return await this.userModel.findOneAndUpdate({cpf: cpf}, updateUserDto).exec()
  }

  /**
   * This method queries the database to find the CPF and remove the corresponding record.
   * @param cpf 
   * @returns User
   */
  async remove(cpf: string) {
    await this.findNotCpf(cpf)
    return await this.userModel.findOneAndDelete({cpf: cpf}).exec()
  }

  /**
   * This method verify if CPF or Email exists in database.
   * @param cpf string
   * @param email string
   */
  async validCpfEmail(cpf: string, email: string) {
    if(await this.userModel.findOne({cpf: cpf})) throw new BadRequestErrorException("CPF")
    if(await this.userModel.findOne({email: email})) throw new BadRequestErrorException("Email")
  }

  /**
   * This method verify if CPF dont exists in database.
   * @param cpf string
   */
  async findNotCpf(cpf: string) {
    const user = await this.userModel.findOne({cpf: cpf})
    if(!user) throw new NotFoundErrorException("CPF")
  }
}


