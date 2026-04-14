import { 
  ShieldAlert, 
  AlertTriangle, 
  Bell, 
  Settings, 
  CheckCircle2, 
  Filter, 
  Download,
  MoreHorizontal,
  ChevronRight,
  Zap,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { cn } from '../lib/utils';

const riskRadarData = [
  { subject: '市场风险', A: 120, fullMark: 150 },
  { subject: '信用风险', A: 98, fullMark: 150 },
  { subject: '流动性风险', A: 86, fullMark: 150 },
  { subject: '操作风险', A: 99, fullMark: 150 },
  { subject: '集中度风险', A: 85, fullMark: 150 },
];

const alertHistory = [
  { time: '10:30:15', level: 'High', type: '集中度预警', message: '单一持仓 [腾讯控股] 占比超过 8%，触及一级阈值。', status: '待处理' },
  { time: '09:45:20', level: 'Medium', type: '回撤预警', message: '组合近 5 日最大回撤达到 2.4%，接近止损线。', status: '处理中' },
  { time: '昨日 15:00', level: 'Low', type: '流动性预警', message: '组合 T+1 可变现资产比例降至 15%，请关注。', status: '已忽略' },
  { time: '昨日 11:15', level: 'High', type: '合规预警', message: '买入指令 [宁德时代] 违反禁买池名单限制。', status: '已拦截' },
];

const limitData = [
  { name: '单一持仓', current: 8.45, limit: 10, warning: 8 },
  { name: '行业集中度', current: 18.5, limit: 25, warning: 20 },
  { name: '杠杆率', current: 134.8, limit: 150, warning: 140 },
  { name: 'VaR (95%)', current: 2.15, limit: 3.0, warning: 2.5 },
];

export const RiskWarning = () => {
  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">风险预警中心</h2>
          <p className="text-sm text-slate-500 mt-1">实时监控多维风险指标，通过智能算法识别潜在风险并即时预警。</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
            <Settings className="w-4 h-4" />
            预警规则设置
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
            <Zap className="w-4 h-4" />
            一键风险排查
          </button>
        </div>
      </div>

      {/* Risk Score Card */}
      <div className="ams-card p-8 bg-ams-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <ShieldAlert className="w-64 h-64" />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          <div className="lg:col-span-1 text-center lg:text-left">
            <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-2">综合风险评分</p>
            <h3 className="text-6xl font-black mb-2">78<span className="text-2xl opacity-50">/100</span></h3>
            <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase">中等风险</span>
          </div>
          <div className="lg:col-span-2 grid grid-cols-3 gap-4">
            {[
              { label: '待处理预警', value: '3', color: 'text-amber-400' },
              { label: '今日触发', value: '12', color: 'text-white' },
              { label: '风险敞口', value: '¥1,845万', color: 'text-white' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-[10px] font-bold opacity-60 mb-1">{item.label}</p>
                <p className={cn("text-xl font-black", item.color)}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <button className="w-full py-3 bg-ams-accent text-white rounded-lg font-bold shadow-lg hover:bg-ams-accent/90 transition-all flex items-center justify-center gap-2">
              查看风险报告
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Radar */}
        <div className="ams-card p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-ams-accent" />
            多维风险雷达图
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskRadarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#64748B'}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="当前风险" dataKey="A" stroke="#08255E" fill="#08255E" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Limit Monitoring */}
        <div className="ams-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-ams-accent" />
              核心限额监控
            </h4>
            <button className="text-[10px] font-bold text-ams-primary hover:underline">配置限额</button>
          </div>
          <div className="space-y-6">
            {limitData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  <span className="text-xs font-mono">
                    <span className={cn(
                      "font-black",
                      item.current >= item.warning ? "text-rose-600" : "text-ams-primary"
                    )}>{item.current}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-slate-500">{item.limit}</span>
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      item.current >= item.limit ? "bg-rose-600" : 
                      item.current >= item.warning ? "bg-amber-500" : "bg-ams-primary"
                    )}
                    style={{ width: `${(item.current / item.limit) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-rose-400/50"
                    style={{ left: `${(item.warning / item.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-ams-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">合规状态良好</p>
              <p className="text-[10px] text-slate-500">当前共有 42 项监控指标，其中 1 项处于预警状态，0 项触及限额。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert History */}
      <div className="ams-card">
        <div className="p-4 border-b border-ams-border flex items-center justify-between bg-slate-50">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-ams-accent" />
            实时预警流水
          </h4>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 bg-white border border-ams-border rounded text-[10px] font-bold text-slate-600">
              <Filter className="w-3 h-3" />
              筛选
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-white border border-ams-border rounded text-[10px] font-bold text-slate-600">
              <Download className="w-3 h-3" />
              导出
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-bold border-b border-ams-border">
                <th className="px-6 py-4">时间</th>
                <th className="px-6 py-4">级别</th>
                <th className="px-6 py-4">预警类型</th>
                <th className="px-6 py-4">预警详情</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alertHistory.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 font-mono">{item.time}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                      item.level === 'High' ? "bg-rose-100 text-rose-700" :
                      item.level === 'Medium' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    )}>{item.level}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{item.type}</td>
                  <td className="px-6 py-4 text-slate-600 max-w-md truncate">{item.message}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "flex items-center gap-1.5 font-bold",
                      item.status === '待处理' ? "text-amber-600" :
                      item.status === '已拦截' ? "text-rose-600" : "text-slate-400"
                    )}>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        item.status === '待处理' ? "bg-amber-600 animate-pulse" :
                        item.status === '已拦截' ? "bg-rose-600" : "bg-slate-400"
                      )}></div>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
