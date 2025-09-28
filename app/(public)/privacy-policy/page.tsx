import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-xl font-bold mb-2">Privacy Policy</h1>
      <p className="mb-8 text-sm">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information when you use our
        website and services.
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-2 text-sm">
          We collect information you provide directly to us when you:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Create an account</li>
          <li>Place an order</li>
          <li>Subscribe to our newsletter</li>
          <li>Contact customer support</li>
        </ul>
        <p className="mt-2 text-sm">
          This may include your name, email address, phone number, shipping
          address, and payment details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-sm">We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Process and fulfill your orders</li>
          <li>Send order confirmations and shipping updates</li>
          <li>Respond to your inquiries</li>
          <li>Improve our website and customer experience</li>
          <li>Send marketing emails (only if you opt-in)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          3. Sharing of Information
        </h2>
        <p className="text-sm">
          We do not sell your personal data. We may share information with
          trusted third-party service providers (e.g., payment processors,
          shipping partners) to operate our business and deliver your orders.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">4. Data Security</h2>
        <p className="text-sm">
          We use industry-standard security measures to protect your personal
          information. However, no online transmission is 100% secure, so we
          cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">5. Your Rights</h2>
        <p className="text-sm">
          You may request to access, update, or delete your personal information
          by contacting us at{" "}
          <Link
            href="mailto:support@example.com"
            className="text-blue-600 underline"
          >
            gocart-ph@gmail.com
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          6. Changes to This Policy
        </h2>
        <p className="text-sm">
          We may update this Privacy Policy from time to time. We will notify
          you by posting the updated policy on this page with the new effective
          date.
        </p>
      </section>

      <footer className="text-sm text-gray-600">
        <p className="text-sm">Last updated: September 28, 2025</p>
      </footer>
    </main>
  );
}
