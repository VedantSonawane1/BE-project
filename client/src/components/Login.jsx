import React from 'react';

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:8000/oauth'; // OAuth endpoint
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                Login with Google
            </button>
        </div>
    );
};

export default Login;
