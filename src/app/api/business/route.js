import clientPromise from '../../lib/mongo';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);
    const data = await req.json();

    // Perform database action (update as needed)
    await db.collection('business').insertOne(data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'list-businesses successfully.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);

    const items = await db.collection('business').find({}).toArray();
    return new Response(JSON.stringify({ success: true, data: items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
