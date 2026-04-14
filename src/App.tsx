/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AssetAllocation } from './components/AssetAllocation';
import { ValuationImport } from './components/ValuationImport';
import { PortfolioReport } from './components/PortfolioReport';
import { PositionReport } from './components/PositionReport';
import { OperationReport } from './components/OperationReport';
import { TransactionFlow } from './components/TransactionFlow';
import { RiskWarning } from './components/RiskWarning';

const PlaceholderModule = ({ name }: { name: string }) => (
  <div className="p-8">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
        <p className="text-sm text-slate-500 mt-1">当前模块正在开发中，敬请期待。</p>
      </div>
    </div>
    <div className="ams-card p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900">模块建设中</h3>
      <p className="text-sm text-slate-500 max-w-md mt-2">
        我们正在努力完善 {name} 的详细功能。该模块将包含深度的金融数据分析与专业报表功能。
      </p>
    </div>
  </div>
);

export default function App() {
  const [currentModule, setCurrentModule] = React.useState('总览');

  const renderContent = () => {
    switch (currentModule) {
      case '总览':
        return <Dashboard />;
      case '组合报告':
        return <PortfolioReport />;
      case '资产配置':
        return <AssetAllocation />;
      case '估值表导入':
        return <ValuationImport />;
      case '头寸表':
        return <PositionReport />;
      case '运营报表':
        return <OperationReport />;
      case '交易流水':
        return <TransactionFlow />;
      case '风险预警':
        return <RiskWarning />;
      default:
        return <PlaceholderModule name={currentModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-ams-bg overflow-hidden">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
