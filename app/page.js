"use client";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";

export default function Home() {
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    router.push('/api/auth/login?post_login_redirect_url=/dashboard'); // Use router.push for client-side navigation
  }, [router]);

  return (
    <div>
      {/* Add any other content if needed */}
    </div>
  );
}
