import React from 'react';

const PerformanceModal = ({ handleClose, performanceData }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Performance Data</h2>
        <div>
          <h3>Navigation Timing</h3>
          <pre>{JSON.stringify(performanceData.navigation, null, 2)}</pre>
        </div>
        <div>
          <h3>Resource Timing</h3>
          <pre>{JSON.stringify(performanceData.resources, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default PerformanceModal;
