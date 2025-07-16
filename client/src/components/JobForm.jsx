import { useState } from 'react';
import { toast } from 'react-hot-toast';
import InputField from '../components/InputField';
import Button from '../components/Button';

const JobForm = ({ onSubmit, initialData = null, isSubmitting }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    company: '',
    location: '',
    requiredSkills: '',
    skillScoreThreshold: '',
    jobTags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert comma-separated strings to arrays
    const processedData = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()),
      jobTags: formData.jobTags.split(',').map(tag => tag.trim()),
      skillScoreThreshold: parseInt(formData.skillScoreThreshold, 10)
    };

    onSubmit(processedData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Senior Frontend Developer"
          required
        />

        <InputField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
          required
        />

        <InputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., New York, NY (or Remote)"
          required
        />

        <InputField
          label="Skill Score Threshold"
          type="number"
          name="skillScoreThreshold"
          value={formData.skillScoreThreshold}
          onChange={handleChange}
          placeholder="Minimum required skill score (0-100)"
          required
        />

        <div className="md:col-span-2">
          <InputField
            label="Required Skills (comma-separated)"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, MongoDB"
            required
          />
        </div>

        <div className="md:col-span-2">
          <InputField
            label="Tags (comma-separated)"
            name="jobTags"
            value={formData.jobTags}
            onChange={handleChange}
            placeholder="e.g., Remote, Full-time, Senior"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" variant="primary" className="w-full">
          {isSubmitting ? 'posting...' : 'post'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
