import { Unit, SubTopic } from './types';
import { unit1 } from './data/unit1';
import { unit2 } from './data/unit2';
import { unit3 } from './data/unit3';
import { unit4 } from './data/unit4';
import { unit5 } from './data/unit5';

export * from './types';

export const courseInfo = {
  code: 'BTCS 701-18',
  title: 'Network Security and Cryptography',
  shortTitle: 'NSC',
  totalHours: 33,
  department: 'Computer Science & Engineering',
  semester: 'Semester 7 / Professional Core Elective',
  description:
    'An advanced, rigorous engineering curriculum covering foundational number theory, symmetric block ciphers, public-key cryptosystems, cryptographic hashes, MACs, digital signatures, Kerberos authentication, and end-to-end network perimeter defense architectures.',
  highlights: [
    { label: 'Total Units', value: '5 Units' },
    { label: 'Lecture Hours', value: '33 Hours' },
    { label: 'Core Topics', value: '45 Modules' },
    { label: 'Target Outcomes', value: 'CO1 – CO5' }
  ]
};

export const units: Unit[] = [unit1, unit2, unit3, unit4, unit5];

export function getUnitById(id: string): Unit | undefined {
  return units.find(u => u.id === id || u.id === `unit-${id}`);
}

export function getUnitByNumber(num: number): Unit | undefined {
  return units.find(u => u.number === num);
}

export function getAllTopics(): SubTopic[] {
  return units.flatMap(u => u.subtopics);
}

export function getTopicBySlug(slug: string): { topic: SubTopic; unit: Unit; prevTopic?: SubTopic; nextTopic?: SubTopic } | undefined {
  for (const unit of units) {
    const topicIndex = unit.subtopics.findIndex(t => t.slug === slug);
    if (topicIndex !== -1) {
      const topic = unit.subtopics[topicIndex];
      const prevTopic = topicIndex > 0 ? unit.subtopics[topicIndex - 1] : undefined;
      const nextTopic = topicIndex < unit.subtopics.length - 1 ? unit.subtopics[topicIndex + 1] : undefined;
      return { topic, unit, prevTopic, nextTopic };
    }
  }
  return undefined;
}

export function searchTopics(query: string): SubTopic[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const all = getAllTopics();
  return all.filter(t => {
    return (
      t.title.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.keyPoints.some(kp => kp.toLowerCase().includes(q)) ||
      t.explanation.some(p => p.toLowerCase().includes(q))
    );
  });
}
