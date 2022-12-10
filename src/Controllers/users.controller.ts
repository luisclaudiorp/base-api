import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { UsersService } from '../Services/users.service';
import { CreateUserDto } from '../Validation/user/create-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../Validation/user/update-user.dto';
import { GetUserDto } from 'src/Validation/user/get-user.dto';

@Controller('v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags("user")
  @ApiBadRequestResponse()
  @Post()
  @ApiCreatedResponse({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
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
  update(@Param('cpf') cpf: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(cpf, updateUserDto);
  }

  @ApiTags("user")
  @ApiBadRequestResponse()
  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.usersService.remove(cpf);
  }
}
