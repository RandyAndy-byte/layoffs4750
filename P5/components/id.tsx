"use client";

import { useState, useEffect} from "react";
import { TableBody } from "@/components/ui/table";
import DialogEdit from "@/components/i";
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
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Industry = {
    industryid: number;
    industryname: string;
    industrygdp: number;
    industrylayoffs: number;
  };

const localhost = "http://localhost:3000";

export default function DataTableI() {
  const [layoffdata, setLayoffData] = useState<Industry[]>([]);

  const getLayoffData = async () => {
    const response = await fetch(`${localhost}/api/Industries`);
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
        <TableCaption>Industries</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">GDP</TableHead>
            <TableHead className="text-right">Layoffs</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableEntries layoffdata={layoffdata} getLayoffData={getLayoffData} />
      </Table>
    </div>
  );
}

type TableEntriesProps = {
  layoffdata: Industry[];
  getLayoffData: () => void;
};

function TableEntries({ layoffdata, getLayoffData }: TableEntriesProps) {
  return (
    <TableBody>
      {}
      {layoffdata.map((layoffentry: Industry) => (
        <DialogEdit
          key={layoffentry.industryid}
          industry={layoffentry}
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
  const [industryName, setIndustryName] = useState("");
  const [layoffamount, setLayoffAmount] = useState(0);
  const [gdp, setGDP] = useState(0);

  const insertEntry = async () => {
    console.log(industryName, layoffamount, gdp);
    if (!industryName || !layoffamount || !gdp) {
      console.log("Please fill out all fields.");
    } else {
      console.log("Inserting entry...");
      const response = await fetch(`${localhost}/api/Industries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industryName,
          gdp,
          layoffamount,
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
        <Button className="bg-yellow-500"> We missed one? Tell Us! </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Entry</DialogTitle>
          <DialogDescription>
            Add a Layoff Event to the database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="industryname" className="text-right">
              Industry Name
            </Label>
            <Input
              id="industryname"
              defaultValue={industryName}
              onChange={(e) => setIndustryName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="gdp" className="text-right">
              GDP
            </Label>
            <Input
              id="gdp"
              defaultValue={gdp}
              onChange={(e) => setGDP(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="layoffamount" className="text-right">
              Layoffs
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
