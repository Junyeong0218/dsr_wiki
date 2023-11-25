export default class Revolution {
    constructor(raw) {
        // 진화 전후 id
        this.from = raw.from;
        this.to = raw.to;
        // 진화 확률 소숫점(rate <= 1)
        this.rate = raw.rate;
        // 진화 재료 string
        this.ingredient = raw.ingredient;
        // 진화 방법 string
        this.method = raw.method;

        // 진화에 필요한 스텟 number
        this.level = raw.level;
        this.bonding = raw.bonding;
        this.str = raw.str;
        this.int = raw.int;
        this.spd = raw.spd;
        this.res = raw.res;
        this.def = raw.def;

        // 조그레스 진화시 필요 디지몬 id number
        this.with = raw.with;
    }

    getRate = () => Number.isInteger(this.rate * 100) ? 
                    this.rate * 100 :
                    (this.rate * 100).toFixed(2);
}