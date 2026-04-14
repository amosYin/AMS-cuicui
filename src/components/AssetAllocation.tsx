import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Filter, Download, Info } from 'lucide-react';

const data = [
  { name: '权益类', value: 450, color: '#08255E' },
  { name: '固定收益类', value: 300, color: '#3B82F6' },
  { name: '现金及等价物', value: 150, color: '#94A3B8' },
  { name: '另类投资', value: 100, color: '#F59E0B' },
];

const detailData = [
  { asset: '沪深300指数基金', type: '权益类', amount: '120.50M', ratio: '12.05%', change: '+1.2%' },
  { asset: '中证500增强', type: '权益类', amount: '85.20M', ratio: '8.52%', change: '+0.8%' },
  { asset: '国债2401', type: '固定收益类', amount: '150.00M', ratio: '15.00%', change: '+0.1%' },
  { asset: '企业债-腾讯', type: '固定收益类', amount: '65.00M', ratio: '6.50%', change: '-0.2%' },
  { asset: '货币市场基金', type: '现金', amount: '150.00M', ratio: '15.00%', change: '+0.01%' },
];

export const AssetAllocation = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">资产配置分析</h2>
          <p className="text-sm text-slate-500 mt-1">分析投资组合在不同资产类别、行业及地区的分布情况。</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-medium text-slate-700">
            <Filter className="w-4 h-4" />
            资产筛选
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-medium">
            <Download className="w-4 h-4" />
            导出配置表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="ams-card p-6 lg:col-span-1">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            资产大类分布
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="ams-card p-6 lg:col-span-2">
          <h4 className="font-bold text-slate-900 mb-6">资产明细清单</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ams-border">
                  <th className="pb-3 font-semibold text-slate-500">资产名称</th>
                  <th className="pb-3 font-semibold text-slate-500">资产类别</th>
                  <th className="pb-3 font-semibold text-slate-500 text-right">金额 (NAV)</th>
                  <th className="pb-3 font-semibold text-slate-500 text-right">占比</th>
                  <th className="pb-3 font-semibold text-slate-500 text-right">当日变动</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ams-border">
                {detailData.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-900">{item.asset}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 text-right font-mono">{item.amount}</td>
                    <td className="py-4 text-right font-bold text-ams-primary">{item.ratio}</td>
                    <td className={`py-4 text-right font-bold ${item.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
