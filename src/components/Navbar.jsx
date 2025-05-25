import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../ReduxStore/Slice/authSlice';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to set isAuthenticated to false
    navigate('/login', { replace: true }); // Redirect to login page
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <Link className="flex flex-shrink-0 items-center" to="/">
              <img
                className="block h-12 w-auto"
                src="https://www.svgrepo.com/show/501888/donut.svg"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="text-gray-700 hover:text-indigo-700 text-sm font-medium" to="/login">
                  Login
                </Link>
                <Link
                  className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm"
                  to="/register"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;