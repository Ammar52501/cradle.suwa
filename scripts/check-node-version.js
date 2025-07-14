const [major] = process.versions.node.split(".").map(Number);

if (major < 22) {
  console.error(
    `❌ Required Node.js version >= 22. Current version: ${process.version}`
  );
  process.exit(1);
}
