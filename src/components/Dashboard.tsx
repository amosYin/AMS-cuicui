import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Activity, 
  ShieldAlert, 
  PieChart as PieChartIcon,
  TrendingUp,
  MoreHorizontal,
  Download,
  Filter,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { cn } from '../lib/utils';

const performanceData = [
  { name: '04-01', value: 1.002 },
  { name: '04-03', value: 1.015 },
  { name: '04-05', value: 1.008 },
  { name: '04-07', value: 1.025 },
  { name: '04-09', value: 1.042 },
  { name: '04-11', value: 1.038 },
  { name: '04-13', value: 1.055 },
];

const allocationData = [
  { name: '股票', value: 45, color: '#08255E' },
  { name: '债券', value: 30, color: '#3B82F6' },
  { name: '现金', value: 15, color: '#94A3B8' },
  { name: '衍生品', value: 10, color: '#F59E0B' },
];

const riskData = [
  { name: '市场风险', value: 65 },
  { name: '信用风险', value: 45 },
  { name: '流动性风险', value: 30 },
  { name: '操作风险', value: 20 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon }: any) => (
  <div className="ams-card p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className="p-2 bg-slate-50 rounded-lg">
        <Icon className="w-5 h-5 text-ams-primary" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <div className={`flex items-center gap-0.5 text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
      <span className="text-[10px] text-slate-400 font-medium">较上个交易日</span>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">资产概览</h2>
          <p className="text-sm text-slate-500 mt-1">欢迎回来，这是您当前管理的投资组合实时数据。</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            筛选条件
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-medium hover:bg-ams-secondary transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            导出报告
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="管理资产净值 (NAV)" 
          value="¥1,245.80M" 
          change="+2.45%" 
          isPositive={true} 
          icon={Wallet} 
        />
        <StatCard 
          title="当日盈亏" 
          value="+¥12.42M" 
          change="+1.02%" 
          isPositive={true} 
          icon={TrendingUp} 
        />
        <StatCard 
          title="风险总敞口" 
          value="¥842.15M" 
          change="-0.85%" 
          isPositive={false} 
          icon={ShieldAlert} 
        />
        <StatCard 
          title="活跃组合数" 
          value="24" 
          change="持平" 
          isPositive={true} 
          icon={Activity} 
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="ams-card lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-ams-accent" />
              累计收益率走势
            </h4>
            <div className="flex bg-slate-100 p-1 rounded-md">
              {['1W', '1M', '3M', 'YTD', 'ALL'].map((p) => (
                <button 
                  key={p} 
                  className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${p === '1M' ? 'bg-white text-ams-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94A3B8'}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94A3B8'}} 
                  domain={['dataMin - 0.01', 'dataMax + 0.01']}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="ams-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-ams-accent" />
              资产配置分布
            </h4>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6">风险敞口分析</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#475569', fontWeight: 500}}
                  width={80}
                />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#08255E" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="ams-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900">待办任务 & 预警</h4>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">3 条紧急</span>
          </div>
          <div className="space-y-4">
            {[
              { title: '组合 [AMS-042] 风险敞口超过阈值 (85%)', time: '10分钟前', type: 'risk' },
              { title: '估值表导入失败: 2026-04-13 招商银行', time: '1小时前', type: 'error' },
              { title: '研究报告 [新能源行业] 待审批', time: '3小时前', type: 'info' },
              { title: '持仓核对差异: 组合 [AMS-015] 股票头寸', time: '5小时前', type: 'warning' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-ams-border">
                <div className={cn(
                  "w-2 h-2 mt-1.5 rounded-full shrink-0",
                  item.type === 'risk' || item.type === 'error' ? 'bg-red-500' : 
                  item.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                )}></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-800">{item.title}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{item.time}</p>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300" />
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-bold text-ams-accent hover:text-ams-primary transition-colors">
            查看全部通知
          </button>
        </div>
      </div>
    </div>
  );
};
