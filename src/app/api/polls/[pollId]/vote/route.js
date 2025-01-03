import clientPromise from '../../../lib/mongo';

export async function POST(req, { params }) {
  const { pollId } = params; // Extract poll ID from the URL
  try {
    const { optionIndex } = await req.json(); // Parse the request body
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);

    // Find the poll and update the vote count
    const poll = await db.collection('poll').findOne({ _id: pollId });
    if (!poll) {
      return new Response(
        JSON.stringify({ success: false, message: 'Poll not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid option index' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Increment the vote count for the selected option
    const updatedPoll = await db
      .collection('polls')
      .findOneAndUpdate(
        { _id: pollId },
        { $inc: { [`options.${optionIndex}.votes`]: 1 } },
        { returnDocument: 'after' }
      );

    return new Response(
      JSON.stringify({ success: true, data: updatedPoll.value }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error occurred while voting',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
