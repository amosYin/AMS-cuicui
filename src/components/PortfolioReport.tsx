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
  Filter,
  Printer
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
  AreaChart,
  Area
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

const holdings = [
  { name: '腾讯控股', code: '00700.HK', amount: '50,000', marketValue: '1,845.20', ratio: '8.45%', cost: '320.50', price: '369.04', profit: '+242.70', profitRate: '+15.14%', industry: '互联网' },
  { name: '贵州茅台', code: '600519.SH', amount: '8,000', marketValue: '1,320.40', ratio: '6.05%', cost: '1,580.00', price: '1,650.50', profit: '+56.40', profitRate: '+4.46%', industry: '白酒' },
  { name: '宁德时代', code: '300750.SZ', amount: '25,000', marketValue: '985.00', ratio: '4.51%', cost: '420.00', price: '394.00', profit: '-65.00', profitRate: '-6.19%', industry: '新能源' },
  { name: '招商银行', code: '600036.SH', amount: '150,000', marketValue: '540.00', ratio: '2.47%', cost: '32.50', price: '36.00', profit: '+52.50', profitRate: '+10.77%', industry: '银行' },
  { name: '美团-W', code: '03690.HK', amount: '40,000', marketValue: '412.80', ratio: '1.89%', cost: '115.20', price: '103.20', profit: '-48.00', profitRate: '-10.42%', industry: '生活服务' },
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

export const PortfolioReport = () => {
  return (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex items-start justify-between border-b-2 border-ams-primary pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">稳健增长核心组合 - 投资报告</h1>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">运行中</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 成立日期: 2023-01-15</span>
            <span className="flex items-center gap-1.5"><Info className="w-4 h-4" /> 投资经理: 张大为</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> 基准指数: 沪深300指数</span>
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> 报告周期: 2026年第一季度</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-md text-sm font-bold hover:bg-slate-200 transition-colors">
            <Printer className="w-4 h-4" />
            打印
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出 PDF
          </button>
        </div>
      </div>

      {/* 1. 组合概览卡片 */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-ams-accent pl-3">
          一、 组合概览 (Overview)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <StatCard label="组合规模 (万元)" value="21,845.20" />
          <StatCard label="最新净值" value="1.2452" subValue="+1.02% (当日)" isPositive={true} />
          <StatCard label="当日收益率" value="+1.02%" isPositive={true} />
          <StatCard label="累计收益率" value="+24.52%" isPositive={true} />
          <StatCard label="年化收益率" value="12.45%" isPositive={true} />
          <StatCard label="最大回撤" value="-8.42%" subValue="2024-02-05" isPositive={false} />
          <StatCard label="夏普比率" value="1.85" />
          <StatCard label="波动率 (年化)" value="15.42%" />
          <StatCard label="Beta 值" value="0.92" />
          <StatCard label="Alpha 值 (年化)" value="4.85%" isPositive={true} />
        </div>
      </section>

      {/* 2. 组合收益走势图 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-ams-accent pl-3">
            二、 收益走势对比 (Performance Trend)
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
        <div className="ams-card p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#08255E" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#08255E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
              <Area type="monotone" dataKey="portfolio" name="本组合净值" stroke="#08255E" strokeWidth={3} fillOpacity={1} fill="url(#colorPortfolio)" />
              <Area type="monotone" dataKey="benchmark" name="基准 (沪深300)" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. 组合风险指标表 */}
        <section className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-ams-accent pl-3">
            三、 风险指标 (Risk Metrics)
          </h3>
          <div className="ams-card p-6 space-y-4">
            {[
              { label: '年化波动率 (%)', value: '15.42' },
              { label: 'Beta 值', value: '0.92' },
              { label: 'Alpha 值 (%)', value: '4.85' },
              { label: '跟踪误差 (%)', value: '3.20' },
              { label: '信息比率', value: '1.52' },
              { label: '最大回撤 (%)', value: '-8.42' },
              { label: '回撤发生日期', value: '2024-02-05' },
              { label: 'VaR (95%, 1D)', value: '42.15万' },
              { label: 'CVaR (95%)', value: '58.40万' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                <span className="text-sm font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 组合持仓明细表 */}
        <section className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-ams-accent pl-3">
            四、 持仓明细 (Holdings Detail)
          </h3>
          <div className="ams-card overflow-hidden">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-ams-border">
                  <th className="px-4 py-3">证券名称/代码</th>
                  <th className="px-4 py-3 text-right">持仓数量</th>
                  <th className="px-4 py-3 text-right">市值(万)</th>
                  <th className="px-4 py-3 text-right">占比</th>
                  <th className="px-4 py-3 text-right">成本/现价</th>
                  <th className="px-4 py-3 text-right">盈亏(万)/率</th>
                  <th className="px-4 py-3">行业</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {holdings.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-slate-400 font-mono">{item.code}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{item.amount}</td>
                    <td className="px-4 py-3 text-right font-bold text-ams-primary">{item.marketValue}</td>
                    <td className="px-4 py-3 text-right font-medium">{item.ratio}</td>
                    <td className="px-4 py-3 text-right font-mono">
                      <p className="text-slate-400">{item.cost}</p>
                      <p className="text-slate-900 font-bold">{item.price}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      <p className={item.profit.startsWith('+') ? "text-emerald-600" : "text-rose-600"}>{item.profit}</p>
                      <p className={item.profitRate.startsWith('+') ? "text-emerald-600" : "text-rose-600"}>{item.profitRate}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-medium text-slate-600">{item.industry}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="pt-12 border-t border-slate-100 text-[10px] text-slate-400 text-center space-y-1">
        <p>数据截止日期: 2026-04-14 | 报告生成时间: 2026-04-14 10:20:12</p>
        <p>本报告由 AMS 资产管理系统自动生成。内部资料，严禁外传。投资有风险，入市需谨慎。</p>
      </div>
    </div>
  );
};
