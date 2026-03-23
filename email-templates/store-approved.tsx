export function storeApprovedTemplate({
  storeOwnerName,
  storeName,
  storeUrl,
}: {
  storeOwnerName: string;
  storeName?: string;
  storeUrl?: string;
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Store Approved</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f6f9fc;font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:32px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <div style="font-size:28px;font-weight:bold;">
                  <span style="color:#16a34a;">go</span>cart
                  <span style="color:#16a34a;font-size:36px;line-height:0;">.</span>
                </div>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="text-align:center;padding-bottom:10px;">
                <h2 style="margin:0;color:#111827;font-size:20px;">
                  🎉 Store Approved!
                </h2>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:10px 0 20px 0;">
                <div style="height:1px;background-color:#e5e7eb;"></div>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="color:#374151;font-size:14px;line-height:1.7;">
                <p>Dear <strong>${storeOwnerName}</strong>,</p>

                <p>
                  Great news! Your store${
                    storeName ? ` "<strong>${storeName}</strong>"` : ""
                  } has been successfully approved and is now live on GoCart.
                </p>

                <p>
                  You can now start adding products, managing orders, and growing your business on our platform.
                </p>

                ${
                  storeUrl
                    ? `<p>
                        Access your store here:<br/>
                        <a href="${storeUrl}" style="color:#16a34a;text-decoration:none;">
                          ${storeUrl}
                        </a>
                      </p>`
                    : ""
                }

                <p style="margin-top:20px;">
                  We’re excited to have you onboard. If you need any help, feel free to reach out to our support team anytime.
                </p>
              </td>
            </tr>

            <!-- CTA -->
            ${
              storeUrl
                ? `
            <tr>
              <td align="center" style="padding:25px 0;">
                <a href="${storeUrl}"
                  style="background-color:#16a34a;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">
                  Go to Your Store
                </a>
              </td>
            </tr>
            `
                : ""
            }

            <!-- Footer -->
            <tr>
              <td style="font-size:12px;color:#6b7280;text-align:center;border-top:1px solid #e5e7eb;padding-top:15px;">
                <p style="margin:0;">© 2026 GoCart. All rights reserved.</p>
                <p style="margin:6px 0 0;">
                  This is an automated message. Please do not reply directly to this email.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}
