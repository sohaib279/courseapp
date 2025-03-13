import { useEffect, useState } from "react";
import logo from "../../public/logo.jpg";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.log("Error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen text-white">
      <div className="container mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
          </div>
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 border border-white rounded mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        <section className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-orange-500">CourseHaven</h1>
          <p className="text-gray-400 mt-4">Sharpen your skills with courses crafted by experts.</p>
          <div className="mt-6 space-x-4">
            <Link to="/courses" className="bg-green-500 text-white py-3 px-6 rounded font-semibold">Explore Courses</Link>
            
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {courses?.map((course) => (
            <div key={course?._id} className="bg-gray-900 p-4 rounded-lg ">
              <img className="h-32 w-full object-cover rounded" src={course?.image?.url} alt={course.title} />
              <h2 className="text-xl font-bold text-white mt-4">{course.title}</h2>
              <Link to={`/buy/${course._id}`} className="block mt-4 bg-orange-500 text-white py-2 px-4 text-center rounded-full ">Enroll Now</Link>
            </div>
          ))}
        </section>
        <hr className="text-black"/>
        <footer className="mt-12 text-center">
          <div className="flex flex-wrap justify-around items-center text-black">
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
              </div>
              <p className="mt-3">Follow us</p>
              <div className="flex justify-center space-x-4 mt-2">
                <a href="#"><FaFacebook className="text-2xl text-blue-800 " /></a>
                <a href="#"><FaInstagram className="text-2xl text-blue-800" /></a>
                <a href="#"><FaTwitter className="text-2xl text-blue-800" /></a>
              </div>
            </div>
          
            <div>
              <h3 className="text-lg font-semibold">© 2025 CourseHaven</h3>
              
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
