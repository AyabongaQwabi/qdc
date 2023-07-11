const { MongoClient } = require("mongodb");
import clientPromise from "../../lib/mongodb";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("details");
    switch (req.method) {
      case "POST":
        console.log(req.body);
        let member = JSON.parse(req.body);
        let addedMember = await db.collection("members").insertOne(member);
        res.json(addedMember.ops[0]);
        break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
  }

  
 