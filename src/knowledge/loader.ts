import { parse } from 'yaml';
import type { KnowledgeBase, SectionRecord, ConnectorRecord } from './types';

const files = import.meta.glob('../../knowledge/**/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function loadKnowledgeBase(): KnowledgeBase {
  const kb: KnowledgeBase = { sections: [], connectors: [], rules: {}, tests: {}, materials: {}, panels: {}, fasteners: {}, archetypes: {} };

  for (const [path, raw] of Object.entries(files)) {
    const doc = parse(raw);
    if (path.includes('/sections/')) {
      kb.sections.push(doc as SectionRecord);
    } else if (path.includes('/connectors/')) {
      kb.connectors.push(doc as ConnectorRecord);
    } else if (path.includes('/rules/')) {
      const name = path.split('/').pop()!.replace('.yaml', '');
      kb.rules[name] = doc;
    } else if (path.includes('/tests/')) {
      const name = path.split('/').pop()!.replace('.yaml', '');
      kb.tests[name] = doc;
    } else if (path.endsWith('materials.yaml')) {
      kb.materials = doc;
    } else if (path.endsWith('panels.yaml')) {
      kb.panels = doc.panels;
    } else if (path.endsWith('fasteners.yaml')) {
      kb.fasteners = doc.fasteners;
    } else if (path.endsWith('archetypes.yaml')) {
      kb.archetypes = doc.archetypes;
    }
  }

  kb.sections.sort((a, b) => a.section.series - b.section.series);
  return kb;
}
