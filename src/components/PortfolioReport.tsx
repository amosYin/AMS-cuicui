import React from 'react';
import { 
  Download, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  PieChart as PieChartIcon, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  Calendar,
  Filter
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
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from '../lib/utils';

const performanceData = [
  { date: '2025-10', portfolio: 1.00, benchmark: 1.00 },
  { date: '2025-11', portfolio: 1.05, benchmark: 1.02 },
  { date: '2025-12', portfolio: 1.03, benchmark: 1.01 },
  { date: '2026-01', portfolio: 1.12, benchmark: 1.05 },
  { date: '2026-02', portfolio: 1.18, benchmark: 1.08 },
  { date: '2026-03', portfolio: 1.15, benchmark: 1.07 },
  { date: '2026-04', portfolio: 1.24, benchmark: 1.10 },
];

const distributionData = [
  { range: '-5%~-3%', count: 2 },
  { range: '-3%~-1%', count: 5 },
  { range: '-1%~1%', count: 12 },
  { range: '1%~3%', count: 18 },
  { range: '3%~5%', count: 8 },
  { range: '5%+', count: 3 },
];

const concentrationData = [
  { name: '前十大持仓', value: 42, color: '#08255E' },
  { name: '其他', value: 58, color: '#E2E8F0' },
];

const holdings = [
  { name: '腾讯控股', code: '00700.HK', amount: '50,000', marketValue: '1,845.20', ratio: '8.45%', cost: '320.50', price: '369.04', profit: '+242.70', profitRate: '+15.14%', industry: '互联网' },
  { name: '贵州茅台', code: '600519.SH', amount: '8,000', marketValue: '1,320.40', ratio: '6.05%', cost: '1,580.00', price: '1,650.50', profit: '+56.40', profitRate: '+4.46%', industry: '白酒' },
  { name: '宁德时代', code: '300750.SZ', amount: '25,000', marketValue: '985.00', ratio: '4.51%', cost: '420.00', price: '394.00', profit: '-65.00', profitRate: '-6.19%', industry: '新能源' },
  { name: '招商银行', code: '600036.SH', amount: '150,000', marketValue: '540.00', ratio: '2.47%', cost: '32.50', price: '36.00', profit: '+52.50', profitRate: '+10.77%', industry: '银行' },
  { name: '美团-W', code: '03690.HK', amount: '40,000', marketValue: '412.80', ratio: '1.89%', cost: '115.20', price: '103.20', profit: '-48.00', profitRate: '-10.42%', industry: '生活服务' },
];

const StatCard = ({ label, value, subValue, isPositive }: any) => (
  <div className="ams-card p-4 flex flex-col justify-between">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
    <div>
      <h4 className="text-xl font-bold text-slate-900">{value}</h4>
      {subValue && (
        <p className={cn(
          "text-xs font-bold mt-1 flex items-center gap-1",
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

export const PortfolioReport = () => {
  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-ams-primary tracking-tight">稳健增长核心组合</h2>
            <span className="px-2 py-1 bg-ams-accent/10 text-ams-accent text-[10px] font-bold rounded uppercase">Active</span>
          </div>
          <p className="text-sm text-slate-500 mt-2 flex items-center gap-4">
            <span>投资经理: <b>张大为</b></span>
            <span>基准指数: <b>沪深300指数</b></span>
            <span>成立日期: <b>2023-01-15</b></span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            历史报告
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold hover:bg-ams-secondary transition-all shadow-md">
            <Download className="w-4 h-4" />
            一键生成报告 (PDF)
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="组合规模" value="¥21,845.20万" />
        <StatCard label="最新净值" value="1.2452" subValue="+0.0124" isPositive={true} />
        <StatCard label="当日收益率" value="+1.02%" subValue="跑赢基准 0.45%" isPositive={true} />
        <StatCard label="累计收益率" value="+24.52%" subValue="年化: 12.45%" isPositive={true} />
        <StatCard label="最大回撤" value="-8.42%" subValue="发生于: 2024-02-05" isPositive={false} />
        <StatCard label="夏普比率" value="1.85" subValue="同类排名: Top 5%" isPositive={true} />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="ams-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-ams-accent" />
              组合收益走势对比
            </h4>
            <div className="flex gap-2">
              {['1M', '3M', '6M', '1Y', '成立以来'].map((p) => (
                <button key={p} className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded",
                  p === '1Y' ? "bg-ams-primary text-white" : "text-slate-500 hover:bg-slate-100"
                )}>{p}</button>
              ))}
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                <Line type="monotone" dataKey="portfolio" name="本组合净值" stroke="#08255E" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="benchmark" name="基准(沪深300)" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Indicators */}
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-ams-accent" />
            核心风险指标
          </h4>
          <div className="space-y-4">
            {[
              { label: '年化波动率', value: '15.42%', status: 'Normal' },
              { label: 'Beta 值', value: '0.92', status: 'Low' },
              { label: 'Alpha 值 (年化)', value: '4.85%', status: 'High' },
              { label: '跟踪误差', value: '3.20%', status: 'Normal' },
              { label: '信息比率', value: '1.52', status: 'High' },
              { label: 'VaR (95%, 1D)', value: '¥42.15万', status: 'Normal' },
              { label: 'CVaR (95%)', value: '¥58.40万', status: 'Normal' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  <span className={cn(
                    "text-[8px] font-black uppercase px-1 rounded",
                    item.status === 'High' ? "bg-emerald-100 text-emerald-700" : 
                    item.status === 'Low' ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  )}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="ams-card">
        <div className="p-6 border-b border-ams-border flex items-center justify-between">
          <h4 className="font-bold text-slate-900">组合持仓明细</h4>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <select className="pl-8 pr-4 py-1.5 bg-slate-50 border border-ams-border rounded text-xs focus:outline-none">
                <option>所有行业</option>
                <option>互联网</option>
                <option>白酒</option>
                <option>新能源</option>
              </select>
            </div>
            <button className="text-xs font-bold text-ams-accent">查看全部持仓</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-3">证券名称</th>
                <th className="px-6 py-3">证券代码</th>
                <th className="px-6 py-3 text-right">持仓数量</th>
                <th className="px-6 py-3 text-right">市值(万元)</th>
                <th className="px-6 py-3 text-right">占比</th>
                <th className="px-6 py-3 text-right">现价(元)</th>
                <th className="px-6 py-3 text-right">浮动盈亏</th>
                <th className="px-6 py-3 text-right">盈亏率</th>
                <th className="px-6 py-3">行业</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {holdings.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono">{item.code}</td>
                  <td className="px-6 py-4 text-right font-mono">{item.amount}</td>
                  <td className="px-6 py-4 text-right font-bold text-ams-primary">{item.marketValue}</td>
                  <td className="px-6 py-4 text-right font-medium">{item.ratio}</td>
                  <td className="px-6 py-4 text-right font-mono">{item.price}</td>
                  <td className={cn(
                    "px-6 py-4 text-right font-bold",
                    item.profit.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                  )}>{item.profit}</td>
                  <td className={cn(
                    "px-6 py-4 text-right font-bold",
                    item.profitRate.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                  )}>{item.profitRate}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">{item.industry}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Return Distribution */}
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-ams-accent" />
            月度收益率分布
          </h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Concentration */}
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-ams-accent" />
            持仓集中度分析
          </h4>
          <div className="grid grid-cols-2 gap-8">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={concentrationData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {concentrationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-2">
                <p className="text-xs font-bold text-slate-900">前十大持仓占比</p>
                <p className="text-lg font-black text-ams-primary">42.0%</p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">第一大持仓占比</p>
                <p className="text-xl font-black text-slate-900">8.45%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">行业集中度 TOP3</p>
                <p className="text-xl font-black text-slate-900">24.1%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">持仓证券数量</p>
                <p className="text-xl font-black text-slate-900">42 只</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Overview */}
      <div className="ams-card p-6">
        <h4 className="font-bold text-slate-900 mb-6">报告期内交易概览</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: '累计买入金额', value: '¥1,245.80万', icon: ArrowUpRight, color: 'text-emerald-600' },
            { label: '累计卖出金额', value: '¥842.15万', icon: ArrowDownRight, color: 'text-rose-600' },
            { label: '交易总次数', value: '124 次', icon: Activity, color: 'text-blue-600' },
            { label: '区间换手率', value: '12.45%', icon: TrendingUp, color: 'text-ams-primary' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className={cn("p-2 bg-white rounded-lg shadow-sm", item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                <p className="text-lg font-black text-slate-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { BarChart3, Activity } from 'lucide-react';
