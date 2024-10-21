
const CheckStatusCard = ({ doiCheck, titleCheck, similarDois }) => (
  <div className="p-4 border rounded shadow bg-white mb-4">
    <h2 className="text-xl font-bold mb-4">Duplicate Check Status</h2>

    {/* DOI Check Status Display */}
    <div className="mb-2">
      <span className="font-semibold">DOI Check: </span>
      <span className={doiCheck ? 'text-red-600' : 'text-green-600'}>
        {doiCheck ? 'Failed' : 'Passed'}
      </span>
    </div>

    {/* Title Check Status Display */}
    <div className="mb-2">
      <span className="font-semibold">Title Check: </span>
      <span className={titleCheck ? 'text-red-600' : 'text-green-600'}>
        {titleCheck ? 'Failed' : 'Passed'}
      </span>
    </div>

    {/* If either DOI or Title Check is false, display similar articles' DOIs */}
    {!doiCheck || !titleCheck ? (
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-700">Similar Articles DOIs:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {similarDois && similarDois.length > 0 ? (
            similarDois.map((doi, index) => <li key={index}>{doi}</li>)
          ) : (
            <li>No similar articles found</li>
          )}
        </ul>
      </div>
    ) : null}
  </div>
);

export default CheckStatusCard;
