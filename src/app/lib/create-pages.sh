#!/bin/bash

# Define the list of pages as an array of "name:href" pairs
pages=(
  "Contribute to family trust:/payment"
  "Create Project:/create-project"
  "View Projects:/projects"
  "Add family Business:/add-business"
  "List family Businesses:/businesses"
  "Add Achievement:/add-achievement"
  "List Achievements:/achievements"
  "Create Poll:/create-poll"
  "View Polls:/polls"
  "Add Job Post:/add-job"
  "View Job Posts:/jobs"
)

# Base directory for the Next.js app
app_dir="../"

# Loop through each page and create directories and files
for page in "${pages[@]}"; do
  # Split the page into name and href
  name="${page%%:*}"
  href="${page##*:}"

  # Define the file path for the page.js file
  dir_path="${app_dir}${href}"
  file_path="${dir_path}/page.js"

  # Create the directory (including parent directories)
  mkdir -p "$dir_path"

  # Write the default content to page.js
  cat <<EOL > "$file_path"
export default function Page() {
  return <div>${name}</div>;
}
EOL

  echo "Created: $file_path"
done

echo "All pages created successfully!"
