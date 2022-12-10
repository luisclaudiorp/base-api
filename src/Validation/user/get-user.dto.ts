import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from "nestjs-joi";
import * as Joi from 'joi';

export class GetUserDto {
  @ApiProperty({ required: false })
  @JoiSchema(
    Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      }),
  )
  email: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().min(6))
  name: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().length(11))
  cpf: string;

  @ApiProperty({ required: false , enum: ['1', '2', '3'] })
  @JoiSchema(Joi.string())
  type: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.boolean())
  active: boolean;
}
