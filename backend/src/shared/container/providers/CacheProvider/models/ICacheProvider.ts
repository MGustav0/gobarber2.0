export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<TypeArgument>(key: string): Promise<TypeArgument | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
