import { redirect } from "next/navigation";

export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	// Redirect to the main habit tracker dashboard
	// This page was originally for Whop experiences, but we're now a habit tracker app
	redirect("/");
}
