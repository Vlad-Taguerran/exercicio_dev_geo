"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CensusCsv = void 0;
class CensusCsv {
    constructor(latitude, longitude, censoEstabelecimentoOutrasFinalidades, censoDomicilioParticular, censoEstabelecimentoConstrucao, censoEstabelecimentoReligioso, censoEstabelecimentoEnsino, censoEstabelecimentoSaude, censoDomicilioColetivo, censoEstabelecimentoAgro) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.censoEstabelecimentoOutrasFinalidades = censoEstabelecimentoOutrasFinalidades;
        this.censoDomicilioParticular = censoDomicilioParticular;
        this.censoEstabelecimentoConstrucao = censoEstabelecimentoConstrucao;
        this.censoEstabelecimentoReligioso = censoEstabelecimentoReligioso;
        this.censoEstabelecimentoEnsino = censoEstabelecimentoEnsino;
        this.censoEstabelecimentoSaude = censoEstabelecimentoSaude;
        this.censoDomicilioColetivo = censoDomicilioColetivo;
        this.censoEstabelecimentoAgro = censoEstabelecimentoAgro;
    }
}
exports.CensusCsv = CensusCsv;
