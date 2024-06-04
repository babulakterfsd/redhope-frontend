import NotFound from '@/app/not-found';

const DonorDashboard = ({ loggedInUser }: any) => {
  if (loggedInUser?.role !== 'donor') {
    return <NotFound />;
  }

  return (
    <div>
      <h3>This is donor dashboard</h3>
    </div>
  );
};

export default DonorDashboard;
