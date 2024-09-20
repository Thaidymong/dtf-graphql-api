import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ActivityLog {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field()
  activity_type: string;

  @Field()
  action: string;

  @Field({ nullable: true })
  ip_address: string;

  @Field({ nullable: true })
  description: string;
}

@ObjectType()
export class ActivityLogResponse {
  @Field(() => Int, { nullable: true })
  statusCode: number;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => ActivityLog, { nullable: true })
  data: ActivityLog;
}
