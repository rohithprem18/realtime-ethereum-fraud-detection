import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Activity, Clock, ArrowUpDown, AlertTriangle, CheckCircle } from 'lucide-react';
import Web3 from 'web3';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EthereumInfo from './components/EthereumInfo';
import EthereumChatbot from './components/EthereumChatbot';
import SpinningEthereum from './components/SpinningEthereum';
import LoadingAnimation from './components/LoadingAnimation';

interface TransactionData {
  time: string;
  from: string;
  to: string;
  value: number;
  gasPrice: number;
  isSuspicious: boolean;
}

const App = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [ethPrice, setEthPrice] = useState<string>('0.00');
  const [latestBlock, setLatestBlock] = useState<string>('0');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Web3
  useEffect(() => {
    const web3 = new Web3(import.meta.env.VITE_INFURA_URL);
    
    const fetchBlockData = async () => {
      try {
        const blockNumber = await web3.eth.getBlockNumber();
        setLatestBlock(blockNumber.toString());
        
        const block = await web3.eth.getBlock(blockNumber, true);
        if (block && block.transactions) {
          const newTransactions = block.transactions.slice(0, 5).map((tx: any) => ({
            time: new Date().toLocaleTimeString(),
            from: tx.from,
            to: tx.to || 'Contract Creation',
            value: parseFloat(web3.utils.fromWei(tx.value, 'ether')),
            gasPrice: parseFloat(web3.utils.fromWei(tx.gasPrice, 'gwei')),
            isSuspicious: 
              parseFloat(web3.utils.fromWei(tx.value, 'ether')) > 10 || 
              parseFloat(web3.utils.fromWei(tx.gasPrice, 'gwei')) > 50
          }));

          setTransactions(prev => [...newTransactions, ...prev].slice(0, 10));
          updateChartData(newTransactions[0]);
        }
      } catch (error) {
        console.error('Error fetching block data:', error);
      }
    };

    const interval = setInterval(fetchBlockData, 15000);
    fetchBlockData();

    return () => clearInterval(interval);
  }, []);

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate ETH price updates
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr'
        );
        const data = await response.json();
        const inrPrice = data.ethereum.inr.toLocaleString('en-IN');
        setEthPrice(inrPrice);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    };

    const interval = setInterval(fetchEthPrice, 30000);
    fetchEthPrice();

    return () => clearInterval(interval);
  }, []);

  // Add this to your useEffect
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const updateChartData = (newTransaction: TransactionData) => {
    setChartData(prev => {
      const newData = [...prev, {
        time: newTransaction.time,
        gasPrice: newTransaction.gasPrice,
        value: newTransaction.value
      }].slice(-10);
      return newData;
    });
  };

  const calculateTotalVolume = (txs: TransactionData[]) => {
    return txs.reduce((sum, tx) => sum + tx.value, 0).toFixed(2);
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <EthereumChatbot />
          <Routes>
            <Route path="/" element={
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                {/* Enhanced Header */}
                <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-4 sm:space-y-0">
                      {/* Logo and Price */}
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between">
                        <div className="flex items-center gap-3">
                          <SpinningEthereum />
                          <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              ETH Monitor
                            </h1>
                            <p className="text-sm text-gray-500">Real-time Analysis</p>
                          </div>
                        </div>
                        <div className="eth-stats-container px-4 py-2 rounded-lg">
                          <p className="eth-title text-xs mb-1">Current Price</p>
                          <p className="eth-value text-lg">₹{ethPrice}</p>
                        </div>
                      </div>

                      {/* Enhanced Stats */}
                      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-6 w-full sm:w-auto">
                        <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg border border-purple-100">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">{currentTime}</span>
                        </div>
                        <button 
                          onClick={() => navigate('/ethereum-info')}
                          className="info-button px-4 py-2 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <ArrowUpDown className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Volume</h2>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">{calculateTotalVolume(transactions)} ETH</p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Suspicious</h2>
                      </div>
                      <p className="text-3xl font-bold text-red-600">
                        {transactions.filter(tx => tx.isSuspicious).length}
                      </p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Normal</h2>
                      </div>
                      <p className="text-3xl font-bold text-green-600">
                        {transactions.filter(tx => !tx.isSuspicious).length}
                      </p>
                    </div>
                  </div>

                  {/* Charts and Tables */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Enhanced Chart */}
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow duration-300">
                      <h2 className="text-xl font-bold mb-6 text-gray-800">Transaction Analysis</h2>
                      <div className="overflow-hidden">
                        <div style={{ height: '300px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                              <XAxis dataKey="time" stroke="#64748B" />
                              <YAxis stroke="#64748B" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                  borderRadius: '8px',
                                  border: '1px solid #E2E8F0',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="gasPrice" 
                                stroke="#6366F1" 
                                strokeWidth={2}
                                dot={{ fill: '#6366F1' }}
                                name="Gas Price (gwei)"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#10B981" 
                                strokeWidth={2}
                                dot={{ fill: '#10B981' }}
                                name="Value (ETH)"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Table */}
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow duration-300">
                      <h2 className="text-xl font-bold mb-6 text-gray-800">Recent Transactions</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full transaction-table">
                          <thead>
                            <tr className="text-left">
                              <th className="py-3 px-4 rounded-tl-lg">Time</th>
                              <th className="py-3 px-4">From</th>
                              <th className="py-3 px-4">To</th>
                              <th className="py-3 px-4">Value (ETH)</th>
                              <th className="py-3 px-4">Gas (gwei)</th>
                              <th className="py-3 px-4 rounded-tr-lg">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((tx, index) => (
                              <tr key={index} className="transaction-row">
                                <td className="py-3 px-4 text-sm">{tx.time}</td>
                                <td className="py-3 px-4 font-mono text-xs">{tx.from.slice(0, 6)}...{tx.from.slice(-4)}</td>
                                <td className="py-3 px-4 font-mono text-xs">{tx.to.slice(0, 6)}...{tx.to.slice(-4)}</td>
                                <td className="py-3 px-4">{tx.value.toFixed(4)}</td>
                                <td className="py-3 px-4">{tx.gasPrice.toFixed(2)}</td>
                                <td className="py-3 px-4">
                                  <span className={tx.isSuspicious ? 'status-badge-suspicious' : 'status-badge-normal'}>
                                    {tx.isSuspicious ? 'Suspicious' : 'Normal'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/ethereum-info" element={<EthereumInfo />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;