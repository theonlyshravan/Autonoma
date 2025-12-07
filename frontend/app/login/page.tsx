'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Use login from context

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            // Assume backend is running on localhost:8000
            const response = await axios.post('http://localhost:8000/api/auth/login',
                new URLSearchParams({
                    'username': email, // OAuth2PasswordRequestForm expects username
                    'password': password
                }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            );

            const { access_token } = response.data;
            login(access_token);
        } catch (err: any) {
            console.error(err);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white">
            <div className="w-full max-w-md p-8 bg-[#111] rounded-lg border border-gray-800 shadow-2xl backdrop-blur-md bg-opacity-80">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Autonoma Login</h2>
                {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-black/50 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                            placeholder="user@demo.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-black/50 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded font-bold shadow-lg shadow-blue-900/20 transition-all transform hover:scale-[1.02]"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center text-xs text-gray-600">
                    <p>Demo Credentials:</p>
                    <div className="mt-2 space-y-1">
                        <span className="block">Customer: user@demo.com / pass123</span>
                        <span className="block">Service: service@ey.com / ey_secure</span>
                        <span className="block">Manufacturer: admin@oem.com / admin_pass</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
