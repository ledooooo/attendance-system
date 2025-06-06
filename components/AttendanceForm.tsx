'use client';

     import { useState } from 'react';
     import { supabase } from '../utils/supabase';

     export default function AttendanceForm() {
       const [status, setStatus] = useState<'present' | 'absent' | 'late'>('present');
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);

       const handleCheckIn = async () => {
         setLoading(true);
         setError(null);

         const { data: { user }, error: userError } = await supabase.auth.getUser();
         if (userError || !user) {
           setError('You must be logged in to record attendance.');
           setLoading(false);
           return;
         }

         const { error } = await supabase
           .from('attendance')
           .insert([{ user_id: user.id, status }]);

         if (error) {
           setError(error.message);
         } else {
           alert('Attendance logged successfully!');
         }
         setLoading(false);
       };

       return (
         <div className="p-4">
           <h2 className="text-xl font-bold mb-4">Log Attendance</h2>
           {error && <p className="text-red-500">{error}</p>}
           <select
             value={status}
             onChange={(e) => setStatus(e.target.value as 'present' | 'absent' | 'late')}
             className="p-2 border rounded"
           >
             <option value="present">Present</option>
             <option value="absent">Absent</option>
             <option value="late">Late</option>
           </select>
           <button
             onClick={handleCheckIn}
             disabled={loading}
             className="ml-2 p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
           >
             {loading ? 'Logging...' : 'Check In'}
           </button>
         </div>
       );
     }