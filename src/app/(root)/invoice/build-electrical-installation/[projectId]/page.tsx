"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOfferByProjectId } from "@/lib/network/offer";
import { getOfferSectionByProjectId } from "@/lib/network/offer-section";
import { getProjectById } from "@/lib/network/project";
import { convertToRoman, formatDate, getLetter } from "@/lib/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeftCircle, Printer } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Invoice({ params }: { params: { projectId: string } }) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const { data: project } = useQuery({
    queryFn: () => getProjectById(params.projectId),
    queryKey: ["project", params.projectId],
  });
  const { data: offer } = useQuery({
    queryFn: () => getOfferByProjectId(params.projectId),
    queryKey: ["offer", params.projectId],
  });

  const { data: offerSection } = useQuery({
    queryFn: () => getOfferSectionByProjectId(params.projectId),
    queryKey: ["offer-sections", params.projectId],
  });

  const subtotal = offerSection?.reduce(
    (acc, curr) =>
      acc +
      curr.MaterialSection.reduce(
        (a, c) =>
          a +
          (Number(c.MaterialVariant.price) * c.quantity +
            (c.useService === "true"
              ? Number(c.MaterialVariant.service) * c.quantity
              : 0)),
        0,
      ),
    0,
  );

  const ppn = ((subtotal || 0) * 11) / 100;
  const total = (subtotal || 0) + ppn;

  if (project && offer && offerSection && subtotal && ppn && total) {
    return (
      <section
        id="invoice"
        className="relative w-full space-y-6 overscroll-auto bg-primary/5 px-6 py-32 lg:px-24"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-2xl">
            <ArrowLeftCircle />
            Back
          </div>
          <Button className="flex items-center gap-3" onClick={handlePrint}>
            Print Invoice <Printer strokeWidth={1.7} size={20} />
          </Button>
        </div>
        <h1 className="max-w-fit border-b-4 border-primary ps-3 text-2xl font-bold text-foreground md:text-3xl lg:mx-auto lg:text-4xl">
          Estimasi Pembayaran - Invoice
        </h1>

        <div
          ref={invoiceRef}
          className="mx-auto aspect-[9/12] w-[1200px] space-y-12 bg-white p-12"
        >
          <figure className="relative h-16 w-64">
            <Image
              src="/images/logo-pln-hp.png"
              alt="Logo"
              fill
              className="object-contain object-center"
            />
          </figure>
          <div className="">
            <p className="text-center text-2xl font-bold underline">
              SURAT PENAWARAN HARGA
            </p>
            <div className="mt-12 flex justify-between">
              <div className="text-sm">
                <p>LISTRIQU By:</p>
                <p className="mt-2 font-bold">PLN HALEYORA POWER</p>
                <p className="mt-1 max-w-xs">
                  Jl. Duren Tiga Raya No.101 4 RT.4/RW.1, Duren Tiga,
                  Kec.Pancoran, kota Jakarta Selatan,12760 Gedung PT PLN
                  Pusertif No : 19
                </p>
                <p className="mt-2">(021)79192517</p>
                <div className="mt-1 w-[400px] space-y-1 font-bold">
                  <p className="bg-primary text-center text-white">CUSTOMER</p>
                  <div className="flex gap-3">
                    <p className="w-40">ID Project ELSA</p> : {project.id}
                  </div>
                  <div className="flex gap-3">
                    <p className="w-40">NAMA CUSTOMER ELSA</p> : {project.name}
                  </div>
                  <div className="flex gap-3">
                    <p className="w-40">ALAMAT CUSTOMER</p> : {project.address}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex gap-3 ps-2">
                  <p className="w-40">DATE</p> :{" "}
                  {format(offer.createdAt, "d MMMM yyyy")}
                </div>
                <div className="flex gap-3 ps-2">
                  <p className="w-40">QUOTE</p> : {offer.quote}
                </div>
                <div className="flex gap-3 ps-2">
                  <p className="w-40">VALIDITY</p> : {offer.validity}
                </div>
              </div>
            </div>
            <Table className="mt-6">
              <TableHeader>
                <TableRow className="h-16 border text-sm font-black">
                  <TableHead className="border text-sm font-bold" rowSpan={2}>
                    No
                  </TableHead>
                  <TableHead className="border text-sm font-bold" rowSpan={2}>
                    Uraian Pekerjaan
                  </TableHead>
                  <TableHead className="border text-sm font-bold" rowSpan={2}>
                    Vol
                  </TableHead>
                  <TableHead className="border text-sm font-bold" rowSpan={2}>
                    Satuan
                  </TableHead>
                  <TableHead
                    className="border text-center text-sm font-bold"
                    colSpan={2}
                  >
                    Material
                  </TableHead>
                  <TableHead
                    className="border text-center text-sm font-bold"
                    colSpan={2}
                  >
                    Harga Satuan
                  </TableHead>
                  <TableHead
                    className="w-[132px] border text-sm font-bold"
                    rowSpan={2}
                  >
                    Total
                  </TableHead>
                </TableRow>
                <TableRow className="h-16 border text-sm font-black">
                  <TableHead className="border text-sm font-bold">
                    Harga Satuan
                  </TableHead>
                  <TableHead className="border text-sm font-bold">
                    Jumlah
                  </TableHead>
                  <TableHead className="border text-sm font-bold">
                    Harga Satuan
                  </TableHead>
                  <TableHead className="border text-sm font-bold">
                    Jumlah
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offerSection.map((offerSection, index) => (
                  <>
                    <TableRow key={index} className="border">
                      <TableCell className="border text-sm font-bold uppercase">
                        {convertToRoman(index + 1)}
                      </TableCell>
                      <TableCell className="border text-sm font-bold uppercase">
                        {offerSection.title}
                      </TableCell>
                    </TableRow>
                    {offerSection.MaterialSection.map((material, i) => (
                      <TableRow key={i} className="border">
                        <TableCell className="border text-sm">
                          {getLetter(i + 1)}
                        </TableCell>
                        <TableCell className="border text-sm">
                          {material.MaterialVariant.Material.name} -{" "}
                          {material.MaterialVariant.name}
                        </TableCell>
                        <TableCell className="border text-sm">
                          {material.quantity}
                        </TableCell>
                        <TableCell className="border text-sm">
                          {material.MaterialVariant.unit}
                        </TableCell>
                        <TableCell className="border text-sm">
                          Rp{" "}
                          {Number(
                            material.MaterialVariant.price,
                          ).toLocaleString("en-EN")}
                        </TableCell>
                        <TableCell className="border text-sm">
                          {material.quantity}
                        </TableCell>
                        <TableCell className="border text-sm">
                          Rp{" "}
                          {Number(
                            material.MaterialVariant.service,
                          ).toLocaleString("en-EN") || "-"}
                        </TableCell>
                        <TableCell className="border text-sm">
                          {material.useService === "true"
                            ? material.quantity
                            : "-"}
                        </TableCell>
                        <TableCell className="border text-sm">
                          Rp{" "}
                          {(material.useService === "true"
                            ? Number(material.MaterialVariant.price) *
                                material.quantity +
                              Number(material.MaterialVariant.service) *
                                material.quantity
                            : Number(material.MaterialVariant.price) *
                              material.quantity
                          ).toLocaleString("en-EN")}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border">
                      <TableCell className="opacity-0">Placholder</TableCell>
                    </TableRow>
                  </>
                ))}
                <TableRow className="border">
                  <TableCell
                    colSpan={8}
                    className="border text-sm font-bold uppercase"
                  >
                    Sub-Total
                  </TableCell>
                  <TableCell className="border text-sm font-bold">
                    Rp {subtotal.toLocaleString("en-EN")}
                  </TableCell>
                </TableRow>
                <TableRow className="border">
                  <TableCell
                    colSpan={8}
                    className="border text-sm font-bold uppercase"
                  >
                    PPN 11%
                  </TableCell>
                  <TableCell className="border text-sm font-bold">
                    Rp {ppn.toLocaleString("en-EN")}
                  </TableCell>
                </TableRow>
                <TableRow className="border">
                  <TableCell
                    colSpan={8}
                    className="border text-sm font-bold uppercase"
                  >
                    TOTAL
                  </TableCell>
                  <TableCell className="border text-sm font-bold">
                    Rp {total.toLocaleString("en-EN")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-12 flex justify-between">
              <div className="flex justify-between space-y-2">
                <div className="w-[520px]">
                  <p className="bg-primary text-center font-bold text-white">
                    TERM & CONDITIONS SALES
                  </p>
                  <p className="">
                    1. Garansi jasa 3 bulan setelah uji fungsi & serah terima
                    syarat berlaku
                  </p>
                  <p>
                    2. Apabila ada pertanyaan terkait Surat Penawaran Harga ini
                    dapat menghubungi muhammad.oka@pln.co.id / 0812-1958-1459.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-end gap-y-40 pe-10 text-center font-bold">
                <div>
                  <p>Approval By:</p>
                  <p>PT HALEYORA POWER</p>
                </div>
                <div>
                  <p>RANDHY KUSRIANSYAH</p>
                  <p>MANAGER UNIT PELAKSANA 6</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
