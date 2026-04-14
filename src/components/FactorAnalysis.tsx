import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { 
  BarChart3, 
  Layers, 
  Download, 
  Settings,
  ChevronDown,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

const styleData = [
  { factor: '市值', portfolio: 0.85, benchmark: 0.65 },
  { factor: '价值', portfolio: 0.42, benchmark: 0.50 },
  { factor: '动量', portfolio: 0.78, benchmark: 0.45 },
  { factor: '波动率', portfolio: 0.35, benchmark: 0.40 },
  { factor: '成长', portfolio: 0.92, benchmark: 0.70 },
  { factor: '流动性', portfolio: 0.58, benchmark: 0.55 },
];

const factorReturnData = [
  { date: '2026-01', size: 1.2, value: 0.5, momentum: 2.1, growth: 1.8 },
  { date: '2026-02', size: -0.5, value: 0.8, momentum: 1.5, growth: 2.2 },
  { date: '2026-03', size: 0.8, value: -0.2, momentum: -0.5, growth: 1.2 },
  { date: '2026-04', size: 1.5, value: 0.4, momentum: 1.8, growth: 2.5 },
];

const factorAttributionData = [
  { name: '基准收益', value: 3.2, fill: '#94A3B8' },
  { name: '市值因子', value: 0.8, fill: '#08255E' },
  { name: '价值因子', value: -0.3, fill: '#F43F5E' },
  { name: '动量因子', value: 1.2, fill: '#08255E' },
  { name: '成长因子', value: 1.5, fill: '#08255E' },
  { name: '其他因子', value: 0.4, fill: '#3B82F6' },
  { name: '组合收益', value: 6.8, fill: '#10B981' },
];

export const FactorAnalysis = ({ initialTab = '因子风格' }: { initialTab?: string }) => {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">因子分析</h2>
          <p className="text-sm text-slate-500 mt-1">透视组合因子暴露，量化风格偏好与收益贡献</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700">
            <Settings className="w-3.5 h-3.5" />
            选择因子模型
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出因子分析结果
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {['因子风格', '因子收益', '因子归因'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-4 text-sm font-bold transition-all relative",
              activeTab === tab ? "text-ams-primary" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-ams-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-8">
        {activeTab === '因子风格' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Radar Chart */}
            <div className="ams-card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">因子暴露雷达图 (组合 vs 基准)</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={styleData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="factor" tick={{fontSize: 12, fill: '#64748B'}} />
                    <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
                    <Radar name="本组合" dataKey="portfolio" stroke="#08255E" fill="#08255E" fillOpacity={0.3} />
                    <Radar name="基准" dataKey="benchmark" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} />
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Exposure Bar Chart */}
            <div className="ams-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">因子暴露偏离度</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">时间轴滑块 (模拟)</span>
                  <div className="w-32 h-1 bg-slate-200 rounded-full relative">
                    <div className="absolute left-3/4 -top-1.5 w-4 h-4 bg-ams-primary rounded-full shadow-sm border-2 border-white" />
                  </div>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={styleData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <YAxis dataKey="factor" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} width={60} />
                    <Tooltip />
                    <Bar dataKey="portfolio" name="组合暴露" fill="#08255E" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="benchmark" name="基准暴露" fill="#94A3B8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === '因子收益' && (
          <div className="space-y-8">
            <div className="ams-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">因子收益贡献 (时间序列)</h3>
                <select className="text-[10px] font-bold border border-slate-200 rounded px-2 py-1 bg-white">
                  <option>绝对贡献</option>
                  <option>相对贡献</option>
                </select>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={factorReturnData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                    <Bar dataKey="size" name="市值因子" stackId="a" fill="#08255E" />
                    <Bar dataKey="value" name="价值因子" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="momentum" name="动量因子" stackId="a" fill="#94A3B8" />
                    <Bar dataKey="growth" name="成长因子" stackId="a" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="ams-card">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">因子收益明细表</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">因子名称</th>
                      <th className="px-6 py-4 text-right">因子收益率 (%)</th>
                      <th className="px-6 py-4 text-right">组合暴露度</th>
                      <th className="px-6 py-4 text-right">贡献值 (%)</th>
                      <th className="px-6 py-4">贡献评级</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: '市值因子', return: '1.25', exposure: '0.85', contribution: '1.06', status: '正向贡献' },
                      { name: '价值因子', return: '0.42', exposure: '0.42', contribution: '0.18', status: '正向贡献' },
                      { name: '动量因子', return: '1.85', exposure: '0.78', contribution: '1.44', status: '核心驱动' },
                      { name: '波动率因子', return: '-0.52', exposure: '0.35', contribution: '-0.18', status: '负向拖累' },
                      { name: '成长因子', return: '2.10', exposure: '0.92', contribution: '1.93', status: '核心驱动' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                        <td className="px-6 py-4 text-right font-mono">{row.return}</td>
                        <td className="px-6 py-4 text-right font-mono">{row.exposure}</td>
                        <td className={cn("px-6 py-4 text-right font-mono font-bold", row.contribution.startsWith('-') ? "text-rose-600" : "text-emerald-600")}>
                          {row.contribution.startsWith('-') ? row.contribution : `+${row.contribution}`}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold",
                            row.status === '核心驱动' ? "bg-emerald-100 text-emerald-700" : 
                            row.status === '负向拖累' ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"
                          )}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === '因子归因' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="ams-card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">因子归因分解 (瀑布图示例)</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={factorAttributionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} width={80} />
                    <Tooltip />
                    <Bar dataKey="value" name="收益贡献 (%)" radius={[0, 4, 4, 0]}>
                      {factorAttributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-4">注：展示从基准收益到组合收益的逐步因子分解过程</p>
            </div>
            <div className="ams-card p-6 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ams-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5 text-ams-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">归因分解逻辑</h4>
                    <p className="text-sm text-slate-500 mt-1">
                      因子归因系统性地将超额收益拆解为因子配置收益（Factor Allocation）和因子选择收益（Factor Selection）。
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-ams-accent" />
                    分析结论
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    本报告期内，组合超额收益主要来源于对<b>成长因子</b>和<b>动量因子</b>的高暴露。市值因子的正向贡献抵消了价值因子的负向拖累。整体风格偏向高成长、高动量的大盘股。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
