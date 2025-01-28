import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Database, Cpu, Network, Lock, LineChart } from 'lucide-react';
import SpinningEthereum from './SpinningEthereum';

const EthereumInfo = () => {
  const navigate = useNavigate();

  const architectureSteps = [
    {
      icon: <Network className="w-6 h-6 text-blue-600" />,
      title: "Web3 Connection",
      description: "Establishes connection to Ethereum Mainnet via Infura API"
    },
    {
      icon: <Database className="w-6 h-6 text-purple-600" />,
      title: "Block Processing",
      description: "Monitors and processes new blocks in real-time"
    },
    {
      icon: <Cpu className="w-6 h-6 text-green-600" />,
      title: "Transaction Analysis",
      description: "Analyzes transactions for suspicious patterns"
    },
    {
      icon: <Lock className="w-6 h-6 text-red-600" />,
      title: "Fraud Detection",
      description: "Flags suspicious transactions based on predefined criteria"
    },
    {
      icon: <LineChart className="w-6 h-6 text-indigo-600" />,
      title: "Data Visualization",
      description: "Real-time charts and transaction monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-ethereum-pattern text-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-4 px-4 py-2 bg-[#1A237E] text-white rounded-lg hover:bg-[#311B92] transition-colors duration-200"
        >
          Back to Dashboard
        </button>
        
        <div className="bg-white/90 backdrop-blur-lg rounded-lg shadow-lg p-4 sm:p-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <SpinningEthereum />
            Ethereum Fraud Detection System
          </h1>

          {/* Technical Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Technical Overview</h2>
            <p className="text-gray-600 mb-6">
              This system monitors Ethereum blockchain transactions in real-time, analyzing patterns
              to detect potential fraudulent activities using advanced algorithms and Web3 technology.
            </p>

            {/* Architecture Flow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></div>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-4 sm:p-6">
                {architectureSteps.map((step, index) => (
                  <div 
                    key={step.title}
                    className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md transform hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="mb-3">{step.icon}</div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Stack */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Technical Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-lg mb-4 text-blue-900">Frontend Technologies</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-bold">React + TypeScript</span>
                        <p className="text-gray-600 text-sm">Modern frontend framework with type safety</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-bold">Tailwind CSS</span>
                        <p className="text-gray-600 text-sm">Utility-first CSS framework for responsive design</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-bold">Recharts</span>
                        <p className="text-gray-600 text-sm">Data visualization library for real-time charts</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100">
                  <h3 className="font-bold text-lg mb-4 text-blue-900">Blockchain Integration</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-bold">Web3.js</span>
                        <p className="text-gray-600 text-sm">Ethereum JavaScript API for blockchain interaction</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-bold">Infura API</span>
                        <p className="text-gray-600 text-sm">Reliable Ethereum network access and data retrieval</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-bold">Transaction Monitoring</span>
                        <p className="text-gray-600 text-sm">Real-time tracking and analysis of blockchain transactions</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthereumInfo; 