import Hero from "@/components/hero";
import { ModeToggle } from "@/components/toggle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react"

const localhost = "http://localhost:3000";

type LayoffEvent = {
  layoffid: string;
  layoffdate: string;
  companyname: string;
  layoffamount: number;
};

function updateEntry() {
  console.log("Updating entry...");
}
function deleteEntry() {
  console.log("Deleting entry...");
} 

function getTableRows(data: Array<LayoffEvent>) {
  return (
    <TableBody>
      {data.map((layoffevent: LayoffEvent) => (
        <TableRow key={layoffevent.layoffid}>
          <TableCell className="font-medium">{layoffevent.layoffid}</TableCell>
          <TableCell>{layoffevent.layoffdate}</TableCell>
          <TableCell>{layoffevent.companyname}</TableCell>
          <TableCell className="text-right">
            {layoffevent.layoffamount}
          </TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                  <ChevronRight />
              </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Entry</DialogTitle>
                  <DialogDescription>
                    Alter the database entry for this layoff event.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="layoffdate" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="layoffdate"
                      defaultValue={layoffevent.layoffdate}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="layoffamount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="layoffamount"
                      defaultValue={layoffevent.layoffamount}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={updateEntry}>Save Changes</Button>
                  <Button type="submit" variant="destructive" onClick={deleteEntry}>Delete Entry</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

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
            {getTableRows(layoffdata.data)}
          </Table>
        </div>
      </main>
      <Hero />
    </>
  );
}
