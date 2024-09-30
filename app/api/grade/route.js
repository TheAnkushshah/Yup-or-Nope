import { db } from "@/utils";
import { GRADES, STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req){
    const result=await db
      .select({
        id: GRADES.id,
        grade: GRADES.grade
      })
      .from(GRADES)
      .leftJoin(STUDENTS, GRADES.grade === STUDENTS.grade);
   return NextResponse.json(result);
}