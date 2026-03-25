"use server";

import { storeRejectedTemplate } from "@/email-templates/store-rejected";
import { sendEmail } from "../brevo";
import { updateStoreStatus } from "../dal/store";
import { updateStoreStatusSchema } from "../schema/store";

export async function rejectStoreAction(rawData: unknown) {
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
      status: "rejected",
    });

    const requests = [store.email, store.user.email].map((email) =>
      sendEmail({
        to: email,
        subject: "Your GoCart Store Application Has Been Reviewed",
        htmlContent: storeRejectedTemplate({
          storeOwnerName: store.user.firstName || `${store.name} owner`,
          storeName: store.name,
          rejectionReason: "The store does not meet our quality standards.",
        }),
      }),
    );

    Promise.all(requests);
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, message: "Store has been rejected." };
}
