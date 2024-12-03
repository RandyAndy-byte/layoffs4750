"use client";

import { useState } from "react";
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
import { ChevronRight } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

export type LayoffEvent = {
  layoffid: number;
  layoffdate: string;
  companyname: string;
  layoffamount: number;
};

const localhost = "http://localhost:3000";

type DialogEditProps = {
  layoffevent: LayoffEvent;
  entryDeleted: () => void;
}

export default function DialogEdit({layoffevent, entryDeleted}: DialogEditProps) {

  const [layoffdate, setLayoffDate] = useState(layoffevent.layoffdate);
  const [layoffamount, setLayoffAmount] = useState(layoffevent.layoffamount);

  const deleteEntry = async (id: number) => {
    console.log("Deleting entry...");
    const response = await fetch(`${localhost}/api/LayoffEvents/`, {
      method: "DELETE",
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    entryDeleted();
    console.log(data.message);
  };

  const updateEntry = async (id: number, amount: number, date: string) => {
    console.log("Updating entry...");
    const response = await fetch(`${localhost}/api/LayoffEvents/`, {
      method: "PUT",
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, amount, date }),
    });
    const data = await response.json();
    console.log(data.message);
  };

  return (
    <TableRow key={layoffevent.layoffid}>
      <TableCell className="font-medium">{layoffevent.layoffid}</TableCell>
      <TableCell>{layoffdate}</TableCell>
      <TableCell>{layoffevent.companyname}</TableCell>
      <TableCell className="text-right">{layoffamount}</TableCell>
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
                  defaultValue={layoffdate}
                  onChange={(e) => setLayoffDate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="layoffamount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="layoffamount"
                  defaultValue={layoffamount}
                  onChange={(e) => setLayoffAmount(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => updateEntry(layoffevent.layoffid, layoffamount, layoffdate)}
              >
                Save Changes
              </Button>
              <Button
                type="submit"
                variant="destructive"
                onClick={() => deleteEntry(layoffevent.layoffid)}
              >
                Delete Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
