import { sendNewFile } from '../../notifications';
import clientPromise from '../../lib/mongo';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log('adding file');
    const client = await clientPromise;
    const json = await req.json();
    console.log(json);
    const db = client.db(process.env.SELECTED_DB);
    await db.collection('files').insertOne(json);
    sendNewFile(json);
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
