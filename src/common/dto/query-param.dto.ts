import {
  IsString,
  IsOptional,
  IsEnum,
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class QueryParamBaseDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  pageSize: number;

  @IsString()
  @IsOptional()
  sortBy: string;

  @IsString()
  @IsOptional()
  @IsEnum(['desc', 'asc'])
  sortOrder: string;

  @IsString()
  @IsOptional()
  search: string;

  @IsBooleanString()
  @IsOptional()
  ignoreDeleted: string;
}

export class ParamIdBaseDto {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
