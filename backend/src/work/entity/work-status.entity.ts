import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType('WorkStatusInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class WorkStatus {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field(() => String)
  @Column({ default: '#335fff' })
  @IsString()
  color: string;
}
