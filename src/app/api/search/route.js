import clientPromise from "../../lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);
    const json = await req.json();
    const { member } = json;
    console.log("finding member", member);

    const results = await db
      .collection("members")
      .find({$or: [
        {firstName: { $regex: member, $options: "i" }},
        {secondName: { $regex: member, $options: "i" }},
        {surname: { $regex: member, $options: "i" }},
      ]})
      .toArray();

    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new NextResponse(JSON.stringify({message: "Something went wrong"}), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
  }
}
