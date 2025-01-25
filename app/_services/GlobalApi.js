import axios from 'axios';

const BASE_URL = '/api';

const GlobalApi = {
  GetAllGrades: () => axios.get(`${BASE_URL}/grade`),
  CreateNewStudent: (data) => axios.post(`${BASE_URL}/student`, data),
  GetAllStudents: () => axios.get(`${BASE_URL}/student`),
  DeleteStudentRecord: (id) => axios.delete(`${BASE_URL}/student?id=${id}`),
  GetAttendanceList: (grade, month) => axios.get(`${BASE_URL}/attendance?grade=${grade}&month=${month}`),
  MarkAttendance: (data) => axios.post(`${BASE_URL}/attendance`, data),
  MarkAbsent: (studentId, day, date) => axios.delete(`${BASE_URL}/attendance?studentId=${studentId}&day=${day}&date=${date}`),
  TotalPresentCountByDay: (date, grade) => axios.get(`${BASE_URL}/dashboard?date=${date}&grade=${grade}`),
};

export default GlobalApi;