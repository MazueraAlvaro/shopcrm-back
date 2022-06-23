import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  _id: Types.ObjectId;

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
