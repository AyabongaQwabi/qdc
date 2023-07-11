
import clientPromise from "../../lib/mongo"
import { NextRequest, NextResponse } from "next/server";



export async function GET(req){
    try {
        const client = await clientPromise;
        const db = client.db(process.env.SELECTED_DB);
        console.log("getting members")
        let members = await db.collection("members").find({}).toArray();
 
        return new NextResponse(JSON.stringify(members), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        return new NextResponse(JSON.stringify({message: "Something went wrong"}), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
 };