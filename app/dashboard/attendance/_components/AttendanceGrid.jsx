import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

const pagination = true;
const paginationPageSize = 13;
const paginationPageSizeSelector = [14, 28, 56, 112];

function AttendanceGrid({ attendanceList, selectedMonth }) {


    const [rowData, setRowData] = useState();
    const [coldefs, setColDefs] = useState([
        { field: 'studentId', filter: true },
        { field: 'name', filter: true },
    ])

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberOfDays = daysInMonth(moment(selectedMonth).year(), moment(selectedMonth).month())
    const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1)

    useEffect(() => {
        setColDefs([
            { field: 'studentId', filter: true },
            { field: 'name', filter: true },
        ]);
        if (attendanceList) {
            const userList = getUniqueRecord();
            setRowData(userList);

            daysArrays.forEach((date) => {
                setColDefs(prevData => [...prevData, {
                    field: date.toString(), width: 70, editable: true
                }])

                userList.forEach(obj => {
                    obj[date] = isPresent(obj.studentId, date)
                })
            })
        }
    }, [attendanceList])

    /**
     * Used to get Distict User List
     * @returns 
     */
    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();

        attendanceList?.forEach(record => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
        });

        return uniqueRecord;
    }

    /**
     * Used to check if user present or not
     * @param {*} studentId 
     * @param {*} day 
     * @returns 
     */
    const isPresent = (studentId, day) => {
        const result = attendanceList.find(item => item.day == day && item.studentId == studentId)
        return result ? true : false
    }


    /**
     * Used to mark student attendance
     * @param {*} day 
     * @param {*} studentId 
     * @param {*} presentStatus 
     */
    const onMarkAttendance = (day, studentId, presentStatus) => {

        const date = moment(selectedMonth).format('MM/yyyy')
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date
            }

            GlobalApi.MarkAttendance(data).then(resp => {
                console.log(resp);
                toast(`Student Id: ${studentId} Successfully marked as present 🎉`)
            })
        }
        else {
            GlobalApi.MarkAbsent(studentId, day, date)
                .then(resp => {
                    toast(`Student Id: ${studentId} Successfully marked as absent 🎉`)
                })
        }
    }


    return (
        <div>
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 662 }} // the Data Grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={coldefs}
                    onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    )
}

export default AttendanceGrid