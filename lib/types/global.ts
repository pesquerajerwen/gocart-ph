export type SortOrder = "asc" | "desc";

export type Pagination = {
  page: number;
  size: number;
  totalCount: number;
  totalPage: number;
};

export type ApiResponse<T> = {
  error?: string;
  data?: T;
};
