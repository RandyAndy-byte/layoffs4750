'use client';

import { useState, useEffect } from "react";
import {
  TableBody,
} from "@/components/ui/table";
import DialogEdit from "@/components/dialog-edit";

export type LayoffEvent = {
    layoffid: number;
    layoffdate: string;
    companyname: string;
    layoffamount: number;
  };

const localhost = "http://localhost:3000";

export default function TableEntries() {
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
    <TableBody>
      {layoffdata.map((layoffentry: LayoffEvent) => (
        <DialogEdit
          key={layoffentry.layoffid}
          layoffevent={layoffentry}
          entryDeleted={getLayoffData}
        />
      ))}
    </TableBody>
  );
}
