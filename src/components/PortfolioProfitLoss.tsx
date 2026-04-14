import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  RefreshCw,
  Calendar,
  Info
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
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const navData = [
  { date: '2025-10', portfolio: 1.00, benchmark: 1.00 },
  { date: '2025-11', portfolio: 1.05, benchmark: 1.02 },
  { date: '2025-12', portfolio: 1.03, benchmark: 1.01 },
  { date: '2026-01', portfolio: 1.12, benchmark: 1.05 },
  { date: '2026-02', portfolio: 1.18, benchmark: 1.08 },
  { date: '2026-03', portfolio: 1.15, benchmark: 1.07 },
  { date: '2026-04', portfolio: 1.24, benchmark: 1.10 },
];

const distributionData = [
  { range: '-5%~-4%', count: 1 },
  { range: '-4%~-3%', count: 2 },
  { range: '-3%~-2%', count: 4 },
  { range: '-2%~-1%', count: 8 },
  { range: '-1%~0%', count: 15 },
  { range: '0%~1%', count: 25 },
  { range: '1%~2%', count: 18 },
  { range: '2%~3%', count: 10 },
  { range: '3%~4%', count: 5 },
  { range: '4%~5%', count: 2 },
];

const StatCard = ({ label, value, subValue, isPositive }: any) => (
  <div className="ams-card p-4 flex flex-col justify-between border-l-4 border-l-ams-primary">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
    <div>
      <h4 className="text-xl font-black text-slate-900">{value}</h4>
      {subValue && (
        <p className={cn(
          "text-[10px] font-bold mt-1 flex items-center gap-1",
          isPositive === true ? "text-emerald-600" : isPositive === false ? "text-rose-600" : "text-slate-500"
        )}>
          {isPositive === true && <ArrowUpRight className="w-3 h-3" />}
          {isPositive === false && <ArrowDownRight className="w-3 h-3" />}
          {subValue}
        </p>
      )}
    </div>
  </div>
);

export const PortfolioProfitLoss = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">组合盈亏分析</h2>
          <p className="text-sm text-slate-500 mt-1">深度分析组合收益来源与风险特征</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-bold text-slate-700 hover:bg-slate-50">
            <RefreshCw className="w-4 h-4" />
            切换组合
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出报告
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard label="累计收益率" value="24.52%" subValue="+1.2% (近1月)" isPositive={true} />
        <StatCard label="年化收益率" value="12.45%" />
        <StatCard label="同期基准收益" value="10.20%" />
        <StatCard label="超额收益" value="+14.32%" isPositive={true} />
        <StatCard label="最大回撤" value="-8.42%" isPositive={false} />
        <StatCard label="夏普比率" value="1.85" />
        <StatCard label="波动率" value="15.42%" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NAV Chart */}
        <div className="ams-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ams-accent" />
              收益走势对比
            </h3>
            <div className="flex gap-2">
              {['近1月', '近3月', '近6月', '近1年', '成立以来'].map((p) => (
                <button key={p} className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded border transition-all",
                  p === '近1年' ? "bg-ams-primary text-white border-ams-primary" : "bg-white text-slate-500 border-slate-200 hover:border-ams-primary"
                )}>{p}</button>
              ))}
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={navData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                <Line type="monotone" dataKey="portfolio" name="本组合净值" stroke="#08255E" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="benchmark" name="基准 (沪深300)" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="ams-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-ams-accent" />
              收益分布图
            </h3>
            <select className="text-[10px] font-bold border border-slate-200 rounded px-2 py-1 bg-white">
              <option>月度收益率</option>
              <option>季度收益率</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} />
                <Bar dataKey="count" fill="#08255E" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-4">注：柱状图展示收益率分布，叠加正态分布参考线（模拟）</p>
        </div>
      </div>

      {/* Risk Metrics Table */}
      <div className="ams-card">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">风险指标明细</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">风险指标</th>
                <th className="px-6 py-4 text-right">组合数值</th>
                <th className="px-6 py-4 text-right">基准数值</th>
                <th className="px-6 py-4 text-right">差值 (Active)</th>
                <th className="px-6 py-4">评估结论</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: '年化收益率', value: '12.45%', bench: '10.20%', diff: '+2.25%', status: '优于基准' },
                { name: '年化波动率', value: '15.42%', bench: '14.80%', diff: '+0.62%', status: '风险略高' },
                { name: '最大回撤', value: '-8.42%', bench: '-12.50%', diff: '+4.08%', status: '回撤控制极佳' },
                { name: '夏普比率', value: '1.85', bench: '1.42', diff: '+0.43', status: '风险收益比优异' },
                { name: '卡玛比率', value: '1.48', bench: '0.82', diff: '+0.66', status: '优于基准' },
                { name: '信息比率', value: '1.52', bench: '--', diff: '--', status: '超额收益稳定性高' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 text-right font-mono">{row.value}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-500">{row.bench}</td>
                  <td className={cn(
                    "px-6 py-4 text-right font-bold font-mono",
                    row.diff.startsWith('+') ? "text-emerald-600" : row.diff === '--' ? "text-slate-400" : "text-rose-600"
                  )}>{row.diff}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      row.status.includes('优') || row.status.includes('佳') ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    )}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
