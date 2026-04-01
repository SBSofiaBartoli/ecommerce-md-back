import { Injectable, NotFoundException } from "@nestjs/common";
import { FileUploadRepository } from "./file-upload.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class FileUploadService {
    constructor (
        private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    ) {}

    async uploadImg(file: Express.Multer.File, productId: string) {
        const product = await this.productsRepository.findOneBy({ id: productId });
        if(!product) throw new NotFoundException('Product not found');
        const upload = await this.fileUploadRepository.uploadImage(file);
        await this.productsRepository.update(product.id, {
            imgUrl: upload.secure_url,
        })
        return await this.productsRepository.findOneBy({ id: productId });
    }
}
