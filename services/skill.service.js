import { sql } from "@vercel/postgres";

export async function getSkills() {
  const { rows } = await sql`
        SELECT * 
        FROM cv
      `;
  return rows;
}

export async function searchSkills({ searchTerm }) {
  const { rows } = await sql`
        SELECT * 
        FROM cv
        WHERE similarity(title, ${searchTerm}) > 0.15
           OR similarity(description::text, ${searchTerm}) >
              char_length(${searchTerm})::float / (char_length(description)::float*1.5)
           OR similarity(company, ${searchTerm}) > 0.2
      `;
  return rows;
}
