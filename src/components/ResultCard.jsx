import React from 'react'

function ResultCard({ result, onRemove }) {
  const hasNudges = Array.isArray(result.nudges) && result.nudges.length > 0
  console.log(hasNudges)

  return (
    <div className="result-card">
      <div className="image-wrapper" tabIndex={0} aria-label="Food image with nudges on hover/focus">
        <img src={result.fileURL} alt={result.foodName || 'Food image'} className="food-image" />
        {hasNudges && (
          <div className="nudge-overlay">
            <h4>Simple Health Nudges</h4>
            <ul>
              {result.nudges.map((nudge, idx) => (
                <li key={idx}>{nudge}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {result.recognized ? (
        <div className="result-details">
          <h3>{result.foodName}</h3>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          {typeof result.gi === 'number' && <p>Glycemic Index: {result.gi.toFixed(2)}</p>}
          {/* {typeof result.glycemicLoad === 'number' && <p>Glycemic Load: {result.glycemicLoad.toFixed(2)}</p>} */}
        </div>
      ) : (
        <p>Food not recognized.</p>
      )}

      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

export default ResultCard