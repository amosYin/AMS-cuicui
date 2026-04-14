import React from 'react';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  Download, 
  Settings2,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { cn } from '../lib/utils';

const periodicReturns = [
  { period: '2025-Q1', return: 5.4 },
  { period: '2025-Q2', return: -2.1 },
  { period: '2025-Q3', return: 4.8 },
  { period: '2025-Q4', return: 7.2 },
  { period: '2026-Q1', return: 3.5 },
  { period: '2026-Q2', return: 1.2 },
];

const rollingReturns = [
  { date: '2025-10', m1: 1.2, m3: 4.5, m6: 8.2, y1: 15.4 },
  { date: '2025-11', m1: 2.5, m3: 5.2, m6: 9.0, y1: 16.2 },
  { date: '2025-12', m1: -1.2, m3: 3.8, m6: 7.5, y1: 14.8 },
  { date: '2026-01', m1: 4.8, m3: 6.5, m6: 10.2, y1: 18.5 },
  { date: '2026-02', m1: 3.2, m3: 7.2, m6: 11.5, y1: 20.2 },
  { date: '2026-03', m1: -0.8, m3: 6.8, m6: 10.8, y1: 19.4 },
  { date: '2026-04', m1: 1.5, m3: 7.5, m6: 12.4, y1: 22.1 },
];

export const CycleAnalysis = () => {
  const [periodType, setPeriodType] = React.useState('季度');

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">周期分析</h2>
          <p className="text-sm text-slate-500 mt-1">按不同时间周期评估组合回报稳定性与盈亏比</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-bold text-slate-700 hover:bg-slate-50">
            <Settings2 className="w-4 h-4" />
            自定义周期
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出分析数据
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="ams-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">正收益周期占比 (胜率)</p>
            <p className="text-2xl font-black text-slate-900">83.33%</p>
          </div>
        </div>
        <div className="ams-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">平均正收益幅度</p>
            <p className="text-2xl font-black text-slate-900">+4.42%</p>
          </div>
        </div>
        <div className="ams-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">平均负收益幅度</p>
            <p className="text-2xl font-black text-slate-900">-2.10%</p>
          </div>
        </div>
        <div className="ams-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">盈亏比</p>
            <p className="text-2xl font-black text-slate-900">2.10</p>
          </div>
        </div>
      </div>

      {/* Periodic Returns Chart */}
      <div className="ams-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-ams-accent" />
            周期回报分布
          </h3>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['月度', '季度', '年度'].map((type) => (
              <button
                key={type}
                onClick={() => setPeriodType(type)}
                className={cn(
                  "px-4 py-1 text-[10px] font-bold rounded-md transition-all",
                  periodType === type ? "bg-white text-ams-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={periodicReturns}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
              <Tooltip />
              <Bar dataKey="return" name="收益率 (%)" radius={[4, 4, 0, 0]} barSize={50}>
                {periodicReturns.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#10B981' : '#F43F5E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rolling Returns Chart */}
      <div className="ams-card p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-ams-accent" />
          滚动回报曲线
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rollingReturns}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
              <Line type="monotone" dataKey="m1" name="滚动1个月" stroke="#94A3B8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="m3" name="滚动3个月" stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="m6" name="滚动6个月" stroke="#08255E" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="y1" name="滚动1年" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-4">注：滚动回报展示了组合在不同持有期限下的收益表现稳定性</p>
      </div>
    </div>
  );
};

import { TrendingUp } from 'lucide-react';
