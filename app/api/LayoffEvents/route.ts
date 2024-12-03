import { NextRequest, NextResponse } from "next/server"; // v14.x.x
import { createClient } from "@/utils/supabase/server";
// https://dev.to/spencerlepine/get-post-put-delete-with-nextjs-app-router-5do0

export const GET = async (req: NextRequest) => {
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
      `
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

export const POST = async (req: NextRequest) => {
  const { companyname, layoffamount, layoffdate } = await req.json();
  const supabase = await createClient();
  const { data: layoffevent, error } = await supabase.rpc("new_insertlayoffevent", {
    p_companyname: companyname,
    p_layoffamount: parseInt(layoffamount),
    p_layoffdate: layoffdate
  });

  if (error) {
    console.error("Error inserting data into database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: `Entry on ${layoffdate} added for ${companyname}` },
    { status: 200 }
  );
};

export const PUT = async (req: NextRequest) => {
  const { id, amount, date } = await req.json();
  const supabase = await createClient();
  const { data: layoffevent, error } = await supabase
    .from("layoffevent")
    .update({ layoffamount: amount, layoffdate: date })
    .eq("layoffid", id)
    .select();
  if (error) {
    console.error("Error updating data in database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: `Update of layoff event ${id} successful` },
    { status: 200 }
  );
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  const supabase = await createClient();
  const { data: layoffevent, error } = await supabase
    .from("layoffevent")
    .delete()
    .eq("layoffid", id);
  if (error) {
    console.error("Error deleting data from database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: `Deletion of layoff event ${id} successful` },
    { status: 200 }
  );
};
