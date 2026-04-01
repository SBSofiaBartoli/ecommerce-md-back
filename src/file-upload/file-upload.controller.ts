import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";

@Controller('files/uploadImage')
export class FileUploadController {
    constructor (private readonly fileUploadService: FileUploadService) {}

    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Upload an image for a product' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
            file: {
                type: 'string',
                format: 'binary',
                },
            },
        },
    })
    @Put(':id')
    @Roles(Rol.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    uploadImg(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 200000, message: 'File must be max 200 Kb'}),
                new FileTypeValidator({ fileType: /(png|jpg|jpeg|webp)$/ }),
            ],
        })
    ) file: Express.Multer.File, @Param('id') productId: string) {
        return this.fileUploadService.uploadImg(file, productId);
    }
}
