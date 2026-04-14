import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  BarChart3, 
  LineChart, 
  ShieldCheck, 
  Database, 
  Settings, 
  Users, 
  Search,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  subItems?: string[];
  onSubItemClick?: (item: string) => void;
  currentSubItem?: string;
}

const NavItem = ({ icon: Icon, label, active, onClick, subItems, onSubItemClick, currentSubItem }: NavItemProps) => {
  const [isOpen, setIsOpen] = React.useState(active);

  return (
    <div className="mb-1">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          onClick?.();
        }}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors rounded-md group",
          active && !subItems
            ? "bg-ams-accent/10 text-white" 
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className={cn("w-4 h-4", active ? "text-ams-accent" : "text-slate-400 group-hover:text-white")} />
          <span>{label}</span>
        </div>
        {subItems && (
          <ChevronRight className={cn("w-3.5 h-3.5 transition-transform", isOpen ? "rotate-90" : "")} />
        )}
      </button>
      {subItems && isOpen && (
        <div className="mt-1 ml-9 space-y-1">
          {subItems.map((item) => (
            <button
              key={item}
              onClick={() => onSubItemClick?.(item)}
              className={cn(
                "w-full text-left px-2 py-1.5 text-xs transition-colors",
                currentSubItem === item ? "text-ams-accent font-bold" : "text-slate-400 hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
}

export const Sidebar = ({ currentModule, onModuleChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-ams-primary h-screen flex flex-col border-r border-white/10 shrink-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => onModuleChange('总览')}>
        <div className="w-8 h-8 bg-ams-accent rounded flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-none">AMS系统</h1>
          <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-widest">Asset Management System</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="mb-6">
          <p className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">核心功能</p>
          <NavItem 
            icon={LayoutDashboard} 
            label="总览" 
            active={currentModule === '总览'} 
            onClick={() => onModuleChange('总览')} 
          />
          <NavItem 
            icon={PieChart} 
            label="组合分析" 
            subItems={["组合报告", "资产配置", "头寸表", "运营报表", "交易流水", "风险预警"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
            active={["组合报告", "资产配置", "头寸表", "运营报表", "交易流水", "风险预警"].includes(currentModule)}
          />
          <NavItem 
            icon={BarChart3} 
            label="绩效评估" 
            subItems={["组合盈亏分析", "组合业绩归因", "仓位追踪", "周期分析", "因子风格", "因子收益", "因子归因"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
            active={["组合盈亏分析", "组合业绩归因", "仓位追踪", "周期分析", "因子风格", "因子收益", "因子归因"].includes(currentModule)}
          />
          <NavItem 
            icon={LineChart} 
            label="组合统计" 
            subItems={["产品全景", "持仓全景", "产品对比", "相关性分析", "期权行权"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
            active={["产品全景", "持仓全景", "产品对比", "相关性分析", "期权行权"].includes(currentModule)}
          />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">管理与合规</p>
          <NavItem 
            icon={Search} 
            label="研究管理" 
            subItems={["基金池", "研究报告上传", "研究报告审批"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
          />
          <NavItem 
            icon={ShieldCheck} 
            label="合规风控" 
            subItems={["额度监控", "额度设置"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
          />
          <NavItem 
            icon={Database} 
            label="数据中心" 
            subItems={["估值表导入", "交易流水导入", "交易持仓核对", "资产价格设置", "份额分红管理", "资金成本管理", "历史数据封账"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
          />
        </div>

        <div>
          <p className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">系统配置</p>
          <NavItem 
            icon={Users} 
            label="产品管理" 
            subItems={["产品设置", "产品分组", "自定义组合", "自定义基准", "模型参数设置"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
          />
          <NavItem 
            icon={Settings} 
            label="系统管理" 
            subItems={["团队设置", "权限管理 (产品/功能)", "操作日志"]} 
            onSubItemClick={onModuleChange}
            currentSubItem={currentModule}
          />
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
            PM
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">张经理</p>
            <p className="text-[10px] text-slate-400 truncate">投资研究团队</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
