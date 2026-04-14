import React from 'react';
import { 
  Search, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Calculator,
  ChevronDown,
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
  BarChart, 
  Bar 
} from 'recharts';
import { cn } from '../lib/utils';

const profitTrendData = [
  { date: '2025-10', profit: 120 },
  { date: '2025-11', profit: 450 },
  { date: '2025-12', profit: 380 },
  { date: '2026-01', profit: 850 },
  { date: '2026-02', profit: 1200 },
  { date: '2026-03', profit: 950 },
  { date: '2026-04', profit: 1500 },
];

const fundingData = [
  { date: 'T+1', amount: 450 },
  { date: 'T+3', amount: 820 },
  { date: 'T+7', amount: 1200 },
  { date: 'T+14', amount: 350 },
  { date: 'T+30', amount: 2100 },
];

const StatCard = ({ label, value, subValue, isAlert }: any) => (
  <div className="ams-card p-4">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
    <h4 className={cn("text-xl font-black", isAlert ? "text-rose-600" : "text-slate-900")}>{value}</h4>
    {subValue && <p className="text-[10px] text-slate-400 mt-1">{subValue}</p>}
  </div>
);

export const OptionExercise = () => {
  const [activeTab, setActiveTab] = React.useState('待行权列表');

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* 5.1 筛选条件栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索期权代码/合约名称..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ams-primary/20 w-64"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            期权类型 <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            到期日范围 <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            行权状态 <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            批量操作
          </button>
        </div>
      </div>

      {/* 5.2 板块一：期权持仓概览卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="待行权期权" value="12 张" subValue="7天内到期: 3张" isAlert={true} />
        <StatCard label="总持仓市值" value="4,250.8万" />
        <StatCard label="期权费总成本" value="842.5万" />
        <StatCard label="当前总内在价值" value="+1,245.2万" />
        <StatCard label="今日已行权" value="2 张" />
        <StatCard label="待审批申请" value="5 条" isAlert={true} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {['待行权列表', '行权申请与审批', '行权执行与交割', '行权财务分析'].map((tab) => (
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
        {activeTab === '待行权列表' && (
          <div className="ams-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">临近到期期权持仓</h3>
              <button className="text-xs font-bold text-ams-primary hover:underline">一键申请所有实值期权</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">期权代码/名称</th>
                    <th className="px-6 py-4">类型</th>
                    <th className="px-6 py-4">标的资产</th>
                    <th className="px-6 py-4 text-right">行权价</th>
                    <th className="px-6 py-4 text-right">到期日</th>
                    <th className="px-6 py-4 text-right">内在价值 (万)</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4">建议</th>
                    <th className="px-6 py-4">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { code: '510300.SH', name: '300ETF购4月4.0', type: '看涨', target: '沪深300ETF', price: '4.000', expiry: '3天', value: '+124.5', status: '实值', advice: '建议行权' },
                    { code: '000858.SZ', name: '五粮液沽5月150', type: '看跌', target: '五粮液', price: '150.00', expiry: '15天', value: '-42.1', status: '虚值', advice: '建议放弃' },
                    { code: '600036.SH', name: '招行购6月35', type: '看涨', target: '招商银行', price: '35.00', expiry: '42天', value: '+15.8', status: '实值', advice: '需评估' },
                  ].map((row, i) => (
                    <tr key={i} className={cn("hover:bg-slate-50 transition-colors", row.status === '实值' ? "bg-emerald-50/30" : "")}>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{row.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{row.code}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold",
                          row.type === '看涨' ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                        )}>{row.type}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{row.target}</td>
                      <td className="px-6 py-4 text-right font-mono">{row.price}</td>
                      <td className="px-6 py-4 text-right font-bold text-rose-600">{row.expiry}</td>
                      <td className={cn("px-6 py-4 text-right font-mono font-bold", row.value.startsWith('+') ? "text-emerald-600" : "text-slate-400")}>
                        {row.value}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold",
                          row.status === '实值' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        )}>{row.status}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">{row.advice}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className={cn(
                            "px-3 py-1 rounded text-[10px] font-bold transition-colors",
                            row.status === '实值' ? "bg-ams-primary text-white hover:bg-ams-secondary" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          )}>申请行权</button>
                          <button className="px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded text-[10px] font-bold hover:bg-slate-50">放弃</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === '行权财务分析' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="ams-card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-ams-accent" />
                行权收益趋势 (万)
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" name="行权净收益" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="ams-card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-ams-accent" />
                未来30天行权资金需求预测 (万)
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fundingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                    <Tooltip />
                    <Bar dataKey="amount" name="资金需求" fill="#08255E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === '行权申请与审批' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="ams-card p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-slate-900 mb-6">行权申请列表</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">申请编号</th>
                      <th className="px-6 py-4">期权名称</th>
                      <th className="px-6 py-4 text-right">行权数量</th>
                      <th className="px-6 py-4 text-right">所需资金</th>
                      <th className="px-6 py-4">审批状态</th>
                      <th className="px-6 py-4">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: 'REQ2026041401', name: '300ETF购4月4.0', qty: '500张', fund: '200.00万', status: '待审批' },
                      { id: 'REQ2026041305', name: '招行购6月35', qty: '200张', fund: '70.00万', status: '已批准' },
                      { id: 'REQ2026041202', name: '腾讯购4月350', qty: '100张', fund: '3.50万', status: '已驳回' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-500">{row.id}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                        <td className="px-6 py-4 text-right">{row.qty}</td>
                        <td className="px-6 py-4 text-right font-mono">{row.fund}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold",
                            row.status === '待审批' ? "bg-amber-100 text-amber-700" : 
                            row.status === '已批准' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          )}>{row.status}</span>
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
            <div className="space-y-6">
              <div className="ams-card p-6 bg-ams-primary text-white">
                <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  行权风控提醒
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <p className="text-[10px] text-white/60 uppercase font-bold">可用资金余额</p>
                    <p className="text-lg font-black">1,245.80 万</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg">
                    <p className="text-[10px] text-white/60 uppercase font-bold">预计行权占用</p>
                    <p className="text-lg font-black">270.00 万</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>资金覆盖率</span>
                      <span>461%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[80%]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="ams-card p-6">
                <h4 className="text-sm font-bold text-slate-900 mb-4">行权通知中心</h4>
                <div className="space-y-4">
                  {[
                    { title: '到期提醒', content: '您持有的300ETF购4月4.0将于3天后到期', time: '10分钟前', type: 'alert' },
                    { title: '审批通过', content: '行权申请 REQ2026041305 已获批准', time: '2小时前', type: 'success' },
                  ].map((note, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        note.type === 'alert' ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                      )}>
                        {note.type === 'alert' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{note.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{note.content}</p>
                        <p className="text-[8px] text-slate-400 mt-1 uppercase">{note.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
