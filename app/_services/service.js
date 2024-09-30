/**
     * Used to get Distict User List
     * @returns 
     */
export const getUniqueRecord =(attendanceList)=>{
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