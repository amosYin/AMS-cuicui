import React from 'react';
import { 
  Search, 
  RefreshCw, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronDown,
  LayoutGrid,
  PieChart as PieChartIcon,
  TrendingUp,
  ExternalLink
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
  PieChart,
  Pie,
  Cell,
  Treemap,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';

const COLORS = ['#08255E', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const treemapData = [
  { name: '信息技术', children: [
    { name: '腾讯控股', size: 4500, return: 12.5 },
    { name: '阿里巴巴', size: 3200, return: -5.2 },
    { name: '美团-W', size: 2800, return: 8.4 },
    { name: '百度集团', size: 1500, return: 2.1 },
  ]},
  { name: '金融', children: [
    { name: '中国平安', size: 3800, return: 4.5 },
    { name: '招商银行', size: 3100, return: 6.2 },
    { name: '建设银行', size: 2200, return: 1.8 },
  ]},
  { name: '消费', children: [
    { name: '贵州茅台', size: 4200, return: 15.6 },
    { name: '五粮液', size: 2500, return: 10.2 },
  ]},
];

const changeData = [
  { date: '2025-10', value: 100000 },
  { date: '2025-11', value: 112000 },
  { date: '2025-12', value: 108000 },
  { date: '2026-01', value: 125000 },
  { date: '2026-02', value: 138000 },
  { date: '2026-03', value: 132000 },
  { date: '2026-04', value: 154000 },
];

const StatCard = ({ label, value, subValue, isPositive }: any) => (
  <div className="ams-card p-4">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
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
);

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, name, return: ret } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: ret > 0 ? '#10B981' : ret < 0 ? '#EF4444' : '#94A3B8',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1),
          strokeOpacity: 1 / (depth + 1),
        }}
      />
      {width > 30 && height > 30 && (
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">
          {name}
        </text>
      )}
    </g>
  );
};

export const HoldingsPanorama = () => {
  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* 2.1 筛选条件栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索证券名称/代码..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ams-primary/20 w-64"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            产品选择 <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            资产类别 <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer">
            行业筛选 <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
            <Download className="w-4 h-4" />
            导出持仓全景
          </button>
        </div>
      </div>

      {/* 2.2 板块一：持仓总览指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard label="总持仓市值" value="15.42亿" subValue="+8.5% (环比)" isPositive={true} />
        <StatCard label="持仓证券总数" value="842" />
        <StatCard label="第一大持仓" value="贵州茅台" subValue="占比 4.2%" />
        <StatCard label="前十大集中度" value="28.4%" subValue="-1.2% (上期)" isPositive={false} />
        <StatCard label="行业集中度 TOP3" value="52.1%" />
        <StatCard label="穿透后规模" value="18.20亿" />
        <StatCard label="重复持仓数" value="156" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2.3 板块二：持仓资产分布 (树状图) */}
        <div className="ams-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-ams-accent" />
            持仓资产分布 (按行业/收益)
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                stroke="#fff"
                fill="#8884d8"
                content={<CustomizedContent />}
              />
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm" /> 正收益
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <div className="w-3 h-3 bg-rose-500 rounded-sm" /> 负收益
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <div className="w-3 h-3 bg-slate-400 rounded-sm" /> 持平
            </div>
          </div>
        </div>

        {/* 2.5 板块四：持仓集中度分析 */}
        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-ams-accent" />
            前十大持仓集中度
          </h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '前十大', value: 28.4 },
                    { name: '其他', value: 71.6 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#08255E" />
                  <Cell fill="#F1F5F9" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-black text-slate-900">28.4%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Top 10</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              { name: '贵州茅台', value: '4.2%', mkt: '6,472万' },
              { name: '腾讯控股', value: '3.8%', mkt: '5,856万' },
              { name: '中国平安', value: '3.5%', mkt: '5,392万' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-xs font-bold text-slate-700">{item.name}</span>
                <div className="text-right">
                  <p className="text-xs font-mono font-bold text-ams-primary">{item.value}</p>
                  <p className="text-[10px] text-slate-400">{item.mkt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.4 板块三：持仓明细表 */}
      <div className="ams-card">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">持仓明细表 (汇总)</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-[10px] font-bold border border-slate-200 rounded hover:bg-slate-50">自定义列</button>
            <button className="px-3 py-1 text-[10px] font-bold bg-ams-primary text-white rounded hover:bg-ams-secondary">导出 Excel</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">证券代码</th>
                <th className="px-6 py-4">证券名称</th>
                <th className="px-6 py-4">行业分类</th>
                <th className="px-6 py-4 text-right">总市值 (万)</th>
                <th className="px-6 py-4 text-right">占比 (%)</th>
                <th className="px-6 py-4 text-right">涉及产品</th>
                <th className="px-6 py-4 text-right">浮动盈亏</th>
                <th className="px-6 py-4 text-right">盈亏率</th>
                <th className="px-6 py-4">风险等级</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { code: '600519.SH', name: '贵州茅台', industry: '食品饮料', mkt: '6,472.50', weight: '4.20', products: 12, pnl: '+842.10', pnlRate: '+14.5%', risk: '低' },
                { code: '0700.HK', name: '腾讯控股', industry: '传媒', mkt: '5,856.20', weight: '3.80', products: 8, pnl: '+425.40', pnlRate: '+7.8%', risk: '低' },
                { code: '601318.SH', name: '中国平安', industry: '非银金融', mkt: '5,392.10', weight: '3.50', products: 15, pnl: '-124.50', pnlRate: '-2.3%', risk: '中' },
                { code: '300750.SZ', name: '宁德时代', industry: '电力设备', mkt: '4,825.40', weight: '3.12', products: 6, pnl: '+1,245.80', pnlRate: '+34.2%', risk: '中' },
                { code: '002594.SZ', name: '比亚迪', industry: '汽车', mkt: '4,210.80', weight: '2.73', products: 9, pnl: '+652.30', pnlRate: '+18.4%', risk: '中' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500">{row.code}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 text-slate-600">{row.industry}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold">{row.mkt}</td>
                  <td className="px-6 py-4 text-right font-mono">{row.weight}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-ams-primary hover:underline flex items-center gap-1 justify-end w-full">
                      {row.products} <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                  <td className={cn("px-6 py-4 text-right font-mono font-bold", row.pnl.startsWith('+') ? "text-emerald-600" : "text-rose-600")}>
                    {row.pnl}
                  </td>
                  <td className={cn("px-6 py-4 text-right font-mono", row.pnlRate.startsWith('+') ? "text-emerald-600" : "text-rose-600")}>
                    {row.pnlRate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      row.risk === '低' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    )}>{row.risk}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-ams-primary font-bold hover:underline">穿透分析</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2.6 板块五：持仓变动追踪 */}
        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-ams-accent" />
            持仓市值变动趋势
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={changeData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="value" name="持仓市值 (万)" stroke="#10B981" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="ams-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">近期调仓明细</h3>
          <div className="space-y-4">
            {[
              { date: '2026-04-12', product: '稳健1号', name: '贵州茅台', type: '买入', amount: '+500张', value: '+1,245万' },
              { date: '2026-04-11', product: '成长核心', name: '宁德时代', type: '卖出', amount: '-1,200张', value: '-2,840万' },
              { date: '2026-04-10', product: '均衡配置', name: '腾讯控股', type: '买入', amount: '+2,000张', value: '+856万' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold",
                    item.type === '买入' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {item.type}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.name}</p>
                    <p className="text-[10px] text-slate-500">{item.product} · {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-mono font-bold", item.type === '买入' ? "text-emerald-600" : "text-rose-600")}>
                    {item.value}
                  </p>
                  <p className="text-[10px] text-slate-400">{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-ams-primary bg-ams-primary/5 rounded-lg hover:bg-ams-primary/10 transition-colors">
            查看更多调仓记录
          </button>
        </div>
      </div>
    </div>
  );
};
