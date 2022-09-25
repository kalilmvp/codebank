import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { validate as uuidValidate } from "uuid";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {
    }
    create(createProductDto: CreateProductDto) {
        const product = this.productRepo.create(createProductDto);
        console.log(product);
        return this.productRepo.save(product);
    }

    findAll() {
        return this.productRepo.find();
    }

    async findOne(idOrSlug: string) {
        const where = uuidValidate(idOrSlug) ? { id: idOrSlug} : { slug: idOrSlug };
        const product = await this.productRepo.findOne(where);

        if (!product) {
            throw new EntityNotFoundError(Product, idOrSlug)
        }

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const updateResult = await this.productRepo.update(id, updateProductDto);
        if (!updateResult.affected) {
            throw new EntityNotFoundError(Product, id)
        }
        return this.productRepo.findOne(id);
    }

    async remove(id: string) {
        const removeResult = await this.productRepo.delete(id);
        if (!removeResult.affected) {
            throw new EntityNotFoundError(Product, id)
        }
    }
}
