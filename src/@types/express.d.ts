/** Substituição de tipos de uma biblioteca
 * Neste caso a propriedade "user", contendo "id" do tipo string, será anexada ao parâmetro
 * "Request" na biblioteca Express.
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
