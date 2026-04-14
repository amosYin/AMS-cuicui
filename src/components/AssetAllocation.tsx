import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { Filter, Download, Info, TrendingUp, Globe, Layers, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

const assetData = [
  { name: '股票', value: 45, color: '#08255E', sub: '大盘/中小盘/价值' },
  { name: '债券', value: 30, color: '#3B82F6', sub: '国债/信用债' },
  { name: '基金', value: 15, color: '#F59E0B', sub: '指数/主动' },
  { name: '现金', value: 5, color: '#94A3B8', sub: '货基/存款' },
  { name: '衍生品', value: 5, color: '#10B981', sub: '期权/期货' },
];

const industryData = [
  { name: '食品饮料', value: 18.5 },
  { name: '电子', value: 15.2 },
  { name: '医药生物', value: 12.8 },
  { name: '非银金融', value: 10.5 },
  { name: '电力设备', value: 8.2 },
  { name: '计算机', value: 7.5 },
  { name: '银行', value: 6.8 },
  { name: '汽车', value: 5.4 },
  { name: '国防军工', value: 4.2 },
  { name: '传媒', value: 3.5 },
  { name: '其他', value: 7.4 },
];

const deviationData = [
  { name: '股票', current: 45, target: 40, diff: 5 },
  { name: '债券', current: 30, target: 35, diff: -5 },
  { name: '基金', current: 15, target: 15, diff: 0 },
  { name: '现金', current: 5, target: 5, diff: 0 },
  { name: '衍生品', current: 5, target: 5, diff: 0 },
];

const trendData = [
  { month: '2025-05', stocks: 40, bonds: 35, cash: 15, funds: 10 },
  { month: '2025-07', stocks: 42, bonds: 33, cash: 12, funds: 13 },
  { month: '2025-09', stocks: 38, bonds: 38, cash: 14, funds: 10 },
  { month: '2025-11', stocks: 45, bonds: 30, cash: 10, funds: 15 },
  { month: '2026-01', stocks: 43, bonds: 32, cash: 10, funds: 15 },
  { month: '2026-03', stocks: 45, bonds: 30, cash: 5, funds: 20 },
];

export const AssetAllocation = () => {
  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">资产配置分析</h2>
          <p className="text-sm text-slate-500 mt-1">深度剖析组合资产分布、行业偏离及地域布局。</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
            <Globe className="w-4 h-4" />
            地域对比
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
            <Download className="w-4 h-4" />
            导出配置报表
          </button>
        </div>
      </div>

      {/* Top Row: Tree-like Grid & Industry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="ams-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-ams-accent" />
              资产大类分布 (Treemap 视图)
            </h4>
            <span className="text-[10px] text-slate-400 font-medium italic">点击方块可下钻至二级分类</span>
          </div>
          <div className="grid grid-cols-12 grid-rows-2 gap-2 h-[350px]">
            {/* Mock Treemap with DOM */}
            <div className="col-span-7 row-span-2 bg-ams-primary rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
              <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">股票 Assets</p>
                <h3 className="text-3xl font-black">45.0%</h3>
              </div>
              <p className="text-[10px] opacity-60">大盘/中小盘/价值/成长</p>
            </div>
            <div className="col-span-5 row-span-1 bg-ams-accent rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
              <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">债券 Bonds</p>
                <h3 className="text-xl font-black">30.0%</h3>
              </div>
              <p className="text-[10px] opacity-60">国债/信用债/可转债</p>
            </div>
            <div className="col-span-3 row-span-1 bg-amber-500 rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
              <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">基金 Funds</p>
                <h3 className="text-lg font-black">15.0%</h3>
              </div>
            </div>
            <div className="col-span-2 row-span-1 bg-slate-400 rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
              <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">现金</p>
                <h3 className="text-lg font-black">5.0%</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-ams-accent" />
            行业分布 TOP 10
          </h4>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#475569'}} width={60} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#08255E" radius={[0, 4, 4, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Row: Region & Deviation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="ams-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-ams-accent" />
              地域分布分析
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{name: '国内', value: 85}, {name: '海外', value: 15}]} innerRadius={50} outerRadius={70} dataKey="value">
                    <Cell fill="#08255E" />
                    <Cell fill="#3B82F6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 flex flex-col justify-center">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase">国内市场占比</p>
                <p className="text-xl font-black text-slate-900">85.0%</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase">海外市场占比</p>
                <p className="text-xl font-black text-slate-900">15.0%</p>
                <p className="text-[10px] text-slate-400 mt-1">美股 8% | 港股 5% | 欧洲 2%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-ams-accent" />
            资产配置偏离分析 (vs 目标)
          </h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" domain={[-10, 10]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10}} width={60} />
                <Tooltip />
                <Bar dataKey="diff" barSize={20}>
                  {deviationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.diff >= 0 ? '#3B82F6' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Trend */}
      <div className="ams-card p-6">
        <h4 className="font-bold text-slate-900 mb-6">资产配置变动趋势 (近12个月)</h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
              <Area type="monotone" dataKey="stocks" name="股票" stackId="1" stroke="#08255E" fill="#08255E" fillOpacity={0.8} />
              <Area type="monotone" dataKey="bonds" name="债券" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.7} />
              <Area type="monotone" dataKey="funds" name="基金" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Area type="monotone" dataKey="cash" name="现金" stackId="1" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
