import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

function PieChartComponent({ attendanceList }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(attendanceList);
    if (attendanceList) {
      // Get unique total students
      const totalStudents = getUniqueRecord(attendanceList).length;
      // Get total days of attendance recorded
      const totalDays = attendanceList.length;

      // Calculate number of present students
      const presentCount = attendanceList.filter(record => record.present === true).length;

      // Calculate present percentage
      const presentPercentage = totalStudents > 0 ? (presentCount / (totalStudents * totalDays)) * 100 : 0;
      // Calculate absent percentage
      const absentPercentage = 100 - presentPercentage;

      setData([
        {
          name: 'Present',  // Optional: can be removed as it won't be shown
          fill: "url(#presentGradient)",
          value: Number(presentPercentage.toFixed(1)),
        },
        {
          name: 'Absent',  // Optional: can be removed as it won't be shown
          value: Number(absentPercentage.toFixed(1)),
          fill: "url(#absentGradient)",
        },
      ]);
    }
  }, [attendanceList]);

  // Custom label function to only display percentage
  const renderLabel = (entry) => `${entry.value}%`;

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='my-1 font-bold text-lg'>Monthly Attendance</h2>
      <ResponsiveContainer width={'100%'} height={312}>
        <PieChart width={730} height={250}>
          <Pie 
            data={data} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            innerRadius={60} 
            outerRadius={80} 
            label={renderLabel} // Use the custom label function
          />
          <defs>
            {/* Gradient for Present Count */}
            <linearGradient id="presentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#42A5F5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#64B5F6', stopOpacity: 1 }} />
            </linearGradient>
            {/* Gradient for Absent Count */}
            <linearGradient id="absentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f94449', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f47c7c', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
