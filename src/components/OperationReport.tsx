import { 
  TrendingUp, 
  Users, 
  Activity, 
  ArrowUpRight, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Clock, 
  ShieldCheck, 
  Download,
  Settings
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Legend,
  LineChart,
  Line
} from 'recharts';
import { cn } from '../lib/utils';

const scaleData = [
  { month: '2025-05', scale: 15000, sub: 500, red: 200 },
  { month: '2025-07', scale: 16500, sub: 800, red: 300 },
  { month: '2025-09', scale: 16000, sub: 400, red: 900 },
  { month: '2025-11', scale: 18000, sub: 2500, red: 500 },
  { month: '2026-01', scale: 19500, sub: 2000, red: 500 },
  { month: '2026-03', scale: 21845, sub: 3000, red: 655 },
];

const feeData = [
  { name: '管理费', amount: 124.5, ratio: '0.57%' },
  { name: '托管费', amount: 21.8, ratio: '0.10%' },
  { name: '交易佣金', amount: 45.2, ratio: '0.21%' },
  { name: '其他费用', amount: 8.4, ratio: '0.04%' },
];

const efficiencyData = [
  { label: '估值核算及时率', value: '99.8%', status: 'Normal' },
  { label: '对账完成率', value: '100%', status: 'Normal' },
  { label: '报告生成耗时', value: '2.4 min', status: 'Fast' },
  { label: '指令处理时长', value: '15.2 sec', status: 'Fast' },
];

export const OperationReport = () => {
  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">运营报表</h2>
          <p className="text-sm text-slate-500 mt-1">全方位展示组合规模变动、申赎动态、费用结构及运营效率。</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
            <Settings className="w-4 h-4" />
            自定义报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
            <Download className="w-4 h-4" />
            导出运营数据
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: '当前管理规模', value: '¥21,845万', sub: '+12.4%', isPos: true, icon: TrendingUp },
          { label: '月均规模', value: '¥19,520万', sub: '近12个月', isPos: null, icon: Activity },
          { label: '年初至今增长', value: '24.52%', sub: '跑赢同类 5.2%', isPos: true, icon: ArrowUpRight },
          { label: '本期净申赎', value: '+¥2,345万', sub: '净流入', isPos: true, icon: Users },
          { label: '活跃客户数', value: '1,245', sub: '新增 42', isPos: true, icon: Users },
        ].map((item, i) => (
          <div key={i} className="ams-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
              <item.icon className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <h4 className="text-lg font-black text-slate-900">{item.value}</h4>
            <div className={cn(
              "text-[10px] font-bold mt-1",
              item.isPos === true ? "text-emerald-600" : item.isPos === false ? "text-rose-600" : "text-slate-400"
            )}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scale Trend Chart */}
        <div className="ams-card p-6 lg:col-span-2">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-ams-accent" />
            规模变化趋势 (近12个月)
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scaleData}>
                <defs>
                  <linearGradient id="colorScale" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#08255E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#08255E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="scale" name="管理规模" stroke="#08255E" strokeWidth={3} fillOpacity={1} fill="url(#colorScale)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription/Redemption Bar */}
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="w-4 h-4 text-ams-accent" />
            申赎动态分析
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scaleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: '10px', paddingBottom: '20px'}} />
                <Bar dataKey="sub" name="申购" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="red" name="赎回" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Structure */}
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-ams-accent" />
            费用结构明细
          </h4>
          <div className="space-y-4">
            {feeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs font-bold text-slate-900">{item.name}</p>
                  <p className="text-[10px] text-slate-400">占比: {item.ratio}</p>
                </div>
                <p className="text-sm font-black text-ams-primary">¥{item.amount}万</p>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency & Compliance */}
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-ams-accent" />
            运营效率指标
          </h4>
          <div className="space-y-4">
            {efficiencyData.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  <span className="text-[8px] font-black uppercase text-emerald-600">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-ams-accent" />
            合规检查统计
          </h4>
          <div className="flex flex-col items-center justify-center h-[200px]">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset="18.2" className="text-emerald-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-black text-slate-900">95%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">通过率</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
              <div>
                <p className="text-xs font-bold text-slate-900">124</p>
                <p className="text-[10px] text-slate-400">检查次数</p>
              </div>
              <div>
                <p className="text-xs font-bold text-rose-600">3</p>
                <p className="text-[10px] text-slate-400">触发预警</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="ams-card p-6">
        <h4 className="font-bold text-slate-900 mb-8">运营里程碑</h4>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2"></div>
          <div className="flex justify-between relative">
            {[
              { date: '2023-01-15', event: '产品成立', desc: '首募规模 2.5 亿' },
              { date: '2023-08-20', event: '规模突破 5 亿', desc: '新增 2 名投研人员' },
              { date: '2024-03-10', event: '策略升级', desc: '引入量化因子模型' },
              { date: '2024-12-01', event: '规模突破 10 亿', desc: '获选年度潜力组合' },
              { date: '2026-04-14', event: '当前节点', desc: '规模 21.8 亿', active: true },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center relative z-10 w-32">
                <div className={cn(
                  "w-4 h-4 rounded-full border-4 border-white shadow-sm mb-4",
                  item.active ? "bg-ams-accent scale-125" : "bg-slate-300"
                )}></div>
                <p className="text-[10px] font-bold text-slate-400 mb-1">{item.date}</p>
                <p className="text-xs font-bold text-slate-900 text-center">{item.event}</p>
                <p className="text-[10px] text-slate-500 text-center mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
