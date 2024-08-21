"use client";

import CalculationHeader from "@/components/pages/Root/ManualCalculation/CalculationHeader";
import CalculationSelection from "@/components/pages/Root/ManualCalculation/CalculationSelection";
import { useParams } from "next/navigation";

export default function ManualCalculation() {
  const params = useParams();
  const projectId = params.projectId || "";
  return (
    <>
      <CalculationHeader />
      <CalculationSelection projectId={projectId as string} />
    </>
  );
}
