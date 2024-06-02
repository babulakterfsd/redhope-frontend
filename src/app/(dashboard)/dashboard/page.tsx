import Logout from '@/components/dashboard/Logout';
import DashboardLayout from '@/components/layout/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <h3>This is dashboard</h3>
      <Logout />
    </DashboardLayout>
  );
};

export default page;
