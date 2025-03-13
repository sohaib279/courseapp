


import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse, FaDownload } from "react-icons/fa6";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import logo from "../../public/logo.jpg";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem("user");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/course/courses`, { withCredentials: true })
      .then(({ data }) => setCourses(data.courses))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
      toast.success(data.message);
      localStorage.removeItem("user");
    } catch {
      toast.error("Error in logging out");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button className="md:hidden fixed top-4 left-4 z-20 text-3xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 p-5 bg-gray-100 z-10 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}>
        <img src={logo} alt="Logo" className="rounded-full h-12 w-12 mb-5" />
        <nav>
          <ul>
            <li><Link to="/" className="flex items-center mb-4"><RiHome2Fill className="mr-2" /> Home</Link></li>
            <li><Link to="#" className="flex items-center mb-4 text-blue-500"><FaDiscourse className="mr-2" /> Courses</Link></li>
            <li><Link to="/purchases" className="flex items-center mb-4"><FaDownload className="mr-2" /> Purchases</Link></li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center"><IoLogOut className="mr-2" /> Logout</button>
              ) : (
                <Link to="/login" className="flex items-center"><IoLogIn className="mr-2" /> Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <h1 className="text-xl font-bold mb-10">Courses</h1>
        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500">No courses available</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map(({ _id, image, title, description, price }) => (
                <div key={_id} className="border rounded-lg p-4 shadow-sm">
                  <img src={image?.url} alt={title} className="rounded mb-4" />
                  <h2 className="font-bold text-lg mb-2">{title}</h2>
                  <p className="text-gray-600 mb-4">{description.slice(0, 100)}...</p>
                  <span className="font-bold text-xl">{price}</span>
                  <Link to={`/buy/${_id}`} className="block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-900 duration-300">
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;
