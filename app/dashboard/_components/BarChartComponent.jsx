import { getUniqueRecord } from '@/app/_services/service';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartComponent({ attendanceList, totalPresentData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        formatAttendanceListCount();
    }, [attendanceList, totalPresentData]);

    const formatAttendanceListCount = () => {
        const totalStudent = getUniqueRecord(attendanceList);

        const result = totalPresentData.map(item => ({
            day: item.day,
            presentCount: item.presentCount,
            absentCount: Number(totalStudent?.length) - Number(item.presentCount),
        }));

        console.log(result);
        setData(result);
    };

    return (
        <div className='p-5 border rounded-lg shadow-sm'>
            <h2 className='my-1 mb-4 font-bold text-lg'>Attendance</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart data={data}>
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        iconType="circle"  // Use circular icons
                        iconSize={12}      // Adjust the size of the icons
                        formatter={(value) => (
                            <span style={{ marginRight: 20 }}>{value}</span>  // Add space between legend items
                        )}
                    />
                    <Bar dataKey="presentCount" name="Total Present" fill="url(#presentGradient)" />
                    <Bar dataKey="absentCount" name="Total Absent" fill="url(#absentGradient)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartComponent;
