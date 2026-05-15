import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Kailash Collective" }] }),
  component: () => <AuthShell mode="signup" />,
});
