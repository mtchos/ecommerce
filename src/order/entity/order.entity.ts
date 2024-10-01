import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

interface ShippingLocation {
  address1: string;
  address2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

interface Item {
  productId: string;
  productName: string;
  quantity: number;
  unitPriceCents: number;
}

interface Installment {
  maturityDate: string;
  faceValueCents: number;
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string;

  @Column('bigint')
  subtotalAmountCents: number;

  @Column('bigint')
  taxAmountCents: number;

  @Column('bigint')
  shippingCostCents: number;

  @Column('jsonb')
  shippingLocation: ShippingLocation;

  @Column()
  estimatedDeliveryDateUTC: string;

  @Column('jsonb')
  items: Item[];

  @Column('jsonb')
  installments: Installment[];

  @Column({ nullable: true })
  crediPayOrderId: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
