import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;