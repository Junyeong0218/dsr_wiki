import { Evolution } from "../classes";

const divideEvolutionByMethod = (evolution: Evolution): [Evolution, Evolution|null] => {
    const commonEvolution = new Evolution(evolution);
    let jogressEvolution = null;

    commonEvolution.afters = evolution.afters?.filter(after => after.method === "일반") ?? null;
    if(commonEvolution.afters?.length !== evolution.afters?.length) {
        jogressEvolution = new Evolution(evolution);
        jogressEvolution.afters = jogressEvolution.afters?.filter(after => after.method === "조그레스") ?? null;
    }

    return [ commonEvolution, jogressEvolution ];
}

export default divideEvolutionByMethod;