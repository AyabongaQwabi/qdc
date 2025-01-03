import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongo';

export async function POST(req) {
  try {
    const { optionIndex, pollId } = await req.json(); // Parse the request body
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);

    // Find the poll by ID
    const poll = await db
      .collection('poll')
      .findOne({ _id: new ObjectId(pollId) });

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

    console.log(poll);

    // Initialize votes array if not present
    if (!poll.votes) {
      poll.votes = Array(poll.options.length).fill(0);
    }

    // Increment the vote count for the selected option
    const updatedVotes = [...poll.votes];
    updatedVotes[optionIndex] += 1;

    const updatedPoll = await db
      .collection('poll')
      .findOneAndUpdate(
        { _id: new ObjectId(pollId) },
        { $set: { votes: updatedVotes } },
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
