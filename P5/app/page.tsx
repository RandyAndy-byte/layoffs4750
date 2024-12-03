import Hero from "@/components/hero";
import { ModeToggle } from "@/components/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/components/table-entries";
import DataTableI from "@/components/id";

export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 mt-4">
            <h2 className="text-2xl font-semibold mr-4">Layoffs4750</h2>
            <ModeToggle />
          </nav>
          <Tabs defaultValue="layoffevent" className="w-[700px]">
            <TabsList>
              <TabsTrigger value="layoffevent">Layoff Events</TabsTrigger>
              <TabsTrigger value="industries">Industries</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="ci">Companies' Industries</TabsTrigger>
            </TabsList>
            <TabsContent value="layoffevent">
              <DataTable />
            </TabsContent>
            <TabsContent value="industries">
              <DataTableI />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Hero />
    </>
  );
}
