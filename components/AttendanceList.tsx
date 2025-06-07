'use client';

  import { useState, useEffect } from 'react';
  import { supabase } from '../utils/supabase';

  interface AttendanceRecord {
    id: number;
    user_id: string;
    check_in: string;
    status: 'present' | 'absent' | 'late';
    created_at: string;
  }

  export default function AttendanceList() {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchRecords = async () => {
        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          setError('You must be logged in to view attendance.');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('attendance')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          setRecords(data as AttendanceRecord[]);
        }
        setLoading(false);
      };

      fetchRecords();

      // Set up real-time subscription
      const subscription = supabase
        .channel('attendance-changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'attendance' }, (payload) => {
          const newRecord = payload.new as AttendanceRecord;
          supabase.auth.getUser().then(({ data: { user } }) => {
            if (user && newRecord.user_id === user.id) {
              setRecords((prev) => [newRecord, ...prev]);
            }
          });
        })
        .subscribe();

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
        <ul>
          {records.map((record) => (
            <li key={record.id} className="mb-2">
              {new Date(record.check_in).toLocaleString()}: {record.status}
            </li>
          ))}
        </ul>
      </div>
    );
  }