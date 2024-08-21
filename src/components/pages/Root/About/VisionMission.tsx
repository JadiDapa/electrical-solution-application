export default function VisionMission() {
  return (
    <section id="vision-mission" className="relative space-y-12 px-36 py-24">
      <div className="relative flex flex-col items-center gap-12 px-9 lg:flex-row lg:px-24">
        <div className="relative flex-[1] md:block"></div>
        <div className="flex-[2] space-y-4 pb-6 text-end">
          <h2 className="border-r-8 border-primary pe-3 text-6xl font-semibold text-foreground">
            Visi
          </h2>
          <p className="text-3xl font-bold text-primary">
            To Be Global Electricity Network Service Solutions
          </p>
        </div>
      </div>
      <div className="relative flex w-full gap-6 space-y-4 lg:px-24">
        <div className="flex-[1] space-y-4">
          <h2 className="border-l-8 border-primary ps-3 text-6xl font-semibold text-foreground">
            Misi
          </h2>
          <p className="text-2xl font-bold">
            Lead In GENSS With <span className="text-primary">CARE</span>
          </p>
        </div>
        <div className="flex flex-[1] items-center justify-between">
          <ul className="space-y-5">
            <li className="flex items-center gap-5">
              <div className="pr-3 text-5xl font-bold text-primary">1</div>
              <p className="text-lg font-semibold">Customer Focused</p>
            </li>
            <li className="flex items-center gap-5">
              <div className="pr-2 text-5xl font-bold text-primary">2</div>
              <p className="text-lg font-semibold">InnovAtive</p>
            </li>
            <li className="flex items-center gap-5">
              <div className="pr-2 text-5xl font-bold text-primary">3</div>
              <p className="text-lg font-semibold">REliable</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
