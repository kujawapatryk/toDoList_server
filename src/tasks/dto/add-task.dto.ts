import {IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class AddTaskDto{
    @Length(1, 120)
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    done?: boolean = false;
}