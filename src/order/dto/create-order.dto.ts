import {
  IsString,
  IsNumber,
  IsISO8601,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class ShippingLocationDto {
  @IsString()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  city: string;

  @IsString()
  region: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
}

class ItemDto {
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPriceCents: number;
}

class InstallmentDto {
  @IsISO8601()
  maturityDate: string;

  @IsNumber()
  faceValueCents: number;
}

export class CreateOrderDto {
  @IsString()
  externalId: string;

  @IsString()
  buyerTaxId: string;

  @IsString()
  sellerTaxId: string;

  @IsNumber()
  subtotalAmountCents: number;

  @IsNumber()
  taxAmountCents: number;

  @IsNumber()
  shippingCostCents: number;

  @ValidateNested()
  @Type(() => ShippingLocationDto)
  shippingLocation: ShippingLocationDto;

  @IsISO8601()
  estimatedDeliveryDateUTC: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InstallmentDto)
  installments: InstallmentDto[];
}
