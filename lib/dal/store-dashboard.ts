import { prisma } from "../db/client";
import { GetStoreDashboardParams } from "../schema/store";

export async function getStoreDashboard({ storeId }: GetStoreDashboardParams) {
  const totalProductQuery = prisma.product.count({
    where: { storeId },
  });

  const totalEarningsQuery = prisma.orderItem.aggregate({
    where: { product: { storeId } },
    _sum: {
      subtotal: true,
    },
  });

  const totalOrdersQuery = prisma.orderItem.count({
    where: { product: { storeId } },
  });

  const totalRatingsQuery = prisma.product.aggregate({
    where: { storeId },
    _sum: {
      totalRating: true,
    },
  });

  const [totalProducts, totalEarnings, totalOrders, totalRatings] =
    await Promise.all([
      totalProductQuery,
      totalEarningsQuery,
      totalOrdersQuery,
      totalRatingsQuery,
    ]);

  return {
    totalProducts,
    totalEarnings,
    totalOrders,
    totalRatings,
  };
}
