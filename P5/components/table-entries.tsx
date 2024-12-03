"use client";

import { useState, useEffect, use } from "react";
import { TableBody } from "@/components/ui/table";
import DialogEdit from "@/components/dialog-edit";
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
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type LayoffEvent = {
  layoffid: number;
  layoffdate: string;
  companyname: string;
  layoffamount: number;
};

const localhost = "http://localhost:3000";

export default function DataTable() {
  const [layoffdata, setLayoffData] = useState<LayoffEvent[]>([]);

  const getLayoffData = async () => {
    const response = await fetch(`${localhost}/api/LayoffEvents`);
    const data = await response.json();
    setLayoffData(data.data);
  };

  useEffect(() => {
    getLayoffData();
  }, []);

  return (
    <div>
      <InsertButton entryInserted={getLayoffData} />
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
        <TableEntries layoffdata={layoffdata} getLayoffData={getLayoffData} />
      </Table>
    </div>
  );
}

type TableEntriesProps = {
  layoffdata: LayoffEvent[];
  getLayoffData: () => void;
};

function TableEntries({ layoffdata, getLayoffData }: TableEntriesProps) {
  const sortedLayoffData = layoffdata.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.layoffdate).getTime();
    const dateB = new Date(b.layoffdate).getTime();

    // Sort in ascending order (oldest to newest)
    return dateA - dateB;
  });

  return (
    <TableBody>
      {}
      {sortedLayoffData.map((layoffentry: LayoffEvent) => (
        <DialogEdit
          key={layoffentry.layoffid}
          layoffevent={layoffentry}
          entryDeleted={getLayoffData}
        />
      ))}
    </TableBody>
  );
}

type InsertButtonProps = {
  entryInserted: () => void;
};

function InsertButton({ entryInserted }: InsertButtonProps) {
  const [companyname, setCompanyName] = useState("");
  const [layoffamount, setLayoffAmount] = useState(0);
  const [layoffdate, setLayoffDate] = useState("");

  const insertEntry = async () => {
    console.log(companyname, layoffamount, layoffdate);
    if (!companyname || !layoffamount || !layoffdate) {
      console.log("Please fill out all fields.");
    } else {
      console.log("Inserting entry...");
      const response = await fetch(`${localhost}/api/LayoffEvents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyname,
          layoffamount,
          layoffdate,
        }),
      });
      const data = await response.json();
      entryInserted();
      console.log(data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500">Got Fired? Let Us Know! </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Entry</DialogTitle>
          <DialogDescription>
            Add a Layoff Event to the database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
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
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="companyname" className="text-right">
              Company
            </Label>
            <Input
              id="companyname"
              defaultValue={companyname}
              onChange={(e) => setCompanyName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
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
            className="bg-green-500"
            onClick={() => insertEntry()}
          >
            Add Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
