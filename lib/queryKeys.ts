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
