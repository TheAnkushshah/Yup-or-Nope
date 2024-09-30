import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { GRADES, STUDENTS } from '/utils/schema.js'; // Adjust the path to your schema

// Use environment variables to store sensitive credentials
const sql = neon(process.env.DRIZZLE_DATABASE_URL); // Ensure DRIZZLE_DATABASE_URL is set

// Initialize Drizzle ORM with the Neon SQL instance
export const db = drizzle(sql);

// Define an async function to fetch students with their grades
async function fetchGrades() {
  try {
    // Fetch all grades
    const result = await db
      .select({
        id: GRADES.id,
        grade: GRADES.grade,
      })
      .from(GRADES)

    console.log('Grades:', result); // For debugging
    return result;
  } catch (error) {
    console.error('Error fetching grades:', error);
  }
}

// Execute the fetchStudentsWithGrades function
fetchGrades();
