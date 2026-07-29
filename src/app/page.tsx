import { Button } from "@/components/ui/button";
import { BadgeDollarSign } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fina",
  description: "Youre personal finance app wit AI",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <BadgeDollarSign className="text-primary size-20" />
      <h1 className="text-4xl text-primary font-bold">Welcome to Fina </h1>
      <p className="mt-2 text-lg">Youre personal finance app wit AI</p>
      <Link href="/dashboard">
        <Button className="mt-2" size="lg">
          Get Started
        </Button>
      </Link>
    </main>
  );
}
