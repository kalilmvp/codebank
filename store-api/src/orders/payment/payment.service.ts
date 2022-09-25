import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from "@nestjs/microservices";
import { Observable } from "rxjs";

interface PaymentData {
    creditCard: {
        number: string;
        name: string;
        expirationMonth: string;
        expirationYear: string;
        cvv: string;
    };
    amount: number;
    description: string;
    store: string;
}

interface PaymentGRPCService {
    payment(data: PaymentData): Observable<void>;
}

@Injectable()
export class PaymentService implements OnModuleInit {
    private paymentGRPCService: PaymentGRPCService;

    constructor(@Inject('PAYMENT_PACKAGE') private clientGRPC: ClientGrpc) {
    }

    onModuleInit(): any {
        console.log(3);
        this.paymentGRPCService = this.clientGRPC.getService<PaymentGRPCService>('PaymentService');
    }

    async payment(data: PaymentData) {
        try {
            console.log(1);
            return await this.paymentGRPCService.payment(data).toPromise();
        } catch (e) {
            console.error(e);
            console.log(2);
            throw new RpcException({
                code: e.code,
                message: e.message
            })
        }
    }
}
