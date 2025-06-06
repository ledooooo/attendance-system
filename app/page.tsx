import AttendanceForm from '../components/AttendanceForm';
     import AttendanceList from '../components/AttendanceList';
     import Auth from '../components/Auth';

     export default function Home() {
       return (
         <main className="container mx-auto p-4">
           <h1 className="text-2xl font-bold mb-4">Attendance System</h1>
           <Auth />
           <AttendanceForm />
           <AttendanceList />
         </main>
       );
     }