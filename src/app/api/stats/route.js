import clientPromise from "../../lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import { postWhatsappMessageToFamilyGroup } from "@/app/notifications";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);
    console.log("getting members");
    let members = await db.collection("members").find({}).toArray();

    // sort all members by age using date of birth

    const sortedMembers = members.sort((a, b) => {
      console.log("A: ", a.dateOfBirth.dateStr, "B: ", b.dateOfBirth.dateStr);
      const aAge = moment(new Date()).diff(a.dateOfBirth.dateStr, "years");
      const bAge = moment(new Date()).diff(b.dateOfBirth.dateStr, "years");
      return bAge - aAge;
    });
    const membersWhoAreDecesed = sortedMembers.filter(
      (member) => member.isAlive === "false"
    );
    const membersWhoAreNotDecesed = sortedMembers.filter(
      (member) => member.isAlive === "true"
    );
    const membersWhoAreRetired = membersWhoAreNotDecesed.filter(
      (member) => member.currentStatus === "retired"
    );
    const membersWhoArePensioners = membersWhoAreNotDecesed.filter(
      (member) => member.currentStatus === "pensioner"
    );
    const membersWhoAreEmployed = membersWhoAreNotDecesed.filter(
        (member) => member.currentStatus === "employed"
        );
    const membersWhoAreUnemployed = membersWhoAreNotDecesed.filter(
        (member) => member.currentStatus === "unemployed"
        );
    const membersWhoAreBusinessOwners = membersWhoAreNotDecesed.filter(
      (member) => member.currentStatus === "business"
    );
    const children = membersWhoAreNotDecesed.filter(
      (member) =>{
        const age = moment().diff(
          moment(member.dateOfBirth.dateStr, "DD/MM/YYYY"),
          "years"
        )
        return age <= 18;
      }
    );
    const youngAdults = membersWhoAreNotDecesed.filter(
      (member) =>{
        const age = moment().diff(
          moment(member.dateOfBirth.dateStr, "DD/MM/YYYY"),
          "years"
        )
        return age >= 19 && age <= 40
      }
        
    );
    const adults = membersWhoAreNotDecesed.filter(
      (member) =>{
        const age = moment().diff(
          moment(member.dateOfBirth.dateStr, "DD/MM/YYYY"),
          "years"
        )
        return age >= 41 && age <= 60
      }
    );
    const elders = membersWhoAreNotDecesed.filter(
      (member) => {
        const age = moment().diff(
          moment(member.dateOfBirth.dateStr, "DD/MM/YYYY"),
          "years"
        )
        return age >= 61;
      }
    );
    const youngAdultsWhoAreEmployed = youngAdults.filter(
      (member) => member.currentStatus === "employed"
    );
    const youngAdultsWhoAreUnemployed = youngAdults.filter(
      (member) => member.currentStatus === "unemployed"
    );
    const youngAdultsWhoAreStudents = youngAdults.filter(
      (member) => member.currentStatus === "university"
    );

    const statsMessage = `
        *Information about family members in our database:*

        *Total Family Members:* ${sortedMembers.length}
        *Deceased:* ${membersWhoAreDecesed.length}
        *Living:* ${membersWhoAreNotDecesed.length}

        ---
        
        *Children:* ${children.length}
        *Young Adults:* ${youngAdults.length}
        *Adults:* ${adults.length}
        *Elders:* ${elders.length}

        ---

        *Retired:* ${membersWhoAreRetired.length}
        *Pensioners:* ${membersWhoArePensioners.length}
        *Employed:* ${membersWhoAreEmployed.length}
        *Unemployed:* ${membersWhoAreUnemployed.length}

        ---

        *Business owners:* ${membersWhoAreBusinessOwners.length}

        ---

        *Young Adults:*
        
        *Employed:* ${youngAdultsWhoAreEmployed.length}
        *Unemployed:* ${youngAdultsWhoAreUnemployed.length}
        *In University or College:* ${youngAdultsWhoAreStudents.length}
        
        `;
    postWhatsappMessageToFamilyGroup(statsMessage)

    return new NextResponse(JSON.stringify(sortedMembers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
