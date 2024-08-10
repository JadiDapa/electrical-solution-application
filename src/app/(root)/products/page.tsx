import AssetManagement from "@/components/pages/Root/Product/AssetManagement";
import BuildElectricalInstallation from "@/components/pages/Root/Product/BuildElectricalInstallation";
import ProductHeader from "@/components/pages/Root/Product/ProductHeader";

export default function Product() {
  return (
    <>
      <ProductHeader />
      <AssetManagement />
      <BuildElectricalInstallation />
    </>
  );
}
