import React from 'react';
import { 
  Plus, 
  X, 
  Download, 
  TrendingUp, 
  ShieldAlert, 
  PieChart as PieChartIcon, 
  Layers, 
  Activity,
  ArrowRight
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
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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

const scatterData = [
  { name: '稳健1号', vol: 12.5, ret: 15.4, aum: 50000 },
  { name: '成长核心', vol: 22.4, ret: 28.2, aum: 35000 },
  { name: '均衡配置', vol: 15.8, ret: 18.5, aum: 42000 },
  { name: '基准指数', vol: 14.2, ret: 12.1, aum: 0 },
];

const radarData = [
  { subject: '波动率', p1: 85, p2: 45, p3: 65 },
  { subject: '最大回撤', p1: 90, p2: 50, p3: 70 },
  { subject: 'VaR', p1: 80, p2: 40, p3: 60 },
  { subject: 'Beta', p1: 75, p2: 95, p3: 85 },
  { subject: '集中度', p1: 60, p2: 85, p3: 75 },
];

const allocationData = [
  { name: '稳健1号', stock: 65, bond: 25, fund: 5, cash: 5 },
  { name: '成长核心', stock: 85, bond: 5, fund: 5, cash: 5 },
  { name: '均衡配置', stock: 45, bond: 40, fund: 10, cash: 5 },
];

export const ProductComparison = () => {
  const [activeTab, setActiveTab] = React.useState('收益表现');

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* 3.1 对比配置栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
            对比产品 (2-6个)
            <div className="flex items-center gap-2 ml-2">
              <span className="flex items-center gap-1 px-2 py-1 bg-ams-primary/10 text-ams-primary rounded-md">
                稳健1号 <X className="w-3 h-3 cursor-pointer" />
              </span>
              <span className="flex items-center gap-1 px-2 py-1 bg-ams-primary/10 text-ams-primary rounded-md">
                成长核心 <X className="w-3 h-3 cursor-pointer" />
              </span>
              <span className="flex items-center gap-1 px-2 py-1 bg-ams-primary/10 text-ams-primary rounded-md">
                均衡配置 <X className="w-3 h-3 cursor-pointer" />
              </span>
              <button className="p-1 bg-slate-200 text-slate-500 rounded-md hover:bg-slate-300">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            对比基准: 沪深300
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            时间范围: 近1年
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-6 py-2 bg-ams-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            开始对比
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { id: '收益表现', icon: TrendingUp },
          { id: '风险指标', icon: ShieldAlert },
          { id: '资产配置', icon: PieChartIcon },
          { id: '持仓结构', icon: Layers },
          { id: '运营数据', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-8 py-4 text-sm font-bold transition-all relative flex items-center gap-2",
              activeTab === tab.id ? "text-ams-primary" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.id}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-ams-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-8">
        {activeTab === '收益表现' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="ams-card p-6 lg:col-span-2">
                <h3 className="text-lg font-bold text-slate-900 mb-6">收益走势对比</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
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
              <div className="ams-card p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">风险收益散点图</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis type="number" dataKey="vol" name="年化波动率" unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} label={{ value: '波动率 (%)', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                      <YAxis type="number" dataKey="ret" name="年化收益率" unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} label={{ value: '收益率 (%)', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                      <ZAxis type="number" dataKey="aum" range={[50, 400]} name="规模" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                      <Scatter name="产品分布" data={scatterData} fill="#08255E">
                        {scatterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 3 ? '#94A3B8' : ['#08255E', '#3B82F6', '#10B981'][index]} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="ams-card overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">对比维度</th>
                    <th className="px-6 py-4 text-right">稳健1号</th>
                    <th className="px-6 py-4 text-right">成长核心</th>
                    <th className="px-6 py-4 text-right">均衡配置</th>
                    <th className="px-6 py-4 text-right">基准指数</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { label: '区间收益率 (%)', p1: '24.50', p2: '10.20', p3: '28.40', b: '10.50' },
                    { label: '年化收益率 (%)', p1: '15.42', p2: '8.25', p3: '18.56', b: '12.10' },
                    { label: '超额收益 (%)', p1: '+14.00', p2: '-0.30', p3: '+17.90', b: '-' },
                    { label: 'Alpha 值 (%)', p1: '5.42', p2: '1.20', p3: '6.85', b: '-' },
                    { label: '信息比率', p1: '1.24', p2: '0.45', p3: '1.56', b: '-' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{row.label}</td>
                      <td className="px-6 py-4 text-right font-mono">{row.p1}</td>
                      <td className="px-6 py-4 text-right font-mono">{row.p2}</td>
                      <td className="px-6 py-4 text-right font-mono">{row.p3}</td>
                      <td className="px-6 py-4 text-right font-mono text-slate-400">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === '风险指标' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="ams-card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">风险多维对比雷达图</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#64748B'}} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="稳健1号" dataKey="p1" stroke="#08255E" fill="#08255E" fillOpacity={0.3} />
                    <Radar name="成长核心" dataKey="p2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Radar name="均衡配置" dataKey="p3" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="ams-card p-6 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-slate-900 mb-6">核心风险指标对比</h3>
              <div className="space-y-4">
                {[
                  { label: '年化波动率', p1: '12.5%', p2: '22.4%', p3: '15.8%', best: 'p1' },
                  { label: '最大回撤', p1: '-8.4%', p2: '-15.2%', p3: '-10.5%', best: 'p1' },
                  { label: '夏普比率', p1: '1.24', p2: '0.36', p3: '1.18', best: 'p1' },
                  { label: 'Beta 值', p1: '0.85', p2: '1.24', p3: '0.95', best: 'p1' },
                ].map((row, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">{row.label}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className={cn("text-sm font-black", row.best === 'p1' ? "text-ams-primary" : "text-slate-900")}>{row.p1}</p>
                          <p className="text-[8px] text-slate-400">稳健1号</p>
                        </div>
                        <div className="text-center">
                          <p className={cn("text-sm font-black", row.best === 'p2' ? "text-ams-primary" : "text-slate-900")}>{row.p2}</p>
                          <p className="text-[8px] text-slate-400">成长核心</p>
                        </div>
                        <div className="text-center">
                          <p className={cn("text-sm font-black", row.best === 'p3' ? "text-ams-primary" : "text-slate-900")}>{row.p3}</p>
                          <p className="text-[8px] text-slate-400">均衡配置</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === '资产配置' && (
          <div className="ams-card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">资产配置堆叠对比</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allocationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} width={80} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                  <Bar dataKey="stock" name="股票" stackId="a" fill="#08255E" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="bond" name="债券" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="fund" name="基金" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="cash" name="现金" stackId="a" fill="#94A3B8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
