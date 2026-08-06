import type { KnowledgeBase } from '../knowledge/types';
import { selectSection, selectConnector } from './select';

/** Golden 用例跑批（knowledge/tests/golden.yaml，M3 验收基准） */

export interface GoldenResult {
  id: string;
  rule: string;
  pass: boolean;
  expected: string;
  actual: string;
}

interface GoldenTest {
  id: string;
  rule: string;
  input: Record<string, unknown>;
  expect: Record<string, unknown>;
}

export function runGolden(kb: KnowledgeBase): GoldenResult[] {
  const doc = kb.tests['golden'] as { tests: GoldenTest[] } | undefined;
  if (!doc?.tests) return [];
  const results: GoldenResult[] = [];

  for (const t of doc.tests) {
    let pass = false;
    let actual = '';
    const expected = JSON.stringify(t.expect);

    try {
      if (t.rule.startsWith('sel')) {
        const r = selectSection({
          span: Number(t.input.span),
          loadKg: Number(t.input.loadKg),
          highRisk: ['aquarium', 'child', 'overhead'].includes(String(t.input.scene)),
        });
        actual = r.use;
        pass = r.use === t.expect.use;
      } else if (t.rule.startsWith('con')) {
        const r = selectConnector({
          joint: t.input.joint as 'corner-90',
          load: t.input.load as 'light' | 'heavy',
          hiddenRequired: Boolean(t.input.hiddenRequired),
        });
        const conn = kb.connectors.find((c) => c.connector.id === r.use)?.connector;
        actual = r.use;
        pass = r.use === t.expect.use;
        if (pass && t.expect.machiningCount !== undefined) {
          pass = (conn?.machining.length ?? -1) === Number(t.expect.machiningCount);
          actual += ` machining=${conn?.machining.length}`;
        }
        if (pass && Array.isArray(t.expect.machining)) {
          const exp = t.expect.machining[0] as { type: string; diameter: number };
          const got = conn?.machining[0] as { type?: string; diameter?: number } | undefined;
          pass = got?.type === exp.type && Number(got?.diameter) === exp.diameter;
          actual += ` machining[0]=${got?.type}Φ${got?.diameter}`;
        }
      } else if (t.rule === 'length-derivation') {
        const sec = kb.sections.find((s) => s.section.id === t.input.posts)!.section;
        const conn = kb.connectors.find((c) => c.connector.id === String(t.input.connector))?.connector
          ?? kb.connectors.find((c) => c.connector.category === 'corner')!.connector;
        const beam = Number(t.input.overallWidth) - 2 * sec.size[0] + 2 * conn.lengthOffset;
        actual = String(beam);
        pass = beam === Number(t.expect.beamLength);
      } else if (t.rule === 'pricing') {
        const sec = kb.sections.find((s) => s.section.id === t.input.section)!.section;
        const price = (sec.price.perMeter ?? 0) * Number(t.input.length) / 1000;
        actual = price.toFixed(3);
        const tol = Number(t.expect.tolerance ?? 0.01);
        pass = Math.abs(price - Number(t.expect.priceUntaxed)) <= tol;
      } else {
        actual = '未知规则类型';
      }
    } catch (e) {
      actual = `异常: ${(e as Error).message}`;
    }

    results.push({ id: t.id, rule: t.rule, pass, expected, actual });
  }
  return results;
}
