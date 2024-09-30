import { getUniqueRecord } from '@/app/_services/service'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent({attendanceList}) {
    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
    ]
    const [data,setData]=useState([])

    useEffect(()=>{
        console.log(attendanceList)
        if(attendanceList)
        {
            const totalSt=getUniqueRecord(attendanceList);
            const today=moment().format('D');
            const PresentPrec=(attendanceList.length/(totalSt.length*Number(today))*100);
            setData([
                {
                    name:'Total Student Present',
                    fill:"url(#presentGradient)",
                    value:Number(PresentPrec.toFixed(1))
                },
                {
                    name:'Total Student Absent',
                    value:(100-Number(PresentPrec.toFixed(1))),
                    fill:"url(#absentGradient)"
                },
            ])
        }
    },[attendanceList])

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='my-1 font-bold text-lg'>Monthly Attendance</h2>
            <ResponsiveContainer width={'100%'} height={312}>
                <PieChart width={730} height={250}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
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
    )
}

export default PieChartComponent