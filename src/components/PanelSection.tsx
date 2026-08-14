import { useState, type ReactNode } from 'react';

/** 折叠分区：渐进披露的核心控件——默认展开常用组，高级组折叠 */
export function Section({ title, icon, defaultOpen = false, children, badge }: {
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  badge?: string | number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 2, borderBottom: '1px solid #eef0f3' }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '9px 0',
        background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
        color: '#3a4050', textAlign: 'left',
      }}>
        <span style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', fontSize: 10, color: '#8a90a0', width: 12, display: 'inline-block' }}>▶</span>
        {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
        <span style={{ flex: 1 }}>{title}</span>
        {badge != null && <span style={{ fontSize: 10, background: '#e8edf4', color: '#6b7280', borderRadius: 8, padding: '1px 7px', fontWeight: 400 }}>{badge}</span>}
      </button>
      {open && <div style={{ paddingBottom: 10 }}>{children}</div>}
    </div>
  );
}

/** 参数行：标签 + 控件 + 单位，对齐的表单布局 */
export function ParamRow({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{label}</span>
        {children}
      </div>
      {hint && <div style={{ fontSize: 10, color: '#9ca3af', marginTop: - 4 }}>{hint}</div>}
    </div>
  );
}

/** 变更指示器：参数修改后显示 ● 提示未应用（Phase 0 实时生成，仅作变更标记） */
export function ChangeDot({ show }: { show: boolean }) {
  if (!show) return null;
  return <span style={{ width: 6, height: 6, borderRadius: 50, background: '#f0a500', display: 'inline-block', marginLeft: 4 }} title="已修改" />;
}
