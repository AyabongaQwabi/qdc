#!/bin/bash

# Base directory for API routes
API_DIR="pages/api"

# List of routes in the format "folder/filename"
routes=(
  "payment/create-payment"
  "project/create-project"
  "project/list-projects"
  "business/create-business"
  "business/list-businesses"
  "achievement/add-achievement"
  "achievement/list-achievements"
  "poll/create-poll"
  "poll/list-polls"
  "job/create-job"
  "job/list-jobs"
)

# Template for API route file
create_template() {
  cat <<EOF
import clientPromise from '../../lib/mongo';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.SELECTED_DB);
    const data = await req.json();

    // Perform database action (update as needed)
    await db.collection('${1}').insertOne(data);

    return new Response(
      JSON.stringify({ success: true, message: '${2} successfully.' }),
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

    const items = await db.collection('${1}').find({}).toArray();
    return new Response(
      JSON.stringify({ success: true, data: items }),
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
EOF
}

# Create directories and files
for route in "${routes[@]}"; do
  # Extract folder and filename
  folder=$(dirname "$route")
  filename=$(basename "$route")
  dir="${API_DIR}/${folder}"
  file="${dir}/route.js"
  
  # Ensure directory exists
  mkdir -p "$dir"
  
  # Generate the template based on folder name
  create_template "$folder" "$filename" > "$file"
  
  echo "Created: $file"
done

echo "API route files created successfully!"
