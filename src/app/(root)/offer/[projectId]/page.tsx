"use client";

import OfferForm from "@/components/pages/Root/Offer/OfferForm";
import OfferHeader from "@/components/pages/Root/Offer/OfferHeader";
import { getProjectById } from "@/lib/network/project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ProjectOffer() {
  const params = useParams();
  const projectId = params.projectId || "";

  const { data: project } = useQuery({
    queryFn: () => getProjectById(projectId as string),
    queryKey: ["projects", projectId],
  });

  return (
    <>
      <OfferHeader
        projectId={projectId as string}
        projectType={project?.level || ""}
      />
      {project && <OfferForm project={project} />}
    </>
  );
}
