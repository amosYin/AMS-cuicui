import React from 'react';
import { 
  Search, 
  RefreshCw, 
  Download, 
  Save, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle,
  ChevronDown,
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const performanceData = [
  { date: '2025-10', p1: 1.00, p2: 1.00, p3: 1.00, benchmark: 1.00 },
  { date: '2025-11', p1: 1.05, p2: 1.02, p3: 1.08, benchmark: 1.02 },
  { date: '2025-12', p1: 1.03, p2: 1.01, p3: 1.05, benchmark: 1.01 },
  { date: '2026-01', p1: 1.12, p2: 1.05, p3: 1.15, benchmark: 1.05 },
  { date: '2026-02', p1: 1.18, p2: 1.08, p3: 1.22, benchmark: 1.08 },
  { date: '2026-03', p1: 1.15, p2: 1.07, p3: 1.18, benchmark: 1.07 },
  { date: '2026-04', p1: 1.24, p2: 1.10, p3: 1.28, benchmark: 1.10 },
];

const assetAllocationData = [
  { name: '稳健1号', stock: 65, bond: 25, fund: 5, cash: 5 },
  { name: '成长核心', stock: 85, bond: 5, fund: 5, cash: 5 },
  { name: '均衡配置', stock: 45, bond: 40, fund: 10, cash: 5 },
  { name: '价值优选', stock: 75, bond: 15, fund: 5, cash: 5 },
];

const industryData = [
  { name: '信息技术', value: 28.5 },
  { name: '金融', value: 18.2 },
  { name: '消费', value: 15.4 },
  { name: '工业', value: 12.1 },
  { name: '医药', value: 10.5 },
  { name: '能源', value: 5.2 },
  { name: '原材料', value: 4.1 },
  { name: '公用事业', value: 3.0 },
  { name: '房地产', value: 2.0 },
  { name: '通信', value: 1.0 },
];

const aumTrendData = [
  { date: '2025-10', aum: 120000, flow: 5000 },
  { date: '2025-11', aum: 135000, flow: 8000 },
  { date: '2025-12', aum: 132000, flow: -2000 },
  { date: '2026-01', aum: 150000, flow: 12000 },
  { date: '2026-02', aum: 165000, flow: 10000 },
  { date: '2026-03', aum: 162000, flow: -3000 },
  { date: '2026-04', aum: 185000, flow: 15000 },
];

const StatCard = ({ label, value, subValue, isPositive, isAlert }: any) => (
  <div className={cn(
    "ams-card p-4 flex flex-col justify-between border-l-4",
    isAlert ? "border-l-rose-500" : "border-l-ams-primary"
  )}>
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
    <div>
      <h4 className={cn("text-xl font-black", isAlert ? "text-rose-600" : "text-slate-900")}>{value}</h4>
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

export const ProductPanorama = () => {
  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* 1.1 筛选条件栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索产品名称/代码..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ams-primary/20 w-64"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            产品类型 <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            时间范围 <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            投资经理 <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">
            <Save className="w-4 h-4" />
            保存视图
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出报告
          </button>
        </div>
      </div>

      {/* 1.2 板块一：产品总览指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <StatCard label="产品总数" value="42" />
        <StatCard label="总规模 AUM" value="18.52亿" subValue="+12.4% (环比)" isPositive={true} />
        <StatCard label="加权平均收益" value="12.45%" subValue="跑赢基准 2.1%" isPositive={true} />
        <StatCard label="平均最大回撤" value="-8.42%" />
        <StatCard label="正收益占比" value="85.7%" />
        <StatCard label="风险预警数" value="3" isAlert={true} />
        <StatCard label="总持仓证券" value="1,245" />
        <StatCard label="行业覆盖数" value="28" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1.3 板块二：产品业绩走势对比 */}
        <div className="ams-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ams-accent" />
              产品业绩走势对比
            </h3>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold text-ams-primary hover:underline">仅显示TOP10</button>
              <button className="text-[10px] font-bold text-slate-500 hover:underline">选择基准</button>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={['auto', 'auto']} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                <Line type="monotone" dataKey="p1" name="稳健1号" stroke="#08255E" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p2" name="成长核心" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p3" name="均衡配置" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="benchmark" name="基准指数" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 1.4 板块三：资产配置总览 (行业分布) */}
        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Filter className="w-5 h-5 text-ams-accent" />
            行业分布 TOP10
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} width={60} />
                <Tooltip />
                <Bar dataKey="value" name="占比 (%)" fill="#08255E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1.5 板块四：产品规模走势 */}
        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">产品规模走势 (AUM)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aumTrendData}>
                <defs>
                  <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#08255E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#08255E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="aum" name="总规模 (万)" stroke="#08255E" fillOpacity={1} fill="url(#colorAum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 1.4 板块三：资产配置总览 (资产类别) */}
        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">产品资产配置分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assetAllocationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                <Bar dataKey="stock" name="股票" stackId="a" fill="#08255E" />
                <Bar dataKey="bond" name="债券" stackId="a" fill="#3B82F6" />
                <Bar dataKey="fund" name="基金" stackId="a" fill="#10B981" />
                <Bar dataKey="cash" name="现金" stackId="a" fill="#94A3B8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 1.6 板块五：产品风险仪表盘 */}
      <div className="ams-card">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">风险预警产品列表</h3>
          <button className="text-xs font-bold text-ams-primary hover:underline">设置风险阈值</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">产品名称</th>
                <th className="px-6 py-4">预警类型</th>
                <th className="px-6 py-4">预警等级</th>
                <th className="px-6 py-4 text-right">当前值</th>
                <th className="px-6 py-4 text-right">阈值</th>
                <th className="px-6 py-4">处理状态</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: '稳健增长1号', type: '最大回撤超限', level: '高', value: '-12.45%', limit: '-10.00%', status: '待处理' },
                { name: '科技先锋专户', type: '波动率超限', level: '中', value: '28.40%', limit: '25.00%', status: '处理中' },
                { name: '均衡配置FOF', type: '集中度超标', level: '低', value: '12.50%', limit: '10.00%', status: '已忽略' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 text-slate-600">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      row.level === '高' ? "bg-rose-100 text-rose-700" : 
                      row.level === '中' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    )}>{row.level}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">{row.value}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-500">{row.limit}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        row.status === '待处理' ? "bg-rose-500" : row.status === '处理中' ? "bg-amber-500" : "bg-slate-300"
                      )} />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-ams-primary font-bold hover:underline">查看详情</button>
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
