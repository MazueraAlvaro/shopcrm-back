import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  temp: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
