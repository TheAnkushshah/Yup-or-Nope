"use client"
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import BarChartComponent from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";

function Dashboard() {
    const { setTheme } = useTheme()
    const [SelectedMonth, setSelectedMonth] = useState();
    const [selectedGrade, setSelectedGrade] = useState();
    const [attendanceList, setAttendanceList] = useState();
    const [totalPresentData, setTotalPresentData] = useState([]);

    useEffect(() => {
        GetTotalPresentCountByDay();
        getStudentAttendance();
    }, [SelectedMonth || selectedGrade])

    /**
     * Used to get Student Attendance for given month and date
     */
    const getStudentAttendance = () => {
        GlobalApi.GetAttendanceList(selectedGrade, moment(SelectedMonth).format('MM/yyyy'))
            .then(resp => {
                setAttendanceList(resp.data)
            })
    }

    const GetTotalPresentCountByDay = () => {
        GlobalApi.TotalPresentCountByDay(moment(SelectedMonth).format('MM/yyyy'), selectedGrade)
            .then(resp => {
                setTotalPresentData(resp.data);
            })
    }

    return (
        <div className="p-7">
            <div className="flex justify-between items-center max-sm:flex-col gap-4">
                <h2 className="text-2xl font-bold">Home</h2>
                <p>Built with ❤️ by Haven Futures</p>
                <div className="flex items-center gap-4">
                    <MonthSelection SelectedMonth={setSelectedMonth} />
                    <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
                </div>
            </div>

            <StatusList attendanceList={attendanceList} />

            <div className="grid grid-cols-1 md:flex flex-col gap-5">
                <div className="md:col-span-2">
                    <BarChartComponent attendanceList={attendanceList}
                        totalPresentData={totalPresentData} />
                </div>
                <div>
                    <PieChartComponent attendanceList={attendanceList} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard