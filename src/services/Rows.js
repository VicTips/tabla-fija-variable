class Rows {
  constructor(loanAmount, nPer, intRate) {
    this.loanAmount = loanAmount;
    this.nPer = nPer;
    this.intRate = intRate;
  }

  pmtFixed() {
    let payment = "";
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      payment =
        (this.loanAmount *
          (1 + this.intRate / 100) ** this.nPer *
          this.intRate) /
        100 /
        ((1 + this.intRate / 100) ** this.nPer - 1);
    }

    let rows = [
      {
        period: 0,
        payment: 0,
        interest: 0,
        principal: 0,
        balance: this.loanAmount,
      },
    ];
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      for (let period = 1; period <= this.nPer; period++) {
        rows.push({
          period: period,
          payment: payment,
          interest:
            ((this.loanAmount * (1 + this.intRate / 100) ** (period - 1) -
              (payment * ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                (this.intRate / 100)) *
              this.intRate) /
            100,
          principal:
            payment -
            ((this.loanAmount * (1 + this.intRate / 100) ** (period - 1) -
              (payment * ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                (this.intRate / 100)) *
              this.intRate) /
              100,
          balance:
            this.loanAmount * (1 + this.intRate / 100) ** period -
            (payment * ((1 + this.intRate / 100) ** period - 1)) /
              (this.intRate / 100),
        });
      }
    }
    return rows;
  }

  pmtVariable() {
    let principal = "";
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      principal = this.loanAmount / this.nPer;
    }

    let rows = [
      {
        period: 0,
        payment: 0,
        interest: 0,
        principal: 0,
        balance: this.loanAmount,
      },
    ];
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      for (let period = 1; period <= this.nPer; period++) {
        rows.push({
          period: period,
          payment:
            principal +
            ((this.loanAmount - (this.loanAmount / this.nPer) * (period - 1)) *
              this.intRate) /
              100,
          interest:
            ((this.loanAmount - (this.loanAmount / this.nPer) * (period - 1)) *
              this.intRate) /
            100,
          principal: principal,
          balance: this.loanAmount - (this.loanAmount / this.nPer) * period,
        });
      }
    }
    return rows;
  }

  linearGrowth(gradient) {
    let payment = "";
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      payment =
        (this.loanAmount *
          ((this.intRate / 100) * (1 + this.intRate / 100) ** this.nPer)) /
          ((1 + this.intRate / 100) ** this.nPer - 1) -
        gradient *
          (1 / (this.intRate / 100) -
            this.nPer / ((1 + this.intRate / 100) ** this.nPer - 1));
    }

    let rows = [
      {
        period: 0,
        payment: 0,
        interest: 0,
        principal: 0,
        balance: this.loanAmount,
      },
    ];
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      for (let period = 1; period <= this.nPer; period++) {
        rows.push({
          period: period,
          payment: payment + gradient * (period - 1),
          interest:
            period === 1
              ? (this.loanAmount * this.intRate) / 100
              : ((this.loanAmount * (1 + this.intRate / 100) ** (period - 1) -
                  ((payment * ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                    (this.intRate / 100) +
                    (gradient *
                      (1 / (this.intRate / 100) -
                        (period - 1) /
                          ((1 + this.intRate / 100) ** (period - 1) - 1)) *
                      ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                      (this.intRate / 100))) *
                  this.intRate) /
                100,
          principal:
            payment +
            gradient * (period - 1) -
            (period === 1
              ? (this.loanAmount * this.intRate) / 100
              : ((this.loanAmount * (1 + this.intRate / 100) ** (period - 1) -
                  ((payment * ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                    (this.intRate / 100) +
                    (gradient *
                      (1 / (this.intRate / 100) -
                        (period - 1) /
                          ((1 + this.intRate / 100) ** (period - 1) - 1)) *
                      ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                      (this.intRate / 100))) *
                  this.intRate) /
                100),
          balance:
            this.loanAmount * (1 + this.intRate / 100) ** period -
            ((payment * ((1 + this.intRate / 100) ** period - 1)) /
              (this.intRate / 100) +
              (gradient *
                (1 / (this.intRate / 100) -
                  period / ((1 + this.intRate / 100) ** period - 1)) *
                ((1 + this.intRate / 100) ** period - 1)) /
                (this.intRate / 100)),
        });
      }
    }
    return rows;
  }

  linearDecay(gradient) {
    let payment = "";
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      payment =
        (this.loanAmount *
          ((this.intRate / 100) * (1 + this.intRate / 100) ** this.nPer)) /
          ((1 + this.intRate / 100) ** this.nPer - 1) +
        gradient *
          (1 / (this.intRate / 100) -
            this.nPer / ((1 + this.intRate / 100) ** this.nPer - 1));
    }

    let rows = [
      {
        period: 0,
        payment: 0,
        interest: 0,
        principal: 0,
        balance: this.loanAmount,
      },
    ];
    if (this.loanAmount && this.nPer && this.intRate !== "") {
      for (let period = 1; period <= this.nPer; period++) {
        rows.push({
          period: period,
          payment: payment - gradient * (period - 1),
          interest:
            period === 1
              ? (this.loanAmount * this.intRate) / 100
              : ((this.loanAmount * (1 + this.intRate / 100) ** (period - 1) -
                  ((payment * ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                    (this.intRate / 100) -
                    (gradient *
                      (1 / (this.intRate / 100) -
                        (period - 1) /
                          ((1 + this.intRate / 100) ** (period - 1) - 1)) *
                      ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                      (this.intRate / 100))) *
                  this.intRate) /
                100,
          principal:
            payment -
            gradient * (period - 1) -
            (period === 1
              ? (this.loanAmount * this.intRate) / 100
              : ((this.loanAmount * (1 + this.intRate / 100) ** (period - 1) -
                  ((payment * ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                    (this.intRate / 100) -
                    (gradient *
                      (1 / (this.intRate / 100) -
                        (period - 1) /
                          ((1 + this.intRate / 100) ** (period - 1) - 1)) *
                      ((1 + this.intRate / 100) ** (period - 1) - 1)) /
                      (this.intRate / 100))) *
                  this.intRate) /
                100),
          balance:
            this.loanAmount * (1 + this.intRate / 100) ** period -
            ((payment * ((1 + this.intRate / 100) ** period - 1)) /
              (this.intRate / 100) -
              (gradient *
                (1 / (this.intRate / 100) -
                  period / ((1 + this.intRate / 100) ** period - 1)) *
                ((1 + this.intRate / 100) ** period - 1)) /
                (this.intRate / 100)),
        });
      }
    }
    return rows;
  }
}

export default Rows;
