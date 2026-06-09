/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/**/*.html"],
  safelist: [
    "text-red-400",
    "text-green-400",
    "text-red-700",
    "text-green-700",
    "text-gray-500",
    "bg-red-50",
    "bg-green-50",
    "bg-red-100",
    "bg-green-100",
    "border-red-200",
    "border-green-200",
    "bg-indigo-50",
    "text-indigo-700",
    "border-indigo-200",
    "bg-blue-50",
    "text-blue-600",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#1e1b4b",
        },
      },
    },
  },
  plugins: [],
};