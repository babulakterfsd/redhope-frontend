import AdminDashboard from '@/components/dashboard/AdminDashboard';
import DonorDashboard from '@/components/dashboard/DonorDashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession();
  const loggedInUserEmail = session?.user?.email;
  const loggedInUserData = await fetch(
    `https://redhope-backend.vercel.app/api/auth/getalldonorsbyemail/${loggedInUserEmail}`
  );
  const currentUser = await loggedInUserData.json();
  const loggedInUser = currentUser?.data;

  return (
    <DashboardLayout>
      {loggedInUser?.role === 'admin' ? (
        <AdminDashboard loggedInUser={loggedInUser} />
      ) : (
        <DonorDashboard loggedInUser={loggedInUser} />
      )}
    </DashboardLayout>
  );
};

export default page;
