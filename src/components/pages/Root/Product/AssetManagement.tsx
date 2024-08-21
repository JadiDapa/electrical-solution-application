"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import AssementCard from "./AssementCard";

const assetData = [
  {
    level: "Bronze",
    price: "17,500,000",
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
    price: "22,500,000",
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
    price: "35,000,000",
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
      <h2 className="border-primary ps-3 text-center text-4xl font-semibold text-primary md:text-5xl lg:text-start lg:text-6xl">
        Asset Management
      </h2>
      <p className="max-w-3xl text-center lg:text-lg">
        Paket Manajemen Aset Pelanggan Prioritas. Lorem ipsum, dolor sit amet
        consectetur adipisicing Lorem ipsum dolor sit amet!
      </p>
      <div className="mt-12 grid w-full grid-cols-1 gap-6 max-lg:space-y-9 md:grid-cols-2 lg:grid-cols-3">
        {assetData.map((item) => (
          <AssementCard
            key={item.level}
            level={item.level}
            menu={item.menu}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}
