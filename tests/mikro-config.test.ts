/* eslint-disable import/no-unresolved */
/**
 * tests/mikro-config.test.ts
 * Validates that your ORM config picks up DB_TYPE correctly.
 */

describe('MikroORM Config', () => {
  // Helper to dynamically import the config with current process.env
  async function loadConfig(): Promise<{ type: string }> {
    // Clear the module cache so import sees updated env
    jest.resetModules();
    // Dynamically import the TS config file (no .ts extension)
    const mod = await import('../mikro-orm.config');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mod.default as any; // default export from defineConfig includes .type
  }

  it('defaults to mysql when DB_TYPE is empty', async () => {
    process.env.DB_TYPE = '';
    const config = await loadConfig();
    expect(config.type).toBe('mysql');
  });

  it('uses mongo when DB_TYPE=mongo', async () => {
    process.env.DB_TYPE = 'mongo';
    const config = await loadConfig();
    expect(config.type).toBe('mongo');
  });
});
