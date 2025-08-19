import React from 'react';

function ResultCard({ result, onRemove }) {
  if (!result) return null;

  return (
    <div className="result-card">
      <img src={result.fileURL} alt="Uploaded Food" className="result-image" />
      {result.recognized ? (
        <>
          <h4>{result.foodName.replace('_', ' ')}</h4>
          <p>GI: {result.gi}</p>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </>
      ) : (
        <p>Unrecognized</p>
      )}
      <button onClick={onRemove} className="remove-button">Remove</button>
    </div>
  );
}

export default ResultCard;