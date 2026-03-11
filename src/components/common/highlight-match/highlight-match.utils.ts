import { normalizeString } from '@/utils';
import type { IMatchRange, INormalizedTextWithIndexMap } from '@/types';

function normalizeWithIndexMap(value: string): INormalizedTextWithIndexMap {
  const normalizedCharacters: string[] = [];
  const indexMap: number[] = [];
  let previousCharacterWasWhitespace = true;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if (/\s/.test(character)) {
      if (previousCharacterWasWhitespace) {
        continue;
      }

      normalizedCharacters.push(' ');
      indexMap.push(index);
      previousCharacterWasWhitespace = true;

      continue;
    }

    normalizedCharacters.push(character.toLowerCase());
    indexMap.push(index);
    previousCharacterWasWhitespace = false;
  }

  while (normalizedCharacters.at(-1) === ' ') {
    normalizedCharacters.pop();
    indexMap.pop();
  }

  return {
    value: normalizedCharacters.join(''),
    indexMap,
  };
}

function mergeMatchRanges(ranges: IMatchRange[]) {
  if (ranges.length === 0) {
    return ranges;
  }

  return ranges.reduce<IMatchRange[]>((mergedRanges, currentRange) => {
    const previousRange = mergedRanges.at(-1);

    if (!previousRange || currentRange.start > previousRange.end) {
      mergedRanges.push(currentRange);

      return mergedRanges;
    }

    previousRange.end = Math.max(previousRange.end, currentRange.end);

    return mergedRanges;
  }, []);
}

export function getMatchRanges(text: string, query: string): IMatchRange[] {
  const normalizedQuery = normalizeString(query);

  if (!normalizedQuery) {
    return [];
  }

  const normalizedText = normalizeWithIndexMap(text);

  if (!normalizedText.value) {
    return [];
  }

  const matchRanges: IMatchRange[] = [];
  let searchStartIndex = 0;

  while (searchStartIndex < normalizedText.value.length) {
    const matchIndex = normalizedText.value.indexOf(normalizedQuery, searchStartIndex);

    if (matchIndex === -1) {
      break;
    }

    const matchStart = normalizedText.indexMap[matchIndex];
    const matchEnd = normalizedText.indexMap[matchIndex + normalizedQuery.length - 1];

    if (matchStart !== undefined && matchEnd !== undefined) {
      matchRanges.push({
        start: matchStart,
        end: matchEnd + 1,
      });
    }

    searchStartIndex = matchIndex + normalizedQuery.length;
  }

  return mergeMatchRanges(matchRanges);
}
