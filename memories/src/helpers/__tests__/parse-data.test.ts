import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { keyMap, renameKeysAuto } from '../parse-data.ts';


describe('renameKeysAuto', () => {
  const jsonPath = path.resolve(__dirname, 'raw-data-test.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const result = renameKeysAuto(data, keyMap);
  const first = result[0];

  it.each(Object.entries(keyMap))(
    'maps "%s" to "%s" (new key exists, old key does not)',
    (oldKey, newKey) => {
      expect(first).toHaveProperty(newKey);
      expect(first).not.toHaveProperty(oldKey);
    }
  );
});
