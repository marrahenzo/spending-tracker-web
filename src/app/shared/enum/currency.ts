export interface Currency {
  name: string;
  displayName: string;
  abbreviation: string;
  symbol: string;
}

class _Currency {
  ARG_PESOS: Currency = {
    name: 'ARG_PESOS',
    displayName: 'Argentine Pesos',
    abbreviation: 'ARS',
    symbol: '$',
  };

  US_DOLLARS: Currency = {
    name: 'US_DOLLARS',
    displayName: 'U.S. Dollars',
    abbreviation: 'USD',
    symbol: 'US$',
  };

  getByName(name: string | Currency): Currency {
    // It might already be a Currency object
    if (typeof name != 'string') return name;

    return Object.values(this).find((object) => object.name === name);
  }

  getValues() {
    return [this.ARG_PESOS, this.US_DOLLARS];
  }
}

export const Currency = new _Currency();
