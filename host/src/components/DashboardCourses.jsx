import React from "react";

export default function DashboardCourses({ courses }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="font-semibold text-gray-800 mb-4">Current Courses</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.title}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800">{course.title}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {course.tag}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`${course.color} h-1.5 rounded-full transition-all`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
