/** 单句诊断：抽取 → 意图 → 生成，打印关键字段（排查电脑桌语义未触发问题） */
import { extractIntent } from '../src/engine/extract';
import { intentToSpec } from '../src/engine/intent';
import { generateFrame } from '../src/engine/generate';
import { loadKbNode } from './kb-node';

const RAW = process.argv[2] ?? '铝型材电脑桌架子 双层加中间立面洞洞板设计 上方置物展览架 中间放27寸超杀pro的显示器带移动可调节支架 桌子长1.5m进深90cm';

const kb = loadKbNode();
const ex = await extractIntent(RAW, []);
console.log('--- 抽取 ---');
console.log(JSON.stringify({
  productType: ex.productType, scene: ex.scene, dimensions: ex.dimensions,
  layers: ex.layers, panels: ex.panels,
}, null, 2));

const r = intentToSpec(ex, kb);
console.log('--- 意图 spec ---');
console.log(JSON.stringify({
  width: r.spec.width, depth: r.spec.depth, height: r.spec.height,
  scene: r.spec.scene, shelfCount: r.spec.shelfCount,
  deskTop: r.spec.workbenchDeskTopHeightMm,
  shelfPanel: r.spec.shelfPanel, backPanel: r.spec.backPanel,
}, null, 2));
console.log('假设:', r.assumptions.filter((a) => a.includes('工作台') || a.includes('高')));
console.log('降级:', r.unsupported);

const m = generateFrame(r.spec, kb);
const shelfYs = m.panels.filter((p) => p.mode === 'shelf-overlap').map((p) => Math.round(p.position[1]));
console.log('--- 生成 ---');
console.log('隔板面高度:', shelfYs, '状态:', m.status);
console.log('立柱:', m.members.filter((x) => x.role === 'post').map((x) => ({
  len: x.length, y: Math.round(x.position[1]), z: Math.round(x.position[2]),
})));
console.log('桌下梁:', m.members.filter((x) => x.role !== 'post' && x.position[1] < 100).map((x) => ({
  role: x.role, len: x.length, z: Math.round(x.position[2]),
})));
console.log('板材:', m.panels.map((p) => ({
  mode: p.mode, material: p.material, size: p.size.map(Math.round), position: p.position.map(Math.round),
})));
