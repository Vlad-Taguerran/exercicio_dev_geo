export class CensusCsv{
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly censoEstabelecimentoOutrasFinalidades: number,
    public readonly censoDomicilioParticular: number,
    public readonly censoEstabelecimentoConstrucao: number,
    public readonly censoEstabelecimentoReligioso: number,
    public readonly censoEstabelecimentoEnsino: number,
    public readonly censoEstabelecimentoSaude: number,
    public readonly censoDomicilioColetivo: number,
    public readonly censoEstabelecimentoAgro: number
  ){}
}