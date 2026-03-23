"use server";

import { storeApprovedTemplate } from "@/email-templates/store-approved";
import { sendEmail } from "../brevo";
import { updateStoreStatus } from "../dal/store";
import { updateStoreStatusSchema } from "../schema/store";

export async function approveStoreAction(rawData: unknown) {
  const parsed = updateStoreStatusSchema.pick({ id: true }).safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  try {
    const store = await updateStoreStatus({
      id: parsed.data.id,
      status: "verified",
    });

    const requests = [store.email, store.user.email].map((email) =>
      sendEmail({
        to: email,
        subject: "Your GoCart Store Is Now Approved",
        htmlContent: storeApprovedTemplate({
          storeOwnerName: store.user.firstName || `${store.name} owner`,
          storeName: store.name,
          storeUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/store/${store.id}`,
        }),
      }),
    );

    await Promise.all(requests);
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, message: "Store has been successfully approved." };
}
