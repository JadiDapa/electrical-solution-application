import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOfferSection } from "@/lib/network/offer-section";
import { CreateOfferSectionType } from "@/lib/type/offer-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CreateOfferSectionProps {
  projectId: string;
}

export const offerSectionSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(1),
});

export default function CreateOfferSection({
  projectId,
}: CreateOfferSectionProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: onCreateOfferSection } = useMutation({
    mutationFn: (values: CreateOfferSectionType) => createOfferSection(values),
    onSuccess: () => {
      toast.success("Project Offer Created!");
      queryClient.invalidateQueries({ queryKey: ["offer-section", projectId] });
      form.setValue("title", "");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Something Went Wrong!");
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof offerSectionSchema>>({
    resolver: zodResolver(offerSectionSchema),
    defaultValues: {
      projectId: projectId,
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof offerSectionSchema>) {
    onCreateOfferSection(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {isOpen ? (
          <div className="flex w-full gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-9"
                      placeholder="Offer section title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="h-9 max-w-fit">
              <Plus className="text-white" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="flex items-center gap-2"
          >
            Click To Add Section <PlusCircle className="size-5" />
          </Button>
        )}
      </form>
    </Form>
  );
}
