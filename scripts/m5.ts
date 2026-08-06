import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadKbNode } from './kb-node';
import { extractIntent } from '../src/engine/extract';
import { intentToSpec } from '../src/engine/intent';
import { generateFrame } from '../src/engine/generate';

/**
 * M5 跑批器：原生组 10 条原话 → 抽取 → 意图映射 → 生成 → 校验，输出记录链。
 * 评分由人工完成（实施计划六：禁止自动断言掩盖问题）。
 * 用法：$env:LONGCAT_API_KEY='...' ; npm run m5
 */
// 公司网络代理证书链不完整，仅测试脚本放宽（生产走后端转发）
(globalThis as { process?: { env: Record<string, string> } }).process!.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface M5Case { id: string; raw: string; expected: string }

const kb = loadKbNode();
const cases = (kb.tests['m5-native'] as { cases: M5Case[] }).cases;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function runCase(c: M5Case) {
  console.log(`\n── ${c.id} ──`);
  console.log(`原话: ${c.raw}`);
  let extraction = null;
  let lastErr = '';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      extraction = await extractIntent(c.raw);
      break;
    } catch (e) {
      lastErr = (e as Error).message;
      console.log(`  重试 ${attempt}/3: ${lastErr}`);
      await sleep(2000 * attempt);
    }
  }
  if (!extraction) {
    return { id: c.id, raw: c.raw, expected: c.expected, error: `抽取失败: ${lastErr}` };
  }
  const intent = intentToSpec(extraction, kb);
  let model = null;
  let genError = null;
  try {
    model = generateFrame(intent.spec, kb);
  } catch (e) {
    genError = (e as Error).message;
  }
  const record = {
    id: c.id,
    raw: c.raw,
    expected: c.expected,
    extraction: {
      productType: extraction.productType,
      dimensions: extraction.dimensions,
      load: extraction.load,
      scene: extraction.scene,
      mobility: extraction.mobility,
      layers: extraction.layers,
      panels: extraction.panels,
      _missing: extraction._missing,
      _assumptions: extraction._assumptions,
      _riskFlags: extraction._riskFlags,
    },
    intent: {
      spec: intent.spec,
      assumptions: intent.assumptions,
      questions: intent.questions,
      unsupported: intent.unsupported,
      riskFlags: intent.riskFlags,
    },
    model: model ? {
      status: model.status,
      members: model.members.length,
      panels: model.panels.length,
      mounts: model.mounts.length,
      machining: model.machining.length,
      costTotal: model.totals.cost.total,
      checks: model.checks.map((k) => `${k.level}:${k.ruleId} ${k.message.slice(0, 60)}`),
      warnings: model.warnings,
      cutList: model.cutList.map((x) => `${x.partNo} L${x.length}×${x.qty} ${x.machiningNote}`),
      panelList: model.panelList.map((p) => `${p.partNo} ${p.materialName} ${p.size.join('×')}×${p.qty} ${p.holeNote}`),
    } : { genError },
  };
  console.log(`  抽取: ${JSON.stringify(extraction.dimensions)} load=${extraction.load?.totalKg} mobility=${extraction.mobility} layers=${extraction.layers}`);
  console.log(`  追问: ${intent.questions.join(' | ') || '无'}`);
  console.log(`  降级: ${intent.unsupported.join('、') || '无'}`);
  console.log(`  模型: ${model ? `${model.status} 构件${model.members.length} ¥${model.totals.cost.total}` : `生成失败 ${genError}`}`);
  return record;
}

const records = [];
for (const c of cases) {
  records.push(await runCase(c));
  await sleep(1000);
}

const outDir = join(import.meta.dirname, '..', 'out');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'm5-report.json'), JSON.stringify(records, null, 2), 'utf8');

// 人读版：记录链 + 空白评分表（五维各20分，人工填写）
const md = [
  '# M5 回归验收记录链（自动生成，评分人工填写）',
  `\n生成时间: ${new Date().toISOString()}\n`,
  '| 用例 | 意图20 | 几何20 | 装配20 | 制造20 | 风险20 | 总分 | 结论 |',
  '|---|---|---|---|---|---|---|---|',
  ...records.map((r) => `| ${r.id} | | | | | | | |`),
  '',
  ...records.flatMap((r) => [
    `## ${r.id}`,
    `**原话**：${r.raw}`,
    `**期望要点**：${r.expected}`,
    '```json',
    JSON.stringify(r, null, 2),
    '```',
    '**行家结论**：（待填）',
    '**缺陷归因**：（意图/知识/生成/装配/校验/界面）',
    '',
  ]),
].join('\n');
writeFileSync(join(outDir, 'm5-report.md'), md, 'utf8');
console.log(`\n完成 ${records.length} 条 → out/m5-report.{json,md}`);
