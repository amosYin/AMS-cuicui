import React from 'react';
import { 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Download, 
  Upload,
  Calendar,
  History
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';

const positionTrendData = [
  { date: '2025-10', position: 75, index: 3200 },
  { date: '2025-11', position: 82, index: 3350 },
  { date: '2025-12', position: 78, index: 3300 },
  { date: '2026-01', position: 85, index: 3500 },
  { date: '2026-02', position: 90, index: 3650 },
  { date: '2026-03', position: 88, index: 3600 },
  { date: '2026-04', position: 92, index: 3750 },
];

const currentAllocation = [
  { name: '股票', value: 72, color: '#08255E' },
  { name: '债券', value: 18, color: '#3B82F6' },
  { name: '商品', value: 5, color: '#94A3B8' },
  { name: '现金', value: 5, color: '#E2E8F0' },
];

const changeHistory = [
  { date: '2026-04-10', before: '88%', after: '92%', change: '+4%', reason: '看好二季度市场反弹，加仓成长板块' },
  { date: '2026-03-15', before: '90%', after: '88%', change: '-2%', reason: '市场波动加剧，适度减仓规避风险' },
  { date: '2026-02-20', before: '85%', after: '90%', change: '+5%', reason: '政策利好释放，提升整体仓位' },
  { date: '2026-01-05', before: '78%', after: '85%', change: '+7%', reason: '年初建仓，布局核心资产' },
];

export const PositionTracking = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">仓位追踪</h2>
          <p className="text-sm text-slate-500 mt-1">监控仓位变动，评估择时效果与资产分布</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-bold text-slate-700 hover:bg-slate-50">
            <Upload className="w-4 h-4" />
            导入仓位数据
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出仓位报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Position Trend Chart */}
        <div className="ams-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-ams-accent" />
              仓位走势与大盘对比
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-ams-primary" /> 组合仓位 (%)</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-400" /> 沪深300指数</span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={positionTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={['auto', 'auto']} />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="position" name="组合仓位 (%)" fill="#08255E" stroke="#08255E" fillOpacity={0.1} />
                <Line yAxisId="right" type="monotone" dataKey="index" name="沪深300" stroke="#94A3B8" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Allocation Pie */}
        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-ams-accent" />
            当前仓位分布
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentAllocation}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {currentAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {currentAllocation.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Change History Table */}
      <div className="ams-card">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-ams-accent" />
            仓位变动明细
          </h3>
          <button className="text-xs font-bold text-ams-primary hover:underline">查看完整历史</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">调仓日期</th>
                <th className="px-6 py-4 text-right">调整前仓位</th>
                <th className="px-6 py-4 text-right">调整后仓位</th>
                <th className="px-6 py-4 text-right">变动幅度</th>
                <th className="px-6 py-4">调仓原因备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {changeHistory.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono text-slate-900">{row.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-500">{row.before}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{row.after}</td>
                  <td className={cn(
                    "px-6 py-4 text-right font-mono font-bold",
                    row.change.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                  )}>{row.change}</td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import { ComposedChart } from 'recharts';
