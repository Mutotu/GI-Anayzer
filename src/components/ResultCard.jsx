import React from 'react';

function ResultCard({ result, onRemove }) {
  return (
    <div className="result-card">
      <img src={result.fileURL} alt={result.foodName} className="food-image" />
      {result.recognized ? (
        <div className="result-details">
          <h3>{result.foodName}</h3>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          {result.gi && <p>Glycemic Index: {result.gi.toFixed(2)}</p>}
          {/* {result.glycemicLoad && <p>Glycemic Load: {result.glycemicLoad.toFixed(2)}</p>} */}
        </div>
      ) : (
        <p>Food not recognized.</p>
      )}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default ResultCard;
