import React from 'react';

const EthereumAssistantLogo = () => {
  return (
    <div className="relative w-10 h-10">
      {/* Ethereum Logo */}
      <svg className="absolute top-0 left-0" width="40" height="40" viewBox="0 0 40 40">
        <path
          d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
          fill="#627EEA"
        />
        <path
          d="M20.5 5v11.1l9.5 4.2-9.5-15.3z"
          fill="#FFFFFF"
          fillOpacity="0.6"
        />
        <path
          d="M20.5 5L11 20.3l9.5-4.2V5z"
          fill="#FFFFFF"
        />
        <path
          d="M20.5 27.4v7.6l9.5-13.2-9.5 5.6z"
          fill="#FFFFFF"
          fillOpacity="0.6"
        />
        <path
          d="M20.5 35V27.4l-9.5-5.6 9.5 13.2z"
          fill="#FFFFFF"
        />
        <path
          d="M20.5 25.7l9.5-5.6-9.5-4.2v9.8z"
          fill="#FFFFFF"
          fillOpacity="0.2"
        />
        <path
          d="M11 20.1l9.5 5.6v-9.8l-9.5 4.2z"
          fill="#FFFFFF"
          fillOpacity="0.6"
        />
      </svg>
      {/* 2D Assistant */}
      <div className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full border-2 border-[#627EEA] flex items-center justify-center">
        <span className="text-xs font-bold text-[#627EEA]">AI</span>
      </div>
    </div>
  );
};

export default EthereumAssistantLogo; 