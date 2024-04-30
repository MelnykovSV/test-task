import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const countAllProducts = async () => {
  const totalQuantity = await prisma.stockProduct.aggregate({
    _sum: { quantity: true },
  });
  return totalQuantity._sum.quantity ?? 0;
};

export const countAllProductsOnStock = async (uuid: string) => {
  const totalQuantity = await prisma.stockProduct.aggregate({
    where: { stockId: uuid },
    _sum: { quantity: true },
  });
  return totalQuantity._sum.quantity ?? 0;
};

export const countProduct = async (sku: string) => {
  const productQuantity = await prisma.stockProduct.aggregate({
    where: { productId: sku },
    _sum: { quantity: true },
  });
  return productQuantity._sum.quantity ?? 0;
};

export const countProductOnStock = async (uuid: string, sku: string) => {
  const productQuantity = await prisma.stockProduct.aggregate({
    where: { stockId: uuid, productId: sku },
    _sum: { quantity: true },
  });

  return productQuantity._sum?.quantity ?? 0;
};

export const countProductByCategory = async (slug: string) => {
  const productsByCategory = await prisma.stockProduct.aggregate({
    where: { product: { categories: { some: { slug } } } },
    _sum: { quantity: true },
  });
  return productsByCategory._sum.quantity ?? 0;
};

export const countProductOnStockByCategory = async (
  uuid: string,
  slug: string
) => {
  const productsOnStockByCategory = await prisma.stockProduct.aggregate({
    where: { stockId: uuid, product: { categories: { some: { slug } } } },
    _sum: { quantity: true },
  });
  return productsOnStockByCategory._sum.quantity ?? 0;
};