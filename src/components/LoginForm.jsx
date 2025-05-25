import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authAPI';
import { login as loginAction } from '../ReduxStore/Slice/authSlice';

function LoginForm() {
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Navigate to dashboard when isAuthenticated becomes true
  useEffect(() => {
    console.log('useEffect isAuthenticated:', isAuthenticated); // Debug
    if (isAuthenticated) {
      console.log('Navigating to /dashboard via useEffect'); // Debug
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login(formData.emailId, formData.password);
      console.log('API Response:', response); // Debug API response
      dispatch(loginAction()); // Update Redux state
      console.log('Dispatched loginAction'); // Debug dispatch
      // Fallback navigation to handle async state update
      setTimeout(() => {
        console.log('Navigating to /dashboard via setTimeout'); // Debug
        navigate('/dashboard', { replace: true });
      }, 100);
    } catch (err) {
      console.error('Login error:', err); // Debug error
      setError(err.message || 'Login failed. Check API URL or credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div>
        <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="emailId"
          id="emailId"
          value={formData.emailId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default LoginForm;