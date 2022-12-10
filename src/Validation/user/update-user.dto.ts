import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from "nestjs-joi";
import * as Joi from 'joi';

export class UpdateUserDto {
    @ApiProperty()
    @JoiSchema(
      Joi.string()
        .trim()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
    )
    email: string;

    @JoiSchema(Joi.string().length(11))
    cpf: string
  
    @ApiProperty()
    @JoiSchema(Joi.string().min(6))
    name: string;
  
    @ApiProperty()
    @JoiSchema(Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6))
    password: string;
  
    @ApiProperty()
    @JoiSchema(Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6))
    passwordConfirmation: string;
  
    @ApiProperty()
    @JoiSchema(Joi.string().pattern(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/))
    whatsapp: string;
  
    @ApiProperty({ required: false, default: true })
    @JoiSchema(Joi.boolean())
    active: boolean;
  
    @ApiProperty({ required: false, default: '1' })
    @JoiSchema(Joi.string())
    type: string;
  
    @ApiProperty({ required: false })
    @JoiSchema(Joi.date().default(new Date()))
    updatedAt: Date;
}
