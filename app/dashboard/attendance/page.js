'use client';

import GradeSelect from '@/app/_components/GradeSelect';
import MonthSelection from '@/app/_components/MonthSelection';
import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import React, { useState } from 'react';
import AttendanceGrid from './_components/AttendanceGrid';

function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedGrade, setSelectedGrade] = useState();
    const [attendanceList, setAttendanceList] = useState([]);

    /**
     * Used to fetch attendance list for the given month and Grade
     */
    const onSearchHandler = () => {
        const month = moment(selectedMonth).format('MM/YYYY');
        GlobalApi.GetAttendanceList(selectedGrade, month).then(resp => {
            setAttendanceList(resp.data);
        });
    };

    return (
        <div className='p-7'>
            <h2 className='text-2xl font-bold'>Attendance</h2>

            {/* Search options */}
            <div className='flex gap-5 my-4 p-5 border rounded-lg shadow-sm max-lg:flex-col max-sm:flex-col'>
                <div className='flex items-center gap-3'>
                    <label>Select Month</label>
                    <MonthSelection SelectedMonth={(value) => setSelectedMonth(value)} />
                </div>
                <div className='flex gap-3 items-center'>
                    <label>Select Grade</label>
                    <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
                </div>

                {/* Button with hover color as the main color */}
                <Button 
                    onClick={() => onSearchHandler()}
                    className='bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold 
                    transition-all duration-300 ease-in-out transform hover:scale-105'
                >
                    Search
                </Button>
            </div>

            {/* Student Attendance Grid */}
            <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} />
        </div>
    );
}

export default Attendance;
