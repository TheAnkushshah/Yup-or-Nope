import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { GRADES, STUDENTS } from '/utils/schema.js'; // Adjust the path to your schema

// Use environment variables to store sensitive credentials
const sql = neon(process.env.DRIZZLE_DATABASE_URL); // Ensure DRIZZLE_DATABASE_URL is set

// Initialize Drizzle ORM with the Neon SQL instance
export const db = drizzle(sql);

// Define an async function to fetch grades
async function fetchGrades() {
  console.log('Fetching grades...');
  try {
    const result = await db
      .select({
        id: GRADES.id,
        grade: GRADES.grade,
      })
      .from(GRADES);

    console.log('Grades fetched from database:', result); // Log the fetched grades

    return result;
  } catch (error) {
    console.error('Error fetching grades:', error);
  }
}

// Execute the fetchGrades function
fetchGrades();
