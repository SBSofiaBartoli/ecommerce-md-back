import { Module } from "@nestjs/common";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "./file-upload.service";
import { CloudinaryConfig } from "src/config/cloudinary";
import { FileUploadRepository } from "./file-upload.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entities/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [FileUploadController],
    providers: [FileUploadService, CloudinaryConfig, FileUploadRepository]
})
export class FileUploadModule {}
