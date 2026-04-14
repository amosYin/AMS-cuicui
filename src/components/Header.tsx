import { Bell, Search, HelpCircle, Calendar } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-bottom border-ams-border flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索产品、组合或报告..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-ams-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ams-accent/20 focus:border-ams-accent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">2026年4月14日</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="h-8 w-px bg-ams-border mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900">AMS-PRO-001</p>
            <p className="text-[10px] text-ams-accent font-medium">高级专业版</p>
          </div>
        </div>
      </div>
    </header>
  );
};
