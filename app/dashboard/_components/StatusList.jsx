import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({attendanceList}) {
    const [totalStudent,setTotalStudent]=useState(0);
    const [presentPerc,setPresentPerc]=useState(0);

    useEffect(()=>{
      console.log(attendanceList)
        if(attendanceList)
        {
            const totalSt=getUniqueRecord(attendanceList);
            setTotalStudent(totalSt.length);

            const today=moment().format('D');
            const PresentPrec=(attendanceList.length/(totalSt.length*Number(today))*100);
            setPresentPerc(PresentPrec)
        }
    },[attendanceList])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap />} title='Total Students' value={totalStudent}/>
      <Card icon={<TrendingUp />} title='Total Students Present' value={presentPerc.toFixed(1)+"%"}/>
      <Card icon={<TrendingDown />} title='Total Students Absent' value={(100-presentPerc).toFixed(1)+"%"}/>

    
    </div>
  )
}

export default StatusList