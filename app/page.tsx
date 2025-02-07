"use client";

import Card from "@/components/Card";
import { FormEvent, useState } from "react";

interface User {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  phone: string;
  picture: {
    large: string;
  };
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userCount, setUserCount] = useState(5);


  const fetchUsers = async (page: number, count: number) => {
    const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${count}`);
    const data = await response.json();
    setUsers(data.results);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const count = Number(formData.get("data"));

    if (!count || count <= 0) {
      alert("Please enter a valid number of users.");
      return;
    }

    setUserCount(count);
    setCurrentPage(1);
    fetchUsers(1, count);
  };


  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = prev + 1;
      fetchUsers(newPage, userCount);
      return newPage;
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        const newPage = prev - 1;
        fetchUsers(newPage, userCount);
        return newPage;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-center mb-6">User Generator</h1>


      <div className="w-full max-w-xl bg-white p-5 rounded-xl shadow-md border border-gray-300 mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center">
          <h1 className="name text-lg md:text-xl mb-4 md:mb-0">No Of Users:</h1>
          <div className="flex items-center w-full md:w-auto">
            <input
              type="number"
              name="data"
              className="w-full md:w-50 h-10 p-5 border-2 border-black rounded-2xl mb-4 md:mb-0 md:mr-6"
            />
            <button type="submit" className="submitbutton">
              Submit
            </button>
          </div>
        </form>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 w-[70%] px-4">
        {users.map((user, index) => (
          <Card
            key={index}
            firstname={user.name.first}
            lastname={user.name.last}
            gender={user.gender}
            mobileno={user.phone}
            image={user.picture.large}
          />
        ))}
      </div>


      {users.length > 0 && (
        <div className="flex gap-4 mt-6 justify-center items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-bold">Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
