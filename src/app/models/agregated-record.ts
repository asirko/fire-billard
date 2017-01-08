export class AgregatedRecord {
  cassePerdu: number = 0;
  casseGagne: number = 0;
  casseFerme: number = 0;
  reprisePerdu: number = 0;
  repriseGagne: number = 0;
  repriseFerme: number = 0;

  serieGagneeLaPlusLongue: number = 0;
  serieGagneeCourante: number = 0;

  public getPerdues() : number {
    return this.cassePerdu + this.reprisePerdu;
  }

  public getGagnees() : number {
    return this.casseGagne + this.repriseGagne;
  }

  public getFermees() : number {
    return this.casseFerme + this.repriseFerme;
  }

  public getTotal() : number {
    return this.getTotalCasse() + this.getTotalReprise();
  }

  public getTotalCasse() : number {
    return this.cassePerdu + this.casseGagne;
  }

  public getTotalReprise() : number {
    return this.reprisePerdu + this.repriseGagne;
  }

  public getPercentCassePerdu(): number {
    return this.getTotalCasse() === 0 ? 0 : this.cassePerdu * 100 / this.getTotalCasse();
  }

  public getPercentCasseGagne(): number {
    return this.getTotalCasse() === 0 ? 0 : this.casseGagne * 100 / this.getTotalCasse();
  }

  public getPercentCasseFerme(): number {
    return this.getTotalCasse() === 0 ? 0 : this.casseFerme * 100 / this.getTotalCasse();
  }

  public getPercentReprisePerdu(): number {
    return this.getTotalReprise() === 0 ? 0 : this.reprisePerdu * 100 / this.getTotalReprise();
  }

  public getPercentRepriseGagne(): number {
    return this.getTotalReprise() === 0 ? 0 : this.repriseGagne * 100 / this.getTotalReprise();
  }

  public getPercentRepriseFerme(): number {
    return this.getTotalReprise() === 0 ? 0 : this.repriseFerme * 100 / this.getTotalReprise();
  }

  public getPercentPerdu(): number {
    return this.getTotal() === 0 ? 0 : this.getPerdues() * 100 / this.getTotal();
  }

  public getPercentGagne(): number {
    return this.getTotal() === 0 ? 0 : this.getGagnees() * 100 / this.getTotal();
  }

  public getPercentFerme(): number {
    return this.getTotal() === 0 ? 0 : this.getFermees() * 100 / this.getTotal();
  }
}
