import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center z-50">
      <div className="relative">
        {/* Ethereum Logo with Scanning Effect */}
        <div className="ethereum-scan-container">
          <svg className="ethereum-logo-scan" width="120" height="120" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg">
            <g className="ethereum-scan">
              <polygon fill="#343434" points="127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32"/>
              <polygon fill="#8C8C8C" points="127.962 0 0 212.32 127.962 287.959 127.962 154.158"/>
              <polygon fill="#3C3C3B" points="127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866"/>
              <polygon fill="#8C8C8C" points="127.962 416.9052 127.962 312.1852 0 236.5852"/>
              <polygon fill="#141414" points="127.9611 287.9577 255.9211 212.3207 127.9611 154.1587"/>
              <polygon fill="#393939" points="0.0009 212.3208 127.9609 287.9578 127.9609 154.1588"/>
            </g>
          </svg>
          
          {/* Scanning Line */}
          <div className="scan-line"></div>
          
          {/* Circular Shield */}
          <div className="shield-container">
            <Shield className="shield-icon" size={40} />
          </div>
          
          {/* Alert Triangles */}
          <div className="alerts-container">
            <AlertTriangle className="alert-icon alert-1" size={24} />
            <AlertTriangle className="alert-icon alert-2" size={24} />
            <AlertTriangle className="alert-icon alert-3" size={24} />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center mt-8">
          <h2 className="text-xl font-bold text-white mb-2">Initializing Fraud Detection</h2>
          <p className="text-blue-200 text-sm">Analyzing blockchain transactions...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 