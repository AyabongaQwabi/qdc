import clientPromise from "../../lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);
    const json = await req.json();
    const { id } = json;

    console.log("finding member", id);

    const results = await db
      .collection("members")
      .findOne({"_id": new ObjectId(id)});

    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({message: "Something went wrong"}), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
  }
}
