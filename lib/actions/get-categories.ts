import { getCategories } from "../dal/categories";

export async function getCategoriesAction() {
  const store = await getCategories();

  return store;
}
