import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type UserDocument = User & Document

@Schema()
export  class User {
    @Prop({ required: true })
    email: string;
  
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    cpf: string;
  
    @Prop({ required: false })
    whatsapp: string;
  
    @Prop({ required: false })
    password: string;
  
    @Prop({ required: false })
    createdAt: Date;
  
    @Prop({ required: false })
    updatedAt: Date;
  
    @Prop({ required: false, enum: ['1', '2', '3'], default: '1' })
    type: string;
    
    @Prop({ required: false, default: true })
    active: boolean;
  
    @Prop({ required: false })
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User)