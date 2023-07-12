
import clientPromise from "../../lib/mongo"
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";


export async function POST(req){
    try {
        const client = await clientPromise;
        const db = client.db(process.env.SELECTED_DB);
        console.log("getting members")
        let members = await db.collection("members").find({}).toArray();

        // sort all members by age using date of birth

        const sortedMembers = members.sort((a, b) => {
            const aAge = moment().diff(a.dateOfBirth.dateStr, 'years');
            const bAge = moment().diff(b.dateOfBirth.dateStr, 'years');
            return bAge - aAge;
        });
 
        return new NextResponse(JSON.stringify(sortedMembers), {
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