import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import type { KnowledgeBase, SectionRecord, ConnectorRecord } from '../src/knowledge/types';

/** Node 版知识库装载（与 src/knowledge/loader.ts 同构，CLI 跑批用） */
export function loadKbNode(root = join(import.meta.dirname, '..', 'knowledge')): KnowledgeBase {
  const kb: KnowledgeBase = { sections: [], connectors: [], rules: {}, tests: {}, materials: {}, panels: {}, fasteners: {}, archetypes: {} };
  const files = readdirSync(root, { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.yaml'));
  for (const rel of files) {
    const path = rel.replaceAll('\\', '/');
    const doc = parse(readFileSync(join(root, rel), 'utf8'));
    if (path.includes('sections/')) kb.sections.push(doc as SectionRecord);
    else if (path.includes('connectors/')) kb.connectors.push(doc as ConnectorRecord);
    else if (path.includes('rules/')) kb.rules[path.split('/').pop()!.replace('.yaml', '')] = doc;
    else if (path.includes('tests/')) kb.tests[path.split('/').pop()!.replace('.yaml', '')] = doc;
    else if (path.endsWith('materials.yaml')) kb.materials = doc;
    else if (path.endsWith('panels.yaml')) kb.panels = doc.panels;
    else if (path.endsWith('fasteners.yaml')) kb.fasteners = doc.fasteners;
    else if (path.endsWith('archetypes.yaml')) kb.archetypes = doc.archetypes;
  }
  return kb;
}
