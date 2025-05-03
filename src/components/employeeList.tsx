"use client";

import { Employee } from "@/types/employee";
import Image from "next/image";

interface EmployeeListProps {
  employees: Employee[];
  selectedEmployeeId: number;
  onSelectEmployee: (id: number) => void;
}

export default function EmployeeList({
  employees,
  selectedEmployeeId,
  onSelectEmployee,
}: EmployeeListProps) {
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
      {employees.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <li key={employee.id}>
              <button
                className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
                  selectedEmployeeId === employee.id
                    ? "bg-gray-50 border-l-4 border-[rgb(20,26,34)]"
                    : ""
                }`}
                onClick={() => onSelectEmployee(employee.id)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mr-3">
                  <Image
                    src="/images/placeholder.svg"
                    alt={employee.name}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">{employee.name}</h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-6 text-center text-gray-500">
          <p>No team members found</p>
        </div>
      )}
    </div>
  );
}
