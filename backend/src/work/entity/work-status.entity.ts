import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum WorkStatusColor {
  BlueGray = 'blue-gray',
  Gray = 'gray',
  Brown = 'brown',
  DeepOrange = 'deep-orange',
  Orange = 'orange',
  Amber = 'amber',
  Yellow = 'yellow',
  Lime = 'lime',
  LightGreen = 'light-green',
  Green = 'green',
  Teal = 'teal',
  Cyan = 'cyan',
  LightBlue = 'light-blue',
  Blue = 'blue',
  Indigo = 'indigo',
  DeepPurple = 'deep-purple',
  Purple = 'purple',
  Pink = 'pink',
  Red = 'red',
}

@InputType('WorkStatusInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class WorkStatus {
  @Field(() => String)
  @PrimaryColumn('varchar')
  @IsString()
  name: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: WorkStatusColor,
    default: WorkStatusColor.Blue,
  })
  @IsString()
  color: WorkStatusColor;
}
