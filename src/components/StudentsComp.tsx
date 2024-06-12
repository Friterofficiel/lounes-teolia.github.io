// src/components/StudentsComp.tsx
import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  house: string;
  alternate_names: string[];
}

const StudentsComp: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [randomStudent, setRandomStudent] = useState<Student | null>(null);
  const [house, setHouse] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [user] = useAuthState(auth);

  if (!user || !['dumbledore@gmail.com', 'profHogwarts@gmail.com'].includes(user.email!)) {
    return <Navigate to="/lounes-teolia.github.io/login" />;
  }

  const fetchStudents = (house?: string, page: number = 1) => {
    let url = `https://lounesapihogwartsteolia.netlify.app/.netlify/functions/real/students?page=${page}`;
    if (house) {
      url += `&house=${house}`;
    }

    axios.get(url)
      .then(response => {
        setStudents(response.data.students);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error("There was an error fetching the students!", error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const getRandomStudent = () => {
    axios.get('https://lounesapihogwartsteolia.netlify.app/.netlify/functions/real/randomstudent')
      .then(response => {
        setRandomStudent(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the random student!", error);
      });
  };

  const handleHouseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHouse = event.target.value;
    setHouse(selectedHouse);
    setPage(1); // Reset to first page on house change
    fetchStudents(selectedHouse, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchStudents(house, newPage);
  };

  return (
    <section id="students" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-8">Liste des élèves</h2>
        <div className="mb-8">
          <label htmlFor="house-select" className="block text-sm font-medium text-gray-700 mb-2">Filter by House:</label>
          <select
            id="house-select"
            value={house}
            onChange={handleHouseChange}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Houses</option>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Hufflepuff">Hufflepuff</option>
            <option value="Ravenclaw">Ravenclaw</option>
            <option value="Slytherin">Slytherin</option>
          </select>
        </div>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white">
            <thead className="bg-yellow-600 text-white">
              <tr>
                <th className="w-1/4 py-2">Nom</th>
                <th className="w-1/4 py-2">Maison</th>
                <th className="w-1/2 py-2">Surnoms</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? students.map(student => (
                <tr key={student.id} className="text-center">
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.house}</td>
                  <td className="border px-4 py-2">
                    {student.alternate_names.length > 0 ? (
                      <ul>
                        {student.alternate_names.map((nickname, index) => (
                          <li key={index}>{nickname}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>None</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="border px-4 py-2 text-center">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
        <button
          onClick={getRandomStudent}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded"
        >
          Get Random Student
        </button>
        {randomStudent && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">Random Student:</h3>
            <p>Name: {randomStudent.name}</p>
            <p>House: {randomStudent.house}</p>
            <p>Alternate Names: {randomStudent.alternate_names.join(', ')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentsComp;
