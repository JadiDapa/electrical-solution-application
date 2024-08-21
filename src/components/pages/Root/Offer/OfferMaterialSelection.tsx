"use client";

import { getAllMaterialVariants } from "@/lib/network/material-variant";
import { useQuery } from "@tanstack/react-query";
import OfferSections from "./OfferSections";
import { getOfferSectionByProjectId } from "@/lib/network/offer-section";
import CreateOfferSection from "./CreateOfferSection";

interface OfferMaterialSelectionProps {
  projectId: string;
}

export default function OfferMaterialSelection({
  projectId,
}: OfferMaterialSelectionProps) {
  const { data: materialVariants, isLoading: variantLoading } = useQuery({
    queryFn: () => getAllMaterialVariants(),
    queryKey: ["material-variants"],
  });

  const { data: offerSections, isLoading: offerLoading } = useQuery({
    queryFn: () => getOfferSectionByProjectId(projectId),
    queryKey: ["offer-section", projectId],
  });

  if (variantLoading || offerLoading) {
    return <div>Loading...</div>;
  }

  if (materialVariants && offerSections) {
    return (
      <div className="w-full items-center space-y-6 rounded-lg border-2 border-dashed p-6">
        <h3 className="text-2xl font-semibold text-primary">
          Project Offer Form
        </h3>
        {offerSections.map((section, index) => (
          <OfferSections
            key={section.id}
            section={section}
            materialVariants={materialVariants}
            number={index + 1}
          />
        ))}

        <CreateOfferSection projectId={projectId} />
      </div>
    );
  }
}
