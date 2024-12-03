import { NextRequest, NextResponse } from "next/server"; // v14.x.x
import { createClient } from "@/utils/supabase/server";

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();

  console.log("Fetching data from database...");

  const { data: companies, error } = await supabase
    .from("Companies")
    .select(`
      companyID, 
      companyName, 
      numEmployees, 
      numLayoffs, 
      revenue
    `);

  console.log("Data fetched from database:", companies);

  if (error) {
    console.error("Error fetching data from database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  console.log("Serving data to page...");

  return NextResponse.json({ data: companies }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const { companyName, numEmployees, revenue } = await req.json();

  if (!companyName || !numEmployees || !revenue) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data: company, error } = await supabase
    .from("Companies")
    .insert([
      { companyName, numEmployees, revenue }
    ])
    .select();

  if (error) {
    console.error("Error inserting data into database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: `Company ${companyName} added successfully`, data: company },
    { status: 200 }
  );
};

export const PUT = async (req: NextRequest) => {
  const { companyID, numEmployees, revenue } = await req.json();

  if (!companyID || (!numEmployees && !revenue)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const updates = { ...(numEmployees && { numEmployees }), ...(revenue && { revenue }) };
  const { data: company, error } = await supabase
    .from("Companies")
    .update(updates)
    .eq("companyID", companyID)
    .select();

  if (error) {
    console.error("Error updating data in database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: `Company ${companyID} updated successfully`, data: company },
    { status: 200 }
  );
};

export const DELETE = async (req: NextRequest) => {
  const { companyID } = await req.json();

  if (!companyID) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data: company, error } = await supabase
    .from("Companies")
    .delete()
    .eq("companyID", companyID);

  if (error) {
    console.error("Error deleting data from database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: `Company ${companyID} deleted successfully`, data: company },
    { status: 200 }
  );
};