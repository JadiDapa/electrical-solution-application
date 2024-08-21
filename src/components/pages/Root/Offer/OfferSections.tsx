"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  createMaterialSection,
  deleteMaterialSection,
  getMaterialSectionBySectionId,
} from "@/lib/network/material-section";
import { deleteOfferSection } from "@/lib/network/offer-section";
import { CreateMaterialSectionType } from "@/lib/type/material-section";
import { MaterialVariantType } from "@/lib/type/material-variant";
import { OfferSectionType } from "@/lib/type/offer-section";
import { cn } from "@/lib/utils";
import { convertToRoman } from "@/lib/utils/formatter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Plus, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import MaterialSection from "./MaterialSection";

interface OfferSectionsProps {
  number: number;
  materialVariants: MaterialVariantType[];
  section: OfferSectionType;
}

export default function OfferSections({
  number,
  materialVariants,
  section,
}: OfferSectionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const queryClient = useQueryClient();

  const { mutate: onCreateMaterialSection } = useMutation({
    mutationFn: (values: CreateMaterialSectionType) =>
      createMaterialSection(values),
    onSuccess: () => {
      toast.success("Material Added!");
      queryClient.invalidateQueries({
        queryKey: ["material-section", section.id],
      });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const { mutate: onDeleteOfferSection } = useMutation({
    mutationFn: (id: string) => deleteOfferSection(id),
    onSuccess: () => {
      toast.success("Section Removed!");
      queryClient.invalidateQueries({
        queryKey: ["offer-section", section.id],
      });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const { data: materialSections } = useQuery({
    queryFn: () => getMaterialSectionBySectionId(section.id),
    queryKey: ["material-section", section.id],
  });

  async function handleCreate() {
    if (selectedId) {
      onCreateMaterialSection({
        variantId: selectedId,
        offerId: section.id,
        projectId: section.projectId,
        quantity: 0,
      });
    }
  }

  async function handleDeleteOfferSection(id: string) {
    onDeleteOfferSection(id);
  }

  const sectionTitle = section.title;

  if (materialSections) {
    return (
      <div className="">
        <div className="flex items-center justify-between border-primary bg-secondary p-2">
          <h4 className="text-xl font-semibold">
            {convertToRoman(number)}. {sectionTitle}
          </h4>
          <Trash2
            onClick={() => handleDeleteOfferSection(section.id)}
            className="text-red-700"
          />
        </div>

        <div className="mt-2 flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "h-8 w-[100%] justify-between rounded-md border-secondary",
                  !selectedVariant && "text-muted-foreground",
                )}
              >
                {selectedVariant
                  ? materialVariants.find(
                      (variant) => variant.name === selectedVariant,
                    )?.name
                  : "Select Material"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
              <Command className="w-full">
                <CommandInput placeholder="Select main material..." />
                <CommandList>
                  <CommandGroup>
                    {materialVariants?.map((item) => (
                      <CommandItem
                        value={item.name}
                        key={item.id}
                        onSelect={(currentValue) => {
                          setSelectedVariant(
                            currentValue === selectedVariant
                              ? ""
                              : currentValue,
                          );
                          setSelectedId(item.id);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item.id === selectedVariant
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <div className="flex w-full justify-between">
                          <span>{item.name}</span>
                          <span className="opacity-60">
                            {item.Material.name}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button onClick={handleCreate} className="h-8 max-w-fit">
            <Plus className="text-white" />
          </Button>
        </div>
        <div className="mt-2 space-y-1 divide-y">
          <div className="flex items-center py-2">
            <p className="flex-[2] font-medium">Main</p>
            <p className="flex-[3] font-medium">Variant</p>
            <p className="flex-[1] font-medium">Service</p>
            <p className="flex-[2] font-medium">Cost</p>
            <p className="flex-[1] pe-1 text-end font-medium">Quantity</p>
          </div>
          {materialSections?.map((material) => (
            <MaterialSection
              key={material.id}
              materialSection={material}
              sectionId={section.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
