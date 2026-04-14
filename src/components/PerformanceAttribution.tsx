import React from 'react';
import { 
  BarChart3, 
  Layers, 
  PieChart as PieChartIcon, 
  Download, 
  Filter,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell,
  ComposedChart,
  Line
} from 'recharts';
import { cn } from '../lib/utils';

const brinsonData = [
  { name: '配置收益', value: 2.45, fill: '#08255E' },
  { name: '个股选择收益', value: 4.82, fill: '#3B82F6' },
  { name: '交叉收益', value: 0.58, fill: '#94A3B8' },
  { name: '总超额收益', value: 7.85, fill: '#10B981' },
];

const industryData = [
  { name: '信息技术', portfolio: 25.4, benchmark: 18.2, allocation: 0.85, selection: 1.42 },
  { name: '金融', portfolio: 15.2, benchmark: 20.5, allocation: 0.42, selection: -0.15 },
  { name: '消费', portfolio: 18.5, benchmark: 15.0, allocation: 0.35, selection: 0.95 },
  { name: '工业', portfolio: 12.0, benchmark: 14.5, allocation: -0.12, selection: 0.45 },
  { name: '医药', portfolio: 10.5, benchmark: 8.5, allocation: 0.25, selection: 0.65 },
];

const campisiData = [
  { name: '息票收益', value: 3.2, fill: '#08255E' },
  { name: '价格收敛收益', value: 1.5, fill: '#3B82F6' },
  { name: '国债效应', value: -0.8, fill: '#F43F5E' },
  { name: '利差效应', value: 2.1, fill: '#10B981' },
];

const multiAssetData = [
  { name: '股票', allocation: 1.2, selection: 2.5 },
  { name: '债券', allocation: 0.5, selection: 0.8 },
  { name: '商品', allocation: -0.3, selection: 0.2 },
  { name: '现金', allocation: 0.1, selection: 0.0 },
];

export const PerformanceAttribution = () => {
  const [activeTab, setActiveTab] = React.useState('Brinson归因');

  return (
    <div className="p-8 space-y-8">
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">组合业绩归因</h2>
          <p className="text-sm text-slate-500 mt-1">拆解收益来源，识别超额收益核心驱动力</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5" />
            筛选条件
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出归因结果
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {['Brinson归因', 'Campisi归因', '多资产归因'].map((tab) => (
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
        {activeTab === 'Brinson归因' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Allocation Comparison */}
              <div className="ams-card p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">资产配置比例对比 (组合 vs 基准)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={industryData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                      <Tooltip />
                      <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                      <Bar dataKey="portfolio" name="组合占比 (%)" fill="#08255E" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="benchmark" name="基准占比 (%)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Attribution Waterfall (Simulated with Bar) */}
              <div className="ams-card p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Brinson 归因分解结果</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={brinsonData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} width={100} />
                      <Tooltip />
                      <Bar dataKey="value" name="收益贡献 (%)" radius={[0, 4, 4, 0]} barSize={30}>
                        {brinsonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-4">注：展示配置收益、个股选择收益及交叉收益的贡献分解</p>
              </div>
            </div>

            {/* Industry Detail Table */}
            <div className="ams-card">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">行业归因明细表</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">行业名称</th>
                      <th className="px-6 py-4 text-right">组合权重 (%)</th>
                      <th className="px-6 py-4 text-right">基准权重 (%)</th>
                      <th className="px-6 py-4 text-right">配置收益 (%)</th>
                      <th className="px-6 py-4 text-right">选择收益 (%)</th>
                      <th className="px-6 py-4 text-right">总贡献 (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {industryData.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                        <td className="px-6 py-4 text-right font-mono">{row.portfolio.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right font-mono text-slate-500">{row.benchmark.toFixed(2)}</td>
                        <td className={cn("px-6 py-4 text-right font-mono font-bold", row.allocation >= 0 ? "text-emerald-600" : "text-rose-600")}>
                          {row.allocation >= 0 ? `+${row.allocation.toFixed(2)}` : row.allocation.toFixed(2)}
                        </td>
                        <td className={cn("px-6 py-4 text-right font-mono font-bold", row.selection >= 0 ? "text-emerald-600" : "text-rose-600")}>
                          {row.selection >= 0 ? `+${row.selection.toFixed(2)}` : row.selection.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-ams-primary">
                          {(row.allocation + row.selection).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Campisi归因' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="ams-card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">债券组合收益分解 (Campisi 模型)</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campisiData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <Tooltip />
                    <Bar dataKey="value" name="收益贡献 (%)" radius={[4, 4, 0, 0]} barSize={50}>
                      {campisiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">息票收益贡献</p>
                  <p className="text-xl font-black text-emerald-600">+3.2%</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">利差效应贡献</p>
                  <p className="text-xl font-black text-emerald-600">+2.1%</p>
                </div>
              </div>
            </div>
            <div className="ams-card p-6 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ams-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5 text-ams-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">收益分解说明</h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Campisi归因将债券收益拆解为：息票收益（票息）、价格收敛收益（拉力效应）、国债效应（基准利率变动）和利差效应（信用利差变动）。
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl text-white">
                  <h4 className="text-sm font-bold mb-4">模型参数</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">基准曲线</span>
                      <span>中债国债收益率曲线</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">信用利差定义</span>
                      <span>中债中短期票据(AAA) - 国债</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">计算频率</span>
                      <span>日度计算，月度汇总</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '多资产归因' && (
          <div className="space-y-8">
            <div className="ams-card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">跨资产类别归因结果</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={multiAssetData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                    <Bar dataKey="allocation" name="配置贡献 (%)" fill="#08255E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="selection" name="选择贡献 (%)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="ams-card p-6 border-t-4 border-t-ams-primary">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">核心资产贡献 (股票)</h4>
                <p className="text-2xl font-black text-slate-900">+3.7%</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">主要由个股选择驱动</p>
              </div>
              <div className="ams-card p-6 border-t-4 border-t-ams-accent">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">避险资产贡献 (现金)</h4>
                <p className="text-2xl font-black text-slate-900">+0.1%</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">保持流动性，贡献有限</p>
              </div>
              <div className="ams-card p-6 border-t-4 border-t-rose-500">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">负向拖累资产 (商品)</h4>
                <p className="text-2xl font-black text-slate-900">-0.1%</p>
                <p className="text-[10px] text-rose-600 font-bold mt-1">配置比例偏高导致拖累</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
