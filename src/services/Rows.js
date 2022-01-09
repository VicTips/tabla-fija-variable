class Row {
  constructor(loan, nper, rate) {
    this.loan = loan;
    this.nper = nper;
    this.rate = rate;
  }

  pmtFixed() {
    let payment = "";
    if (this.loan && this.nper && this.rate !== "") {
      payment = (this.loan * (this.rate / 100)) / (1 - (1 + (this.rate / 100) ** -this.nper));
    }

    let rows = [
      { nper: 0, payment: 0, interest: 0, principal: 0, balance: this.loan },
    ];
    if (this.loan && this.nper && this.rate !== "") {
      for (let period = 1; period <= this.nper; period++) {
        rows.push({
          period: period,
          payment: payment,
          interest:
            ((this.loan * (1 + this.rate / 100) ** (period - 1) -
              (payment * ((1 + this.rate / 100) ** (period - 1) - 1)) / (this.rate / 100)) *
              this.rate) /
            100,
          principal:
            payment -
            ((this.loan * (1 + this.rate / 100) ** (period - 1) -
              (payment * ((1 + this.rate / 100) ** (period - 1) - 1)) / (this.rate / 100)) *
              this.rate) /
              100,
          balance:
            this.loan * (1 + this.rate / 100) ** period -
            (payment * ((1 + this.rate / 100) ** period - 1)) / (this.rate / 100),
        });
      }
    }
    return rows;
  }

  pmtVariable() {
    let principal = "";
    if (this.loan && this.nper && this.rate !== "") {
      principal = this.loan / this.nper;
    }

    let rows = [
      { period: 0, payment: 0, interest: 0, principal: 0, balance: this.loan },
    ];
    if (this.loan && this.nper && this.rate !== "") {
      for (let period = 1; period <= this.nper; period++) {
        rows.push({
          period: period,
          payment: principal + (this.loan - (this.loan / this.nper) * (period - 1)) * this.rate / 100,
          interest: (this.loan - (this.loan / this.nper) * (period - 1)) * this.rate / 100,
          principal: principal,
          balance: this.loan - (this.loan / this.nper) * period,
        });
      }
    }
    return rows;
  }
}
