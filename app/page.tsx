import Hero from "@/components/hero";
import { ModeToggle } from "@/components/toggle";

import DataTable from "@/components/table-entries";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 mt-4">
            <h2 className="text-2xl font-semibold mr-4">Layoffs4750</h2>
            <ModeToggle />
          </nav>
          <DataTable />
        </div>
      </main>
      <Hero />
    </>
  );
}
