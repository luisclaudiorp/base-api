import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty()
    cpf: string

    @ApiProperty()
    name: string

    @ApiProperty()
    type: number
}
