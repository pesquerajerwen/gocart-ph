export const addressKeys = {
  primary: ["primaryAddress"],
};

export const ordersKeys = {
  all: ["orders"] as const,
  lists: () => [...ordersKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...ordersKeys.lists(), { filters }] as const,
  details: () => [...ordersKeys.all, "detail"] as const,
  detail: (id: string) => [...ordersKeys.details(), id] as const,
};

export const storeProductKeys = {
  all: ["storeProducts"] as const,
};

export const storeOrdersKeys = {
  all: ["storeOrders"] as const,
  lists: () => [...storeOrdersKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...storeOrdersKeys.lists(), { filters }] as const,
  details: () => [...storeOrdersKeys.all, "detail"] as const,
  detail: (id: string) => [...storeOrdersKeys.details(), id] as const,
};
