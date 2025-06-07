'use client';

  import { useState, useEffect } from 'react';
  import { supabase } from '../utils/supabase';
  import AttendanceForm from '../components/AttendanceForm';
  import AttendanceList from '../components/AttendanceList';
  import Auth from '../components/Auth';

  export default function Home() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      };
      fetchUser();
    }, []);

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Attendance System</h1>
        <Auth />
        {user ? (
          <>
            <AttendanceForm />
            <AttendanceList />
          </>
        ) : (
          <p>Please sign in to log or view attendance.</p>
        )}
      </main>
    );
  }