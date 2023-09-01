import { IsBoolean } from 'class-validator';

export class UpdateTaskDto {

    @IsBoolean({ message: 'Done must be a boolean value' })
    done: boolean;

}