const JobCard = ({ job }) => {
  const { title, company, location, requiredSkills, matchScore, reason, tags, skillScoreThreshold } = job;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{company} • {location}</p>
        </div>
        {matchScore && <div className="flex items-center">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500">Match Score</div>
            <div className="text-lg font-bold text-blue-600">{matchScore}%</div>
          </div>
        </div>}
      </div>

      {/* Progress bar */}
      {matchScore && <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${matchScore}%` }}
        />
      </div>
      }
      {/* skills threshold */}

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Threshold</h4>
        <p className="text-gray-600">{skillScoreThreshold}</p>
      </div>

      {/* Required Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          )) : (
            <p>no tags</p>
          )}
        </div>
      </div>

      {/* Reason */}
      {reason && (
        <div className="text-sm text-gray-600 border-t pt-4 mt-4">
          <p className="italic">Reason-{reason}</p>
        </div>
      )}
    </div>
  );
};

export default JobCard;
