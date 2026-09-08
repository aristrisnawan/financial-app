"use client";

import { useQuery } from "@tanstack/react-query";
import { BalanceCard } from "./balance-cards";
import WizardInput from "./wizard-input";
import { getBalanceSummary } from "@/features/transaction/action";

export default function DashboardContent() {
  const { data, error, refetch } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalanceSummary(),
  });
  return (
    <section id="content" className="space-y-4">
      <WizardInput refetch={refetch} />
      <BalanceCard data={data} error={error} />
    </section>
  );
}
