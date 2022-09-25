import { Column } from "typeorm";
import { Exclude, Expose } from "class-transformer";

export class CreditCard {

    @Exclude()
    @Column({name: 'credit_card_number'})
    number: string;
    @Exclude()
    @Column({name: 'credit_card_name'})
    name: string;
    @Column({name: 'credit_card_expiration_month'})
    expiration_month: string;
    @Column({name: 'credit_card_expiration_year'})
    expiration_year: string;
    @Exclude()
    @Column({name: 'credit_card_cvv'})
    cvv: string;

    @Expose({name: 'number'})
    maskedNumber() {
        return '************'.concat(this.number.substring(this.number.length, this.number.length - 4));
    }
}
