import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  ChevronLeft, 
  ChevronRight, 
  PieChart as PieChartIcon, 
  BarChart3,
  MoreHorizontal,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { cn } from '../lib/utils';

const transactions = [
  { date: '2026-04-14', time: '10:30:15', code: '00700.HK', name: '腾讯控股', direction: '买入', amount: '5,000', price: '369.04', total: '184.52', fee: '184.52', counterparty: '中信证券', status: '已成交', approval: '已审批' },
  { date: '2026-04-14', time: '09:45:20', code: '600519.SH', name: '贵州茅台', direction: '买入', amount: '200', price: '1,650.50', total: '33.01', fee: '33.01', counterparty: '招商证券', status: '已成交', approval: '已审批' },
  { date: '2026-04-13', time: '14:20:05', code: '300750.SZ', name: '宁德时代', direction: '卖出', amount: '1,000', price: '394.00', total: '39.40', fee: '39.40', counterparty: '华泰证券', status: '已成交', approval: '已审批' },
  { date: '2026-04-13', time: '11:15:30', code: '03690.HK', name: '美团-W', direction: '卖出', amount: '10,000', price: '103.20', total: '103.20', fee: '103.20', counterparty: '中金公司', status: '部分成交', approval: '已审批' },
  { date: '2026-04-13', time: '09:30:00', code: '600036.SH', name: '招商银行', direction: '买入', amount: '50,000', price: '36.00', total: '180.00', fee: '180.00', counterparty: '广发证券', status: '已撤单', approval: '已驳回' },
];

const directionData = [
  { name: '买入', value: 65, color: '#EF4444' },
  { name: '卖出', value: 35, color: '#10B981' },
];

const varietyData = [
  { name: '股票', value: 70, color: '#08255E' },
  { name: '债券', value: 20, color: '#3B82F6' },
  { name: '基金', value: 10, color: '#F59E0B' },
];

export const TransactionFlow = () => {
  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">交易流水查询</h2>
          <p className="text-sm text-slate-500 mt-1">多维度追溯组合交易记录，支持高级筛选与流水核对。</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
            <Upload className="w-4 h-4" />
            导入流水
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
            <Download className="w-4 h-4" />
            导出流水 (Excel)
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '今日交易笔数', value: '12', sub: '本周: 84', icon: BarChart3 },
          { label: '今日成交金额', value: '¥217.53万', sub: '本周: ¥1,245万', icon: BarChart3 },
          { label: '买卖净额', value: '+¥151.12万', sub: '净买入', icon: BarChart3, color: 'text-emerald-600' },
          { label: '待审批指令', value: '3', sub: '紧急: 1', icon: BarChart3, color: 'text-amber-600' },
        ].map((item, i) => (
          <div key={i} className="ams-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
              <item.icon className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <h4 className={cn("text-lg font-black", item.color || "text-slate-900")}>{item.value}</h4>
            <p className="text-[10px] text-slate-400 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="ams-card p-4 bg-slate-50 flex flex-wrap items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="搜索代码/名称/指令号..." className="w-full pl-10 pr-4 py-2 bg-white border border-ams-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ams-accent/20" />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input type="date" className="px-3 py-2 bg-white border border-ams-border rounded-md text-sm focus:outline-none" />
          <span className="text-slate-400">-</span>
          <input type="date" className="px-3 py-2 bg-white border border-ams-border rounded-md text-sm focus:outline-none" />
        </div>
        <select className="px-3 py-2 bg-white border border-ams-border rounded-md text-sm focus:outline-none">
          <option>所有方向</option>
          <option>买入</option>
          <option>卖出</option>
        </select>
        <select className="px-3 py-2 bg-white border border-ams-border rounded-md text-sm focus:outline-none">
          <option>所有状态</option>
          <option>已成交</option>
          <option>部分成交</option>
          <option>已撤单</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-md text-sm font-bold hover:bg-slate-300 transition-colors">
          <Filter className="w-4 h-4" />
          高级筛选
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Transaction Table */}
        <div className="ams-card lg:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-ams-border">
                  <th className="px-4 py-3">交易时间</th>
                  <th className="px-4 py-3">证券名称</th>
                  <th className="px-4 py-3">方向</th>
                  <th className="px-4 py-3 text-right">数量</th>
                  <th className="px-4 py-3 text-right">价格</th>
                  <th className="px-4 py-3 text-right">金额(万)</th>
                  <th className="px-4 py-3">执行状态</th>
                  <th className="px-4 py-3">审批</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{item.date}</p>
                      <p className="text-[10px] text-slate-400">{item.time}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{item.code}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "font-bold",
                        item.direction === '买入' ? "text-rose-600" : "text-emerald-600"
                      )}>{item.direction}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{item.amount}</td>
                    <td className="px-4 py-3 text-right font-mono">{item.price}</td>
                    <td className="px-4 py-3 text-right font-bold text-ams-primary">{item.total}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold",
                        item.status === '已成交' ? "bg-emerald-100 text-emerald-700" :
                        item.status === '部分成交' ? "bg-blue-100 text-blue-700" :
                        item.status === '已撤单' ? "bg-slate-100 text-slate-500" : "bg-amber-100 text-amber-700"
                      )}>{item.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold",
                        item.approval === '已审批' ? "bg-emerald-100 text-emerald-700" :
                        item.approval === '待审批' ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                      )}>{item.approval}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1 hover:bg-slate-200 rounded text-slate-400">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-ams-border flex items-center justify-between bg-slate-50">
            <p className="text-xs text-slate-500">显示 1-5 条，共 124 条记录</p>
            <div className="flex items-center gap-2">
              <button className="p-1 border border-ams-border rounded bg-white text-slate-400 hover:text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
              <button className="px-3 py-1 border border-ams-accent rounded bg-ams-accent/10 text-ams-accent text-xs font-bold">1</button>
              <button className="px-3 py-1 border border-ams-border rounded bg-white text-slate-600 text-xs font-bold">2</button>
              <button className="px-3 py-1 border border-ams-border rounded bg-white text-slate-600 text-xs font-bold">3</button>
              <button className="p-1 border border-ams-border rounded bg-white text-slate-400 hover:text-slate-600"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Right Column: Distribution Charts */}
        <div className="space-y-6">
          <div className="ams-card p-6">
            <h4 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-ams-accent" />
              交易方向分布
            </h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={directionData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                    {directionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '10px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ams-card p-6">
            <h4 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-ams-accent" />
              交易品种分布
            </h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={varietyData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                    {varietyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '10px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ams-card p-6 bg-ams-primary text-white">
            <h4 className="font-bold text-sm mb-4">交易时段活跃度</h4>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className={cn(
                  "h-8 rounded-sm",
                  i === 2 || i === 7 || i === 12 ? "bg-ams-accent" : 
                  i % 3 === 0 ? "bg-ams-accent/60" : "bg-white/10"
                )}></div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-4 italic">当前时段: 10:00-11:00 (高活跃)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
