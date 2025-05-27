import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
