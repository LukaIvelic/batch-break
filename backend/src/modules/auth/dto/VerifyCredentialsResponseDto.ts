import { HttpStatus } from "@nestjs/common"

export type VerifyCrendentialsResponseDto = {
    status: HttpStatus.OK | HttpStatus.NOT_FOUND | HttpStatus.FORBIDDEN
    message: string;
    response: boolean | null;
}