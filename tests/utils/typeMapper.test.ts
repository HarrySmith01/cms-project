// Description: Unit-test the SQL-type mapper
import { mapToSqlType } from '../../src/utils/typeMapper';

describe('mapToSqlType()', () => {
  it.each([
    [{ internal_type: 'string', max_length: 50 }, 'varchar(50)'],
    [{ internal_type: 'string' }, 'varchar(255)'],
    [{ internal_type: 'decimal', precision: 10, scale: 4 }, 'decimal(10,4)'],
    [{ internal_type: 'json' }, 'json'],
    [{ internal_type: 'unknown' }, 'text'],
  ])('maps %o → %s', (snap: any, expected) => {
    expect(mapToSqlType(snap)).toBe(expected);
  });
});
