import { ApiProperty } from "@nestjs/swagger";

export class CreateTask {
    @ApiProperty({type: String, required: true})
    tittle: string;
    @ApiProperty({type: String, required: true})
    description: string;
    @ApiProperty({type: String, required: true})
    author: string;
};