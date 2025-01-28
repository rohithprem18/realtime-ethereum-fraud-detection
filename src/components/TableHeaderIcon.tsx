import React from 'react';
import { Clock, ArrowLeftRight, Wallet, GasPump, ShieldAlert } from 'lucide-react';

interface HeaderIconProps {
  type: 'time' | 'address' | 'value' | 'gas' | 'status';
  className?: string;
}

const TableHeaderIcon = ({ type, className = "" }: HeaderIconProps) => {
  const iconClass = `w-5 h-5 ${className}`;
  
  switch (type) {
    case 'time':
      return <Clock className={iconClass} />;
    case 'address':
      return <ArrowLeftRight className={iconClass} />;
    case 'value':
      return <Wallet className={iconClass} />;
    case 'gas':
      return <GasPump className={iconClass} />;
    case 'status':
      return <ShieldAlert className={iconClass} />;
    default:
      return null;
  }
};

export default TableHeaderIcon; 