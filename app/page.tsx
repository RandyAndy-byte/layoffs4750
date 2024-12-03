import Hero from "@/components/hero";
import { ModeToggle } from "@/components/toggle";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogEdit from "@/components/dialog-edit";
import { LayoffEvent } from "@/components/dialog-edit";

const localhost = "http://localhost:3000";

export default async function Index() {
  const layoffresponse = await fetch(`${localhost}/api/LayoffEvents`);
  const layoffdata = await layoffresponse.json();
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 mt-4">
            <h2 className="text-2xl font-semibold mr-4">Layoffs4750</h2>
            <ModeToggle />
          </nav>
          <Table>
            <TableCaption>Recent Layoff Events</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[200px]">Date</TableHead>
                <TableHead className="w-[300px]">Company</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layoffdata.data.map((layoffevent : LayoffEvent) => (
                <DialogEdit key={layoffevent.layoffid} {...layoffevent} />
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Hero />
    </>
  );
}
