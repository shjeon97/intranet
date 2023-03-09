import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Work } from './work.entity';

@InputType('RestInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Rest extends CoreEntity {
  @Field(() => Work)
  @ManyToOne(() => Work, { eager: true, onDelete: 'CASCADE' })
  work: Work;

  @Field(() => Number)
  @Column()
  @RelationId((rest: Rest) => rest.work)
  workId: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'time', nullable: true })
  @IsOptional()
  @IsString()
  startTime?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'time', nullable: true })
  @IsOptional()
  @IsString()
  endTime?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  reason?: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  TotalMinute: number;
}
