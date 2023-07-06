import {IsEmail, IsNotEmpty, IsPositive} from "class-validator"

export class CreateUserDTO {
  @IsEmail()
  email!: string;
  
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string

  @IsNotEmpty()
  @IsPositive()
  age!: number;

  balance : number = 0
}
