"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import EmployeeList from "@/components/employeeList";
import EmployeeDetails from "@/components/employeeDetails";

import Navbar from "@/components/navbar";
import axios from "axios";
import { Employee } from "../../types/employee";

export default function TeamView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<
    number | undefined
  >();
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees/details`
        );
        const allEmp = response.data;
        console.log(allEmp);

        setEmployee(allEmp);

        if (allEmp.length > 0) {
          setSelectedEmployeeId(allEmp[0].id);
        }
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Failed to fetch Employees"
            : "Failed to fetch Employees"
        );
        console.error("Error fetching Employees:", error);
      }
    };
    fetchEmployee();
  }, []);

  const filteredEmployees = employee.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedEmployee =
    employee.find((employee) => employee.id === selectedEmployeeId) ||
    employee[0];

  return (
    <div className="min-h-screen bg-[rgb(20,26,34)] text-[rgb(20,26,34)]">
      <main className="max-w-7xl mx-auto p-4 lg:p-6">
        <Navbar userName={"User"}></Navbar>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-1">
          {/* Left Column */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search team members..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(20,26,34)] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <EmployeeList
              employees={filteredEmployees}
              selectedEmployeeId={selectedEmployeeId}
              onSelectEmployee={setSelectedEmployeeId}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            {selectedEmployee ? (
              <EmployeeDetails employee={selectedEmployee} />
            ) : (
              <div className="text-white">No employee selected.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
