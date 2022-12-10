import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../Validation/user/create-user.dto';
import { UpdateUserDto } from '../Validation/user/update-user.dto';
import { GetUserDto } from '../Validation/user/get-user.dto';
import { UsersService } from '../Services/users.service';
import { JoiPipe } from 'nestjs-joi';

@Controller('v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags("user")
  @ApiBadRequestResponse()
  @Post()
  @ApiCreatedResponse({ type: CreateUserDto })
  create(@Body(JoiPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags("user")
  @ApiBadRequestResponse()
  @Get()
  find(@Query() query: GetUserDto) {
    return this.usersService.find(query);
  }

  @ApiTags("user")
  @ApiBadRequestResponse()
  @Patch(':cpf')
  @ApiCreatedResponse({ type: UpdateUserDto })
  update(@Param('cpf') cpf: string, @Body(JoiPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(cpf, updateUserDto);
  }

  @ApiTags("user")
  @ApiBadRequestResponse()
  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.usersService.remove(cpf);
  }
}
