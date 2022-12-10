import { ApiProperty } from "@nestjs/swagger"
import { JoiSchema } from "nestjs-joi";
import * as Joi from 'joi';

export class CreateUserDto {
    @ApiProperty()
    @JoiSchema(
      Joi.string()
        .trim()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
        .required(),
    )
    email: string;

    @JoiSchema(Joi.string().length(11).required())
    cpf: string
  
    @ApiProperty()
    @JoiSchema(Joi.string().min(6).required())
    name: string;
  
    @ApiProperty()
    @JoiSchema(
      Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
    )
    password: string;
  
    @ApiProperty()
    @JoiSchema(
      Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
    )
    passwordConfirmation: string;
  
    @ApiProperty()
    @JoiSchema(
      Joi.string()
        .pattern(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/)
        .required(),
    )
    whatsapp: string;
  
    @ApiProperty({ required: false, default: true })
    @JoiSchema(Joi.boolean())
    active: boolean;
  
    @ApiProperty({ required: false, default: '1' })
    @JoiSchema(Joi.string())
    type: string;
  
    @ApiProperty()
    @JoiSchema(Joi.date().default(new Date()))
    createdAt: Date;
}
