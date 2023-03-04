import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@InputType('WorkStatusInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class WorkStatus {
  @Field(() => String)
  @PrimaryColumn('varchar')
  @IsString()
  name: string;

  @Field(() => String)
  @Column({ default: 'blue' })
  @IsString()
  color: string;
}
