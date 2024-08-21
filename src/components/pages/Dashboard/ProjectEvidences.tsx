"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  createEvidence,
  getEvidencesByProjectId,
} from "@/lib/network/evidence";
import { CreateEvidenceType } from "@/lib/type/evidence";
import { ProjectType } from "@/lib/type/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, ScrollText, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProjectEvidencesProps {
  project: ProjectType;
}

export default function ProjectEvidences({ project }: ProjectEvidencesProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: evidences } = useQuery({
    queryFn: () => getEvidencesByProjectId(project.id),
    queryKey: ["evidences", project.id],
  });

  const negotiationEvidence = evidences?.find(
    (evidence) => evidence.type === "negotiation",
  );
  const contractEvidence = evidences?.find(
    (evidence) => evidence.type === "contract",
  );
  const finishedEvidence = evidences?.find(
    (evidence) => evidence.type === "finished",
  );

  const { mutate: onCreateEvidence } = useMutation({
    mutationFn: (values: CreateEvidenceType) => createEvidence(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidences", project.id] });
      router.refresh();
      toast.success("Evidence Created!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) {
    const file = event.target.files?.[0];
    if (file) {
      await onCreateEvidence({
        projectId: project.id,
        type: type,
        evidence: file,
      });
    }
  }

  function handleDownload(evidenceUrl: string, filename: string) {
    const link = document.createElement("a");
    link.href = evidenceUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex h-7 items-center gap-3 px-2">
          <ScrollText className="size-5" />
          Evidences
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Project Evidences</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Negotiation Evidence</p>
            <div className="">
              {negotiationEvidence ? (
                <Button
                  size="sm"
                  className="flex items-center gap-3"
                  onClick={() =>
                    handleDownload(
                      negotiationEvidence.evidence,
                      "negotiation-evidence-" + project.id,
                    )
                  }
                >
                  <Download className="size-5" />
                  Download Evidence
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="relative flex items-center gap-3 border-2 border-dashed border-primary text-primary"
                >
                  <Upload className="size-5" />
                  Upload Evidence
                  <Input
                    type="file"
                    className="absolute inset-0 z-20 opacity-0"
                    onChange={(e) => handleUpload(e, "negotiation")}
                  />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Contract Evidence</p>
            <div className="">
              {contractEvidence ? (
                <Button
                  size="sm"
                  className="flex items-center gap-3"
                  onClick={() =>
                    handleDownload(
                      contractEvidence.evidence,
                      "contract-evidence-" + project.id,
                    )
                  }
                >
                  <Download className="size-5" />
                  Download Evidence
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="relative flex items-center gap-3 border-2 border-dashed border-primary text-primary"
                >
                  <Upload className="size-5" />
                  Upload Evidence
                  <Input
                    type="file"
                    className="absolute inset-0 z-20 opacity-0"
                    onChange={(e) => handleUpload(e, "contract")}
                  />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Finished Evidence</p>
            <div className="">
              {finishedEvidence ? (
                <Button
                  size="sm"
                  className="flex items-center gap-3"
                  onClick={() =>
                    handleDownload(
                      finishedEvidence.evidence,
                      "finished-evidence-" + project.id,
                    )
                  }
                >
                  <Download className="size-5" />
                  Download Evidence
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="relative flex items-center gap-3 border-2 border-dashed border-primary text-primary"
                >
                  <Upload className="size-5" />
                  Upload Evidence
                  <Input
                    type="file"
                    className="absolute inset-0 z-20 opacity-0"
                    onChange={(e) => handleUpload(e, "finished")}
                  />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
