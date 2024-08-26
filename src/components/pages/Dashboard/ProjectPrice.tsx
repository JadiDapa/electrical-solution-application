import { getMaterialCalculationsByProjectId } from "@/lib/network/material-calculation";
import { ProjectType } from "@/lib/type/project";
import { useQuery } from "@tanstack/react-query";

interface ProjectPrice {
  project: ProjectType;
}

export default function ProjectPrice({ project }: ProjectPrice) {
  const { data: materialCalculations } = useQuery({
    queryFn: async () => {
      if (project.id) {
        return await getMaterialCalculationsByProjectId(project.id);
      }
    },
    queryKey: ["material-calculations", project.id],
  });

  const totalPrice =
    materialCalculations?.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.MaterialVariant.price);
    }, 0) || 0;
  return <div>Rp {totalPrice.toLocaleString()}</div>;
}
