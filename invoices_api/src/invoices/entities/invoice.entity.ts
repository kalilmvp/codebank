import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreditCard } from './credit_card.entity';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  amount: number;
  @Column()
  payment_date: Date;
  @Column()
  credit_card_id: string;
  @ManyToOne(() => CreditCard)
  @JoinColumn({
    name: 'credit_card_id',
  })
  credit_card: CreditCard;
  @Column()
  transaction_id: string;
  @Column()
  store: string;
  @Column()
  description: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  beforeInsertActions() {
    this.generateId();
  }

  generateId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }
}