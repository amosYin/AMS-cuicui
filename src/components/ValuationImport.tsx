import { Upload, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const ValuationImport = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">估值表导入</h2>
          <p className="text-sm text-slate-500 mt-1">上传并解析托管行提供的估值表，更新投资组合净值数据。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="ams-card p-8 border-dashed border-2 border-ams-accent/30 bg-ams-accent/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-ams-accent/10 transition-all">
            <div className="w-12 h-12 bg-ams-accent/20 rounded-full flex items-center justify-center mb-4">
              <Upload className="text-ams-accent w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">点击或拖拽文件至此处上传</h3>
            <p className="text-sm text-slate-500 mt-2">支持 .xls, .xlsx, .pdf 格式的估值表文件</p>
            <p className="text-[10px] text-slate-400 mt-4 italic">最大支持 20MB，单次最多上传 50 个文件</p>
          </div>

          <div className="ams-card">
            <div className="p-4 border-b border-ams-border flex items-center justify-between bg-slate-50">
              <h4 className="font-bold text-sm text-slate-900">近期导入记录</h4>
              <button className="text-xs font-bold text-ams-accent">查看历史</button>
            </div>
            <div className="divide-y divide-ams-border">
              {[
                { name: '招商银行_AMS-001_20260413.xlsx', status: 'success', time: '2026-04-14 09:30', user: '张经理' },
                { name: '工商银行_AMS-005_20260413.xlsx', status: 'processing', time: '2026-04-14 10:15', user: '张经理' },
                { name: '建设银行_AMS-012_20260413.xlsx', status: 'error', time: '2026-04-14 10:45', user: '系统自动' },
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 rounded">
                      <FileText className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                        <span className="text-[10px] text-slate-400">操作人: {item.user}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === 'success' && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        导入成功
                      </span>
                    )}
                    {item.status === 'processing' && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">
                        <Clock className="w-3 h-3 animate-spin" />
                        解析中
                      </span>
                    )}
                    {item.status === 'error' && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-rose-100 text-rose-700 text-[10px] font-bold rounded">
                        <AlertCircle className="w-3 h-3" />
                        解析失败
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="ams-card p-6">
            <h4 className="font-bold text-slate-900 mb-4">导入说明</h4>
            <ul className="space-y-3">
              {[
                '请确保估值表日期与系统日期一致',
                '文件命名需符合 [银行]_[产品代码]_[日期] 规范',
                '解析失败时请检查文件单元格格式是否被篡改',
                '如有新托管行模板需求，请联系系统管理员'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-ams-accent shrink-0"></div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="ams-card p-6 bg-ams-primary text-white">
            <h4 className="font-bold mb-2">自动对账服务</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              系统已开启自动对账功能。估值表导入成功后，系统将自动触发与内部流水、持仓的核对任务，差异结果将发送至您的预警中心。
            </p>
            <button className="mt-4 text-xs font-bold text-ams-accent">配置自动任务</button>
          </div>
        </div>
      </div>
    </div>
  );
};
