'use client';

   import { useState } from 'react';
   import { supabase } from '../utils/supabase';

   export default function Auth() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const handleSignIn = async () => {
       setLoading(true);
       setError(null);

       const { error } = await supabase.auth.signInWithPassword({ email, password });
       if (error) {
         setError(error.message);
       } else {
         alert('Signed in successfully!');
       }
       setLoading(false);
     };

     const handleSignUp = async () => {
       setLoading(true);
       setError(null);

       const { error } = await supabase.auth.signUp({ email, password });
       if (error) {
         setError(error.message);
       } else {
         alert('Signed up successfully! Check your email for verification.');
       }
       setLoading(false);
     };

     const handleSignOut = async () => {
       setLoading(true);
       setError(null);

       const { error } = await supabase.auth.signOut();
       if (error) {
         setError(error.message);
       } else {
         alert('Signed out successfully!');
         setEmail('');
         setPassword('');
       }
       setLoading(false);
     };

     return (
       <div className="p-4">
         <h2 className="text-xl font-bold mb-4">Sign In / Sign Up</h2>
         {error && <p className="text-red-500">{error}</p>}
         <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="Email"
           className="p-2 border rounded mb-2 w-full"
         />
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Password"
           className="p-2 border rounded mb-2 w-full"
         />
         <div className="flex space-x-2">
           <button
             onClick={handleSignIn}
             disabled={loading}
             className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
           >
             {loading ? 'Loading...' : 'Sign In'}
           </button>
           <button
             onClick={handleSignUp}
             disabled={loading}
             className="p-2 bg-green-500 text-white rounded disabled:bg-gray-400"
           >
             {loading ? 'Loading...' : 'Sign Up'}
           </button>
           <button
             onClick={handleSignOut}
             disabled={loading}
             className="p-2 bg-red-500 text-white rounded disabled:bg-gray-400"
           >
             {loading ? 'Loading...' : 'Sign Out'}
           </button>
         </div>
       </div>
     );
   }