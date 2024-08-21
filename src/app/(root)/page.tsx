import Benefits from "@/components/pages/Root/Home/Benefits";
import ElectricSolution from "@/components/pages/Root/Home/ElectricSolution";
import Hero from "@/components/pages/Root/Home/Hero";
import ProductCoreBusiness from "@/components/pages/Root/Home/ProductCoreBusiness";
import ProductToCustomer from "@/components/pages/Root/Home/ProductToCustomer";
import AssetManagement from "@/components/pages/Root/Product/AssetManagement";
import BuildElectricalInstallation from "@/components/pages/Root/Product/BuildElectricalInstallation";
import ServiceScheme from "@/components/pages/Root/Product/ServiceScheme";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCoreBusiness />
      <ProductToCustomer />
      <ElectricSolution />
      <Benefits />
      <AssetManagement />
      <BuildElectricalInstallation />
      <ServiceScheme />
      {/* <Assessment /> */}
      {/* <BuildElectricalInstallation /> */}
      {/* <CTA /> */}
    </>
  );
}
