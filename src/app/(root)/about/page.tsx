import AboutHeader from "@/components/pages/Root/About/AboutHeader";
import AboutUs from "@/components/pages/Root/About/AboutUs";
import Awards from "@/components/pages/Root/About/Awards";
import OperationalArea from "@/components/pages/Root/About/OperationalArea";
import SystemOrder from "@/components/pages/Root/About/SystemOrder";
import VisionMission from "@/components/pages/Root/About/VisionMission";

export default function About() {
  return (
    <>
      <AboutHeader />
      <AboutUs />
      <VisionMission />
      <SystemOrder />
      <Awards />
      <OperationalArea />
    </>
  );
}
