import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<TypeArgument>(
    key: string,
  ): Promise<TypeArgument | null> {
    const data = await this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as TypeArgument;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    /** Deleta/invalida os ids de usuários salvos */
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
