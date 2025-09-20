import type { NextRequest } from "next/server";

// Simplified webhook handler without external dependencies
const validateWebhook = (request: NextRequest) => {
	// In a real app, you would validate the webhook signature here
	// For now, we'll return a mock response
	return Promise.resolve({
		action: "payment.succeeded",
		data: {
			id: "mock-payment-id",
			final_amount: 1000,
			amount_after_fees: 950,
			currency: "USD",
			user_id: "mock-user-id"
		}
	});
};

export async function POST(request: NextRequest): Promise<Response> {
	// Validate the webhook to ensure it's from Whop
	const webhookData = await validateWebhook(request);

	// Handle the webhook event
	if (webhookData.action === "payment.succeeded") {
		const { id, final_amount, amount_after_fees, currency, user_id } =
			webhookData.data;

		// final_amount is the amount the user paid
		// amount_after_fees is the amount that is received by you, after card fees and processing fees are taken out

		console.log(
			`Payment ${id} succeeded for ${user_id} with amount ${final_amount} ${currency}`,
		);

		// In a real app, you would handle the payment here
		// For now, we'll just log it
		console.log('Payment processed successfully');
	}

	// Make sure to return a 2xx status code quickly. Otherwise the webhook will be retried.
	return new Response("OK", { status: 200 });
}

