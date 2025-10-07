"use server";

import { getStore } from "../dal/store";

export async function getStoreAction(storeId: string) {
  const store = await getStore({ storeId });

  return store;
}

export async function getStoreByUserIdAction(userId: string) {
  const store = await getStore({ userId });

  return store;
}
