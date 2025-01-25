import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 15;
const paginationPageSizeSelector = [15, 25, 50, 100];

function StudentListTable({ studentList, refreshData }) {

    const CustomButons = (props) => {
        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant="destructive" className="h-8 mt-1">
                        <Trash className='h-5' />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your action cannot be undone, and will permanently delete the student :(
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-black text-white border border-gray-300 hover:bg-gray-800"
                            onClick={() => DeleteRecord(props?.data?.id)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    const [colDefs, setColDefs] = useState([
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "grade", filter: true },
        { field: "sectionandStream", headerName: "Section & Stream", filter: true },
        { field: "rollnumber", headerName: "Roll Number", filter: true },
        { field: "address", filter: true },
        { field: "contact", filter: true },
        { field: 'action', cellRenderer: CustomButons }
    ]);

    const [rowData, setRowData] = useState();
    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        studentList && setRowData(studentList);
    }, [studentList]);

    const DeleteRecord = (id) => {
        GlobalApi.DeleteStudentRecord(id).then(resp => {
            if (resp) {
                toast('Student deleted successfully 🎉');
                refreshData();
            }
        });
    };

    return (
        <div className='my-3 mb-[4.2rem]'>
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 685 }} // the Data Grid will fill the size of the parent container
            >
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm max-sm:mb-6'>
                    <Search />
                    <input
                        type="text"
                        placeholder='Search on Anything...'
                        className='outline-none w-full bg-white text-black'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default StudentListTable;
