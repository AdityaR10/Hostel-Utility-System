'use client'
import React, { useState } from 'react';
export default function CreateCredentials() {

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUserId = `${username}-${Date.now()}`;
        setUserId(newUserId);
        alert(`User ID created: ${newUserId}`);
    };
    return (
        <div className="bg-blue-800 flex items-center justify-center min-h-screen text-center text-white">
            <div>
                <h1 className="text-4xl font-bold mb-2">Create Credentials</h1>
                <p className="mb-6">Create the username and password for respective hostel</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-left mb-1" htmlFor="email">Username</label>
                        <input 
                            id="email" 
                            type="text" 
                            className="w-full p-2 rounded border border-gray-300 text-black" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-left mb-1" htmlFor="username">Create Password</label>
                        <input 
                            id="username" 
                            type="text" 
                            className="w-full p-2 rounded border border-gray-300 text-black" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-left mb-1" htmlFor="password">Confirm Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            className="w-full p-2 rounded border border-gray-300 text-black" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700">Create Username</button>
                </form>
                {userId && <p className="mt-4">Your User ID: {userId}</p>}
            </div>
        </div>
    );
}