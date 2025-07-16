import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import JobCard from '../components/JobCard';
import { getRecommendedJobs } from '../api/jobs';
import Navbar from '../components/Navbar';

const UserHome = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getRecommendedJobs();
        setJobs(jobsData || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recommended Jobs</h1>
          <div className="flex space-x-4">
            {/* Add any additional actions/filters here */}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No recommended jobs found</h3>
            <p className="text-gray-500 mt-2">Update your profile to get better recommendations</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </>

  );
};

export default UserHome;
