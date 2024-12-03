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

export type Industry = {
  industryid: number;
  industryname: string;
  industrygdp: number;
  industrylayoffs: number;
};

const localhost = "http://localhost:3000";

type DialogEditProps = {
  industry: Industry;
  entryDeleted: () => void;
};

export default function DialogEdit({
  industry,
  entryDeleted,
}: DialogEditProps) {
  const [industryGDP, setIndustryGDP] = useState(industry.industrygdp);
  const [industryLayoffs, setIndustryLayoffs] = useState(
    industry.industrylayoffs
  );

  const deleteEntry = async (id: number) => {
    console.log("Deleting entry...");
    const response = await fetch(`${localhost}/api/Industries/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    entryDeleted();
    console.log(data.message);
  };

  const updateEntry = async (id: number, gdp: number, layoffs: number) => {
    console.log("Updating entry...");
    const response = await fetch(`${localhost}/api/Industries/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, gdp, layoffs }),
    });
    const data = await response.json();
    console.log(data.message);
  };

  return (
    <TableRow key={industry.industryid}>
        <TableCell>{industry.industryid}</TableCell>
      <TableCell className="font-medium">{industry.industryname}</TableCell>
      <TableCell>{industryGDP}</TableCell>
      <TableCell className="text-right">{industryLayoffs}</TableCell>
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
                Alter the database entry for this industry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="layoffamount" className="text-right">
                  Layoffs
                </Label>
                <Input
                  id="layoffamount"
                  defaultValue={industryLayoffs}
                  onChange={(e) => setIndustryLayoffs(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gdp" className="text-right">
                  GDP
                </Label>
                <Input
                  id="gdp"
                  defaultValue={industryGDP}
                  onChange={(e) => setIndustryGDP(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() =>
                  updateEntry(industry.industryid, industryGDP, industryLayoffs)
                }
              >
                Save Changes
              </Button>
              <Button
                type="submit"
                variant="destructive"
                onClick={() => deleteEntry(industry.industryid)}
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
