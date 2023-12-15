export default class EvolutionInfo {
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
        this.reqLevel = raw.reqLevel;
        this.reqBonding = raw.reqBonding;
        this.reqStr = raw.reqStr;
        this.reqInt = raw.reqInt;
        this.reqSpd = raw.reqSpd;
        this.reqRes = raw.reqRes;
        this.reqDef = raw.reqDef;

        // 조그레스 진화시 필요 디지몬 id number
        this.with = raw.with;
    }

    getRate = () => Number.isInteger(this.rate * 100) ? 
                    this.rate * 100 :
                    (this.rate * 100).toFixed(2);
    getBonding = () => Number.isInteger(this.reqBonding * 100) ? 
                    this.reqBonding * 100 :
                    (this.reqBonding * 100).toFixed(3);
}