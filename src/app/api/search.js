const { MongoClient } = require("mongodb");
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("details");
    switch (req.method) {
      case "POST":
        let { member } = JSON.parse(req.body);
        let addedMember = await db.collection("members").insertOne(member);
        res.json(addedMember.ops[0]);
        break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
  }

 