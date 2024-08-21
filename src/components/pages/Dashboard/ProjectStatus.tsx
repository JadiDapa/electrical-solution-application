"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProjectType, ProjectType } from "@/lib/type/project";
import { useRouter } from "next/navigation";
import { updateProject } from "@/lib/network/project";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  status: z.string().min(1),
});

interface ProjectStatusProps {
  project: ProjectType;
}

export default function ProjectStatus({ project }: ProjectStatusProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      status: project.status,
    },
  });

  const { mutate: onUpdateUser } = useMutation({
    mutationFn: (values: CreateProjectType) =>
      updateProject(project.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.refresh();
      toast.success("Project Status Updated!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdateUser(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-40 items-center gap-1"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-7 w-28 p-1">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="estimation">Estimation</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="finished">Finished</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="h-7 p-2" type="submit">
          <Pencil className="w-5" />
        </Button>
      </form>
    </Form>
  );
}
