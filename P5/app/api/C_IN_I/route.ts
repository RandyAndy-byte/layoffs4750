import { NextRequest, NextResponse } from "next/server"; // v14.x.x
import { createClient } from "@/utils/supabase/server";

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();

  console.log("Fetching data from database...");

  const { data: companyInIndustry, error } = await supabase
    .from("Company_in_Industry")
    .select(`
      companyID,
      industryID
    `);

  console.log("Data fetched from database:", companyInIndustry);

  if (error) {
    console.error("Error fetching data from database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  console.log("Serving data to page...");

  return NextResponse.json({ data: companyInIndustry }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const { companyID, industryID } = await req.json();

  if (!companyID || !industryID) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data: companyInIndustry, error } = await supabase
    .from("Company_in_Industry")
    .insert([{ companyID, industryID }])
    .select();

  if (error) {
    console.error("Error inserting data into database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: `Link between company ${companyID} and industry ${industryID} added successfully`,
      data: companyInIndustry,
    },
    { status: 200 }
  );
};

export const PUT = async (req: NextRequest) => {
  const { companyID, industryID, newIndustryID } = await req.json();

  if (!companyID || !industryID || !newIndustryID) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data: companyInIndustry, error } = await supabase
    .from("Company_in_Industry")
    .update({ industryID: newIndustryID })
    .match({ companyID, industryID })
    .select();

  if (error) {
    console.error("Error updating data in database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: `Updated industry for company ${companyID} from ${industryID} to ${newIndustryID} successfully`,
      data: companyInIndustry,
    },
    { status: 200 }
  );
};

export const DELETE = async (req: NextRequest) => {
  const { companyID, industryID } = await req.json();

  if (!companyID || !industryID) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data: companyInIndustry, error } = await supabase
    .from("Company_in_Industry")
    .delete()
    .match({ companyID, industryID });

  if (error) {
    console.error("Error deleting data from database:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: `Deleted link between company ${companyID} and industry ${industryID} successfully`,
      data: companyInIndustry,
    },
    { status: 200 }
  );
};