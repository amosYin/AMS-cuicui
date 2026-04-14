import React from 'react';
import { 
  Settings, 
  Download, 
  RefreshCw, 
  Info,
  Network,
  Grid,
  TrendingUp,
  ShieldCheck
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

const matrixData = [
  { a: '稳健1号', b: '稳健1号', val: 1.00 },
  { a: '稳健1号', b: '成长核心', val: 0.45 },
  { a: '稳健1号', b: '均衡配置', val: 0.72 },
  { a: '稳健1号', b: '沪深300', val: 0.65 },
  { a: '成长核心', b: '稳健1号', val: 0.45 },
  { a: '成长核心', b: '成长核心', val: 1.00 },
  { a: '成长核心', b: '均衡配置', val: 0.38 },
  { a: '成长核心', b: '沪深300', val: 0.82 },
  { a: '均衡配置', b: '稳健1号', val: 0.72 },
  { a: '均衡配置', b: '成长核心', val: 0.38 },
  { a: '均衡配置', b: '均衡配置', val: 1.00 },
  { a: '均衡配置', b: '沪深300', val: 0.55 },
  { a: '沪深300', b: '稳健1号', val: 0.65 },
  { a: '沪深300', b: '成长核心', val: 0.82 },
  { a: '沪深300', b: '均衡配置', val: 0.55 },
  { a: '沪深300', b: '沪深300', val: 1.00 },
];

const rollingCorrData = [
  { date: '2025-10', val: 0.65 },
  { date: '2025-11', val: 0.68 },
  { date: '2025-12', val: 0.72 },
  { date: '2026-01', val: 0.62 },
  { date: '2026-02', val: 0.58 },
  { date: '2026-03', val: 0.64 },
  { date: '2026-04', val: 0.70 },
];

const diversificationData = [
  { name: '稳健1号', actual: 12.5, expected: 15.4 },
  { name: '成长核心', actual: 22.4, expected: 25.2 },
  { name: '均衡配置', actual: 15.8, expected: 18.5 },
];

const getHeatColor = (val: number) => {
  if (val >= 0.7) return 'bg-rose-600 text-white';
  if (val >= 0.3) return 'bg-rose-400 text-white';
  if (val >= -0.3) return 'bg-slate-50 text-slate-900';
  if (val >= -0.7) return 'bg-emerald-400 text-white';
  return 'bg-emerald-600 text-white';
};

export const CorrelationAnalysis = () => {
  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* 4.1 参数配置栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            分析对象: 产品之间相关性
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            选择对象 (4个)
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            窗口期: 近1年
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            频率: 日频
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            方法: Pearson
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-6 py-2 bg-ams-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            开始计算
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 4.2 相关性矩阵图 */}
        <div className="ams-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-5 h-5 text-ams-accent" />
              相关性矩阵热力图
            </h3>
            <button className="text-[10px] font-bold text-ams-primary hover:underline flex items-center gap-1">
              <Settings className="w-3 h-3" /> 重排序
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1">
            <div className="h-12" />
            {['稳健1号', '成长核心', '均衡配置', '沪深300'].map(name => (
              <div key={name} className="h-12 flex items-center justify-center text-[10px] font-bold text-slate-500 text-center px-1">
                {name}
              </div>
            ))}
            {['稳健1号', '成长核心', '均衡配置', '沪深300'].map(row => (
              <React.Fragment key={row}>
                <div className="h-12 flex items-center justify-end pr-2 text-[10px] font-bold text-slate-500 text-right">
                  {row}
                </div>
                {['稳健1号', '成长核心', '均衡配置', '沪深300'].map(col => {
                  const val = matrixData.find(d => d.a === row && d.b === col)?.val || 0;
                  return (
                    <div 
                      key={col} 
                      className={cn(
                        "h-12 flex items-center justify-center text-xs font-mono font-bold rounded-sm transition-transform hover:scale-105 cursor-pointer",
                        getHeatColor(val)
                      )}
                    >
                      {val.toFixed(2)}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 text-[8px] text-slate-400">
              <div className="w-2 h-2 bg-emerald-600 rounded-full" /> 强负相关
            </div>
            <div className="flex items-center gap-1 text-[8px] text-slate-400">
              <div className="w-2 h-2 bg-slate-100 rounded-full" /> 弱相关
            </div>
            <div className="flex items-center gap-1 text-[8px] text-slate-400">
              <div className="w-2 h-2 bg-rose-600 rounded-full" /> 强正相关
            </div>
          </div>
        </div>

        {/* 4.3 相关性网络图 (模拟) */}
        <div className="ams-card p-6 relative overflow-hidden">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Network className="w-5 h-5 text-ams-accent" />
            相关性网络图
          </h3>
          <div className="h-[400px] flex items-center justify-center">
            {/* 模拟网络图布局 */}
            <div className="relative w-64 h-64">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-ams-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg z-10">稳健1号</div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg z-10">成长核心</div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg z-10">均衡配置</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-400 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg z-10">沪深300</div>
              
              {/* 连线模拟 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="#08255E" strokeWidth="3" strokeOpacity="0.4" />
                <line x1="50%" y1="15%" x2="15%" y2="85%" stroke="#08255E" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="50%" y1="15%" x2="85%" y2="85%" stroke="#08255E" strokeWidth="4" strokeOpacity="0.6" />
                <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="#08255E" strokeWidth="5" strokeOpacity="0.8" />
                <line x1="85%" y1="85%" x2="50%" y2="50%" stroke="#08255E" strokeWidth="2" strokeOpacity="0.3" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50"><Download className="w-4 h-4 text-slate-500" /></button>
            <button className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50"><RefreshCw className="w-4 h-4 text-slate-500" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 4.4 滚动相关性走势图 */}
        <div className="ams-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ams-accent" />
              滚动相关性走势 (60日窗口)
            </h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold text-slate-400">稳健1号 vs 沪深300</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rollingCorrData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={[-1, 1]} />
                <Tooltip />
                <Line type="monotone" dataKey="val" name="相关系数" stroke="#08255E" strokeWidth={3} dot={{ r: 4, fill: '#08255E' }} />
                {/* 参考线 */}
                <Line type="monotone" dataKey={() => 0.7} stroke="#EF4444" strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey={() => 0.5} stroke="#F59E0B" strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey={() => 0} stroke="#94A3B8" strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4.6 分散化效益分析 */}
        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-ams-accent" />
            分散化效益分析
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diversificationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                <Bar dataKey="actual" name="实际波动率" fill="#08255E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expected" name="预期波动率 (等权)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800">平均分散化比率</span>
              <span className="text-lg font-black text-emerald-600">1.42</span>
            </div>
            <p className="text-[10px] text-emerald-600 leading-relaxed">
              当前组合分散化效果良好，实际波动率显著低于单资产加权平均值。建议关注成长核心与稳健1号的低相关性机会。
            </p>
          </div>
        </div>
      </div>

      {/* 4.5 风险传导分析 */}
      <div className="ams-card">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">风险传导与系统重要性</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-slate-100">
          <div className="p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">风险影响度排名</h4>
            <div className="space-y-3">
              {[
                { name: '沪深300', score: 8.42, trend: 'up' },
                { name: '成长核心', score: 6.15, trend: 'down' },
                { name: '均衡配置', score: 4.20, trend: 'stable' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  <span className="text-xs font-mono font-bold text-ams-primary">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">风险敏感度排名</h4>
            <div className="space-y-3">
              {[
                { name: '成长核心', score: 9.12 },
                { name: '稳健1号', score: 5.45 },
                { name: '均衡配置', score: 3.80 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  <span className="text-xs font-mono font-bold text-ams-primary">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 bg-slate-50/50">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-ams-accent shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">分析建议</h4>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  沪深300指数作为系统性重要节点，其波动将通过相关性网络快速传导至成长核心产品。建议在市场下行期增加稳健1号的配置以对冲系统性风险。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
