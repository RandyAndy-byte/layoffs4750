import { NextRequest, NextResponse } from "next/server"; // v14.x.x
import { createClient } from "@/utils/supabase/server";
// https://dev.to/spencerlepine/get-post-put-delete-with-nextjs-app-router-5do0

export const GET = async (
  req: NextRequest,
  { params, query }: { params: {}; query: {} }
) => {
  const supabase = await createClient();

  console.log("Fetching data from database...");

  const { data: layoffevent, error } = await supabase
    .from("layoffevent")
    .select(
      `
      layoffid, 
      layoffdate, 
      layoffamount,
      ...companies!inner(
        companyname
      )
      `,
    );

  console.log("Data fetched from database:", layoffevent);

  if (error) {
    console.error("Error fetching data from database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  console.log("Serving data to page...");

  return NextResponse.json({ data: layoffevent }, { status: 200 });
};

export const POST = async (
  req: NextRequest,
  { params, query }: { params: { "companyname":string,"layoffdate" : string, "layoffamount" : number}; query: {} }
) => {
  return NextResponse.json({ message: "POST request received" });
};

export const PUT = async (
  req: NextRequest,
  { params, query }: { params: { "id" : number, "layoffdate" : string, "layoffamount" : number }; query: {} }
) => {
  return NextResponse.json({ message: "PUT request received" });
};

export const DELETE = async (
  req: NextRequest,
  { params, query }: { params: { "id" : number }; query: {} }
) => {
    const supabase = await createClient();
    const { data: layoffevent, error } = await supabase.from("layoffevent").delete().eq('layoffid', params.id);
    if (error) {
        console.error("Error deleting data from database:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
    return NextResponse.json({ message: `Deletion of layoff event ${params.id} successful` }, { status: 200 });
};
