import { Field, Int, ObjectType, PickType } from '@nestjs/graphql';

@ObjectType()
export class Officer {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field({ nullable: true })
  fullname_en: string;

  @Field({ nullable: true })
  profile: string | null;

  @Field({ nullable: true })
  phoneNumber: string | null;

  @Field({ nullable: true })
  email: string | null;

  @Field({ nullable: true })
  gender: string | null;

  @Field({ nullable: true })
  nationality: string | null;

  @Field({ nullable: true })
  district: string | null;

  @Field({ nullable: true })
  commune: string | null;

  @Field({ nullable: true })
  passport_id: string | null;

  @Field({ nullable: true })
  national_id: string | null;

  @Field({ nullable: true })
  position_level: string | null;

  @Field({ nullable: true })
  additional_position_level: string | null;

  @Field({ nullable: true })
  leader_department: string | null;

  @Field({ nullable: true })
  general_department: string | null;

  @Field({ nullable: true })
  department: string | null;

  @Field({ nullable: true })
  office: string | null;

  @Field({ nullable: true })
  contact_city_or_province: string | null;

  @Field({ nullable: true })
  province: string | null;

  @Field({ nullable: true })
  homeNo: string | null;

  @Field({ nullable: true })
  streetNo: string | null;

  @Field({ nullable: true })
  village_or_group: string | null;

  @Field({ nullable: true })
  contact_district: string | null;

  @Field({ nullable: true })
  contact_village: string | null;

  @Field({ nullable: true })
  contact_commune: string | null;

  @Field({ nullable: true })
  officer_id: string | null;

  @Field({ nullable: true })
  is_he: boolean | null;

  @Field({ nullable: true })
  cx_extension: string | null;
}

@ObjectType()
export class AllOfficersPagination {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  size: number;

  @Field(() => Int)
  current: number;
}

@ObjectType()
export class AllOfficersResponse {
  @Field(() => Int, { nullable: true })
  statusCode: number;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => [Officer], { nullable: true })
  data: Officer[];

  @Field(() => AllOfficersPagination, { nullable: true })
  pagination: AllOfficersPagination;
}

@ObjectType()
export class _Officer extends PickType(Officer, [
  'username',
  'leader_department',
  'general_department',
  'department',
  'office',
  'fullname',
  'fullname_en',
  'profile',
  'gender',
]) {
  @Field(() => Int, { nullable: false })
  hr_employee_id: number;

  @Field(() => String, { nullable: false })
  phone_number: string;
}

@ObjectType()
export class AcceptInvitationResponse {
  @Field(() => Int, { nullable: true })
  statusCode: number;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => _Officer, { nullable: true })
  data: _Officer;
}
