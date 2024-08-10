"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import AssementCard from "./AssementCard";

const assetData = [
  {
    level: "Bronze",
    menu: [
      {
        title: "Mapping Data Asset",
        data: [
          { title: "Mapping Data Asset", period: "1 Kali", status: "true" },
        ],
      },
      {
        title: "Pemeliharaan Trafo",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "false",
          },
          {
            title: "Oil Quality Analysis",
            period: "2 Kali / Tahun",
            status: "false",
          },
          {
            title: "Shutdown Maintenance",
            period: "Tahunan",
            status: "false",
          },
        ],
      },
      {
        title: "Pemeliharaan Panel TM",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "false",
          },
          {
            title: "Shutdown Maintanance",
            period: "Tahunan",
            status: "false",
          },
        ],
      },
      {
        title: "Pemeliharaan Panel TR",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "false",
          },
          {
            title: "Shutdown Maintanance",
            period: "Tahunan",
            status: "false",
          },
        ],
      },
      {
        title: "Layanan Konsultasi",
        data: [{ title: "Mapping Data Asset", period: "Free", status: "true" }],
      },
    ],
  },
  {
    level: "Silver",
    menu: [
      {
        title: "Mapping Data Asset",
        data: [
          { title: "Mapping Data Asset", period: "1 Kali", status: "true" },
        ],
      },
      {
        title: "Pemeliharaan Trafo",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Oil Quality Analysis",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Shutdown Maintenance",
            period: "Tahunan",
            status: "false",
          },
        ],
      },
      {
        title: "Pemeliharaan Panel TM",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Shutdown Maintanance",
            period: "Tahunan",
            status: "false",
          },
        ],
      },
      {
        title: "Pemeliharaan Panel TR",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Shutdown Maintanance",
            period: "Tahunan",
            status: "false",
          },
        ],
      },
      {
        title: "Layanan Konsultasi",
        data: [{ title: "Mapping Data Asset", period: "Free", status: "true" }],
      },
    ],
  },
  {
    level: "Gold",
    menu: [
      {
        title: "Mapping Data Asset",
        data: [
          { title: "Mapping Data Asset", period: "1 Kali", status: "true" },
        ],
      },
      {
        title: "Pemeliharaan Trafo",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Oil Quality Analysis",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Shutdown Maintenance",
            period: "Tahunan",
            status: "true",
          },
        ],
      },
      {
        title: "Pemeliharaan Panel TM",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Shutdown Maintanance",
            period: "Tahunan",
            status: "true",
          },
        ],
      },
      {
        title: "Pemeliharaan Panel TR",
        data: [
          {
            title: "Load Reading & Profiling",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Visual Inspection",
            period: "6 Kali / Tahun",
            status: "true",
          },
          {
            title: "Infrared Thermovision",
            period: "3 Kali / Tahun",
            status: "true",
          },
          {
            title: "Partial Discharge",
            period: "2 Kali / Tahun",
            status: "true",
          },
          {
            title: "Shutdown Maintanance",
            period: "Tahunan",
            status: "true",
          },
        ],
      },
      {
        title: "Layanan Konsultasi",
        data: [{ title: "Mapping Data Asset", period: "Free", status: "true" }],
      },
    ],
  },
];

export default function AssetManagement() {
  const pathname = usePathname();
  return (
    <section
      id="asset-management"
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center gap-7 px-6 py-12 lg:px-24",
        pathname === "/" && "bg-primary/5",
      )}
    >
      <h2 className="border-primary ps-3 text-6xl font-semibold text-primary">
        Asset Management
      </h2>
      <p className="max-w-3xl text-center text-lg">
        Paket Manajemen Aset Pelanggan Prioritas. Lorem ipsum, dolor sit amet
        consectetur adipisicing Lorem ipsum dolor sit amet!
      </p>
      <div className="mt-12 grid w-full grid-cols-3 gap-6">
        {assetData.map((item) => (
          <AssementCard key={item.level} level={item.level} menu={item.menu} />
        ))}
      </div>
    </section>
  );
}
