# Remove old main.js
rm public/main.js
# Concatenate all js files
find public/assets/config.jsx public/assets/shared public/assets/components public/assets/routes.jsx | grep '.jsx' | while read file; do cat $file >> public/main.js; done;
# Start server
node index.js
