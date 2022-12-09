import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type UserDocument = User & Document

@Schema()
export  class User {
    @Prop()
    cpf: string;

    @Prop()
    name: string

    @Prop()
    type: number
}

export const UserSchema = SchemaFactory.createForClass(User)