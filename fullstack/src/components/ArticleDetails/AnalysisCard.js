import { useEffect, useState } from 'react';

const AnalysisCard = ({ researchMethod, participants, supportsPractice, conclusion, status, id }) => {
  // State variables for input
  const [method, setMethod] = useState(researchMethod || '');
  const [participantType, setParticipantType] = useState(participants || '');
  const [practiceSupport, setPracticeSupport] = useState(supportsPractice || '');
  const [conclusionText, setConclusionText] = useState(conclusion || '');

  useEffect(() => {
    if (status === 'Analyzed') {
      setMethod(researchMethod);
      setParticipantType(participants);
      setPracticeSupport(supportsPractice);
      setConclusionText(conclusion);
    }
  }, [status, researchMethod, participants, supportsPractice, conclusion]);

  const handleSaveAnalysis = async () => {
    try {
      const response = await fetch(`/api/acceptedArticles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          researchMethod: method,
          status: 'Analyzed',
          participants: participantType,
          supportsPractice: practiceSupport,
          conclusion: conclusionText,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Analysis saved successfully!");
      } else {
        alert("Failed to save analysis.");
      }
    } catch (error) {
      console.error("Error saving analysis:", error);
    }
  };



  return (
    <div className="p-4 border rounded shadow bg-white mb-4">
      <h2 className="text-xl font-bold mb-4">Analysis Details</h2>

      {/* If the article has been analyzed, display the existing values */}
      {status === 'Analyzed' ? (
        <div>
          <p className="mb-2"><strong>Research Method: </strong>{method || 'Not Specified'}</p>
          <p className="mb-2"><strong>Participants Type: </strong>{participantType || 'Not Specified'}</p>
          <p className="mb-2"><strong>Supports SE Practice: </strong>{practiceSupport || 'Not Determined'}</p>
          <p className="mb-2"><strong>Research Conclusion: </strong>{conclusionText || 'Not Analyzed'}</p>
        </div>
      ) : (
        // Display form when not analyzed
        <div>
          <div className="mb-2">
            <label className="block text-gray-700">Research Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select a Research Method</option>
              <option value="Experiment">Experiment</option>
              <option value="Case Study">Case Study</option>
              <option value="Survey">Survey</option>
              <option value="Observational Study">Observational Study</option>
              <option value="Action Research">Action Research</option>
              <option value="Systematic Review">Systematic Review</option>
              <option value="Meta-Analysis">Meta-Analysis</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Participants Type</label>
            <select
              value={participantType}
              onChange={(e) => setParticipantType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select Participant Type</option>
              <option value="Student">Student</option>
              <option value="Industry Practitioners">Industry Practitioners</option>
              <option value="Researchers">Researchers</option>
              <option value="Developers">Developers</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Supports SE Practice</label>
            <select
              value={practiceSupport}
              onChange={(e) => setPracticeSupport(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select SE Method</option>
              <option value="Agile Development">Agile Development</option>
              <option value="Waterfall Model">Waterfall Model</option>
              <option value="DevOps">DevOps</option>
              <option value="Test-Driven Development">Test-Driven Development</option>
              <option value="Continuous Integration">Continuous Integration</option>
              <option value="Pair Programming">Pair Programming</option>
              <option value="Scrum">Scrum</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Research Conclusion</label>
            <textarea
              value={conclusionText}
              onChange={(e) => setConclusionText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Enter the research conclusion..."
              required
            ></textarea>
          </div>

          {/* Save button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSaveAnalysis}
          >
            Save Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;
