import React, { useEffect, useState } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ attendanceList }) {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (attendanceList) {
      // Get unique student IDs
      const uniqueStudents = new Set(attendanceList.map(record => record.studentId));
      const totalStudentsCount = uniqueStudents.size; // Total unique students
      setTotalStudent(totalStudentsCount);

      // Calculate the number of present students
      const presentCount = attendanceList.filter(record => record.present).length; // Count of present students

      // Calculate Present and Absent Percentage
      const PresentPrec = totalStudentsCount > 0 ? (presentCount / (totalStudentsCount * attendanceList.length)) * 100 : 0; // Prevent division by zero
      const AbsentPerc = 100 - PresentPrec; // Absent percentage

      // Set the percentages
      setPresentPerc(PresentPrec);

      // Debugging logs
      console.log('Total Students:', totalStudentsCount);
      console.log('Total Present Students:', presentCount);
      console.log('Present Percentage:', PresentPrec);
      console.log('Absent Percentage:', AbsentPerc);
    }
  }, [attendanceList]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap />} title='Total Students' value={totalStudent} />
      <Card icon={<TrendingUp />} title='Total Students Present' value={presentPerc.toFixed(1) + "%"} />
      <Card icon={<TrendingDown />} title='Total Students Absent' value={(100 - presentPerc).toFixed(1) + "%"} />
    </div>
  );
}

export default StatusList;
