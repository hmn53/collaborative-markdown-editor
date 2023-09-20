import postgres from "postgres";
import { Checkpoint } from "rushlight-server";

const databaseUrl =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:6472";

const sql = postgres(databaseUrl, { onnotice: () => {} });

await sql`
  CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    version INTEGER NOT NULL
  );
`;

const initialText = `# Collaborative Markdown Editor Demo

This is a collaborative **Markdown** editor shared by all viewers of this page. You can share this link to your friends to collaborate!

Type here, and the output is rendered below. You can see other people's cursors.`;

export async function loadCheckpoint(id: string) {
  let version = 0;
  let doc = initialText;
  const results =
    await sql`SELECT content, version FROM documents WHERE id = ${id}`;
  if (results.length) {
    version = results[0].version;
    doc = results[0].content;
  }
  return { version, doc };
}

export async function saveCheckpoint(id: string, { doc, version }: Checkpoint) {
  await sql`
    INSERT INTO
      documents AS d (id, content, version)
    VALUES
      (${id}, ${doc}, ${version})
    ON CONFLICT (id) DO UPDATE SET
      content = EXCLUDED.content,
      version = EXCLUDED.version
    WHERE
      d.version < ${version}
  `;
}
