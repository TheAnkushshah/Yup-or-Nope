import { db } from "@/utils";
import { GRADES, STUDENTS } from "@/utils/schema";
import { eq } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log('GET request received for grades'); // Log the request

  try {
    console.log('Executing query with:', GRADES); // Log schema for debugging
    
    // Simplified query to check if the grades table has data
    const result = await db
      .select({
        id: GRADES.id,
        grade: GRADES.grade,
      })
      .from(GRADES)
      .execute(); // Execute the query directly

    console.log('Grades fetched from database:', result); // Log the result
    
    if (result.length === 0) {
      console.log('No grades found in the database');
    } else {
      console.log('Grades fetched successfully:', result);
    }
    
    return NextResponse.json(result); // Return the response in JSON format
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}