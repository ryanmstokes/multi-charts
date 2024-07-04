import Image from "next/image";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("../components/Chart"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Chart />
      </div>
    </main>
  );
}
