"use client"

import React, { useEffect, useState } from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_components/StudentListTable';

function Student() {

  const [studentList,setStudentList]=useState([]);
  useEffect(()=>{
    GetAllStudents();
  },[])
  /**
   * Used to Get All Students
   */
  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then(resp=>{
      setStudentList(resp.data);
    })
  }
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center max-sm:flex-col gap-2'>Students<AddNewStudent refreshData={GetAllStudents}/></h2>
        <p className='mb-4 max-sm:mt-4'>Built with ❤️ by Haven Futures</p>
        <StudentListTable studentList={studentList} 
        refrestData={GetAllStudents}/>
    </div>
  )
}

export default Student