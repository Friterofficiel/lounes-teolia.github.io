// src/components/Dashboard.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

// Interface pour définir le type d'un étudiant
interface Student {
  house: string;
  alternate_names: string[];
}

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user] = useAuthState(auth);

  if (!user || !['dumbledore@gmail.com', 'profHogwarts@gmail.com'].includes(user.email!)) {
    return <Navigate to="/lounes-teolia.github.io/login" />;
  }
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`https://lounesapihogwartsteolia.netlify.app/.netlify/functions/real/students?page=${page}`);
        setStudents(response.data.students);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [page]);

  // Initialisation des compteurs avec des types appropriés
  const houseCounts: { [key: string]: number } = students.reduce((acc: { [key: string]: number }, student: Student) => {
    acc[student.house] = (acc[student.house] || 0) + 1;
    return acc;
  }, {});

  const houseData = Object.keys(houseCounts).map(house => ({
    name: house,
    value: houseCounts[house]
  }));

  const nameAlternateCounts: { [key: string]: number } = students.reduce((acc: { [key: string]: number }, student: Student) => {
    if (student.alternate_names.length > 0) {
      acc['With Alternate Names'] = (acc['With Alternate Names'] || 0) + 1;
    } else {
      acc['Without Alternate Names'] = (acc['Without Alternate Names'] || 0) + 1;
    }
    return acc;
  }, {});

  const nameAlternateData = Object.keys(nameAlternateCounts).map(key => ({
    name: key,
    value: nameAlternateCounts[key]
  }));

  const HOUSE_COLORS = {
    Gryffindor: ['#7F0909', '#FFC500'], // Rouge et Or
    Ravenclaw: ['#2A623D'], // Bleu Foncé
    Slytherin: ['#FFDB00'], // Vert
    Hufflepuff: ['#0E1A40'], // Jaune
  };

  const COLORS = [
    HOUSE_COLORS.Gryffindor[0],
    HOUSE_COLORS.Ravenclaw[0],
    HOUSE_COLORS.Slytherin[0],
    HOUSE_COLORS.Hufflepuff[0],
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-yellow-600 mb-8">Hogwarts Students Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Distribution by House</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={houseData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {houseData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Students per House</h2>
          <BarChart width={500} height={300} data={houseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {houseData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 mt-8">
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Students with Alternate Names</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={nameAlternateData}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={150}
            fill="#82ca9d"
            dataKey="value"
          >
            {nameAlternateData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-lg font-medium text-gray-700">Page {page} of {totalPages}</span>
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
