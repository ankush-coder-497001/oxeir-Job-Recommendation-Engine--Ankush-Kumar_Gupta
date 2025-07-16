import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { register } from '../api/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skillScore: '',
    completedCourses: '',
    quizTags: '',
    goals: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Process form data based on role
    const processedFormData = {
      email: formData.email,
      password: formData.password,
      role,
      ...(role === 'user' && {
        name: formData.name,
        skillScore: parseInt(formData.skillScore, 10),
        completedCourses: formData.completedCourses.split(',').filter(item => item.trim()),
        quizTags: formData.quizTags.split(',').filter(item => item.trim()),
        goals: formData.goals.split(',').filter(item => item.trim()),
      })
    };

    try {
      const data = await register(processedFormData);
      toast.success('Registration successful!');
      navigate(role === 'employer' ? '/employer' : '/user');

    } catch (error) {
      toast.error(error.message);
      setErrors({
        submit: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Account Type
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="user">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            {role === 'user' && (
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
                required
              />
            )}

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              error={errors.password}
              required
            />

            {role === 'user' && (
              <>
                <InputField
                  label="Skill Score"
                  type="number"
                  name="skillScore"
                  value={formData.skillScore}
                  onChange={handleChange}
                  placeholder="Enter your skill score (0-100)"
                  error={errors.skillScore}
                  required
                />

                <InputField
                  label="Completed Courses (comma-separated)"
                  name="completedCourses"
                  value={formData.completedCourses}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB..."
                  error={errors.completedCourses}
                  required
                />

                <InputField
                  label="Quiz Tags (comma-separated)"
                  name="quizTags"
                  value={formData.quizTags}
                  onChange={handleChange}
                  placeholder="JavaScript, React, SQL..."
                  error={errors.quizTags}
                  required
                />

                <InputField
                  label="Goals (comma-separated)"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  placeholder="Full Stack Developer, Cloud Engineer..."
                  error={errors.goals}
                  required
                />
              </>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
