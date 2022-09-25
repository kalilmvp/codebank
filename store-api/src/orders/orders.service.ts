import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { In, Repository } from "typeorm";
import { Product } from "../products/entities/product.entity";
import { PaymentService } from "./payment/payment.service";

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,
                @InjectRepository(Product) private productRepo: Repository<Product>,
                private paymentService: PaymentService) {
    }

    async create(createOrderDto: CreateOrderDto) {
        const order = this.orderRepo.create(createOrderDto);
        const products = await this.productRepo.find({
            where: {
                id: In(order.items.map(item => item.product_id))
            }
        });

        order.items.forEach(item => {
            const product = products.find(p => p.id = item.product_id);
            item.price = product.price;
        });

        const savedOrder = this.orderRepo.save(order);

        await this.paymentService.payment({
            creditCard: {
                name: order.credit_card.name,
                number: order.credit_card.number,
                expirationMonth: order.credit_card.expiration_month,
                expirationYear: order.credit_card.expiration_year,
                cvv: order.credit_card.cvv,
            },
            amount: order.total,
            store: process.env.STORE_NAME,
            description: `Products: ${products.map(p => p.name).join(', ')}`
        });

        return savedOrder;
    }

    findAll() {
        return `This action returns all orders`;
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
