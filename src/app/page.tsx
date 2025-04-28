import Hero from "@/components/Home/Hero";
import WebHostingPlan from "@/components/Home/WebHostingPlan";

export default function Home() {
  return (
    <section>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold">
        Choose Your Hosting Plan
      </h2>
      <div className="container m-auto flex justify-items-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
}
