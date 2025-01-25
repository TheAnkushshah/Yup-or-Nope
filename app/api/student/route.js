import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const data = await req.json();

    // Validation: Ensure required fields are present
    if (!data?.name || !data?.grade || !data?.sectionandStream || !data?.rollnumber) {
      return NextResponse.json(
        { error: "Missing required fields: name, grade, sectionandStream, or rollnumber." },
        { status: 400 }
      );
    }

    // If sectionandStream is null or empty, return an error
    if (!data?.sectionandStream) {
      return NextResponse.json(
        { error: "sectionandStream cannot be null or empty." },
        { status: 400 }
      );
    }

    // Insert the student data into the database
    const result = await db
      .insert(STUDENTS)
      .values({
        name: data.name,
        grade: data.grade,
        sectionandStream: data.sectionandStream,  // Ensure this is non-null
        rollnumber: data.rollnumber,
        address: data?.address || null, // Optional field
        contact: data?.contact || null, // Optional field
      });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error inserting student:", error);
    return NextResponse.json(
      { error: "Failed to insert student" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const result = await db.select().from(STUDENTS);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Missing student ID in query parameters." },
        { status: 400 }
      );
    }

    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, id));

    if (result.count === 0) {
      return NextResponse.json(
        { error: "No student found with the given ID." },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
