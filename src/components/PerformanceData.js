import React, { useState, useEffect } from 'react';
import PerformanceModal from './PerformanceModal';

const PerformanceData = () => {
  const [performanceData, setPerformanceData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadPerformanceData = async () => {
      try {
        const navigationData = performance.getEntriesByType('navigation');
        const resourceData = performance.getEntriesByType('resource');

        setPerformanceData({
          navigation: navigationData.length > 0 ? navigationData[0] : {},
          resources: resourceData
        });
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    loadPerformanceData();
  }, []);

 const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Performance Data</h2>
      <button className="button" onClick={() => setShowModal(true)}>View Performance Data</button>
      {showModal && <PerformanceModal handleClose={handleCloseModal} performanceData={performanceData} />}
    </div>
  );
};


export default PerformanceData;
