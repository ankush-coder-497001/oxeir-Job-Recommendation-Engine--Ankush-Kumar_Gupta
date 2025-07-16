import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import JobForm from '../components/JobForm';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import { createJob, getEmployerJobs } from '../api/jobs';
import Navbar from '../components/Navbar';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      const jobsData = await getEmployerJobs();
      setJobs(jobsData || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const handleCreateJob = async (jobData) => {
    setIsSubmitting(true);
    try {
      await createJob(jobData);
      toast.success('Job posted successfully!');
      setShowJobForm(false);
      fetchJobs(); // Refresh the jobs list
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
            <Button
              onClick={() => setShowJobForm(!showJobForm)}
              variant="primary"
              className="flex items-center"
            >
              {showJobForm ? 'Cancel' : 'Post New Job'}
            </Button>
          </div>

          {/* Job Creation Form */}
          {showJobForm && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Job</h2>
              <JobForm onSubmit={handleCreateJob} isSubmitting={isSubmitting} />
            </div>
          )}
        </div>

        {/* Posted Jobs List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Posted Jobs</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-600">No jobs posted yet</h3>
              <p className="text-gray-500 mt-2">Create your first job posting to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job._id} className="relative">
                  <JobCard job={job} />

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerDashboard;
