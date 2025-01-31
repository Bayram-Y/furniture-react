import {
  FurnitureSize,
  FurnitureStatus,
  FurnitureCategory,
} from "../enums/product.enum";

export interface Product {
  _id: string;
  productStatus: FurnitureStatus;
  productCollection: FurnitureCategory;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: FurnitureSize;
  productVolume: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCollection?: FurnitureCategory;
  search?: string;
}
