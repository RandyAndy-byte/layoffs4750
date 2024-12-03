import { NextRequest, NextResponse } from "next/server"; // v14.x.x
import { createClient } from "@/utils/supabase/server";
// https://dev.to/spencerlepine/get-post-put-delete-with-nextjs-app-router-5do0

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();

  console.log("Fetching data from database...");

  const { data: layoffevent, error } = await supabase.from("industries").select(
    `
        industryid,
        industryname,
        industrygdp,
        industrylayoffs
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
  const { industryname, industryGDP } = await req.json();
  const supabase = await createClient();
  const { data: event, error } = await supabase.from("industries").insert([ 
    {
      industryname: industryname,
      industrygdp: industryGDP,
      industrylayoffs: 0,
    },]).select();

  if (error) {
    console.error("Error inserting data into database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: `Entry ${industryname} created` },
    { status: 200 }
  );
};

export const PUT = async (req: NextRequest) => {
  const { id, gdp, layoffs } = await req.json();
  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("industries")
    .update({ industrygdp: gdp, industrylayoffs: layoffs }) 
    .eq("industryid", id)
    .select();
  if (error) {
    console.error("Error updating data in database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: `Update of industry ${id} successful` },
    { status: 200 }
  );
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("industries")
    .delete()
    .eq("industryid", id);
  if (error) {
    console.error("Error deleting data from database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: `Deletion of industry ${id} successful` },
    { status: 200 }
  );
};
