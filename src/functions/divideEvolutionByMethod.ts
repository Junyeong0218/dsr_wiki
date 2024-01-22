import { Evolution } from "../classes";

const divideEvolutionByMethod = (evolution: Evolution): [Evolution, Evolution|null] => {
    const commonEvolution = new Evolution(evolution);
    let jogressEvolution = null;

    commonEvolution.afters = evolution.afters?.filter(after => after.method === "일반") ?? [];
    if(evolution.afters && evolution.afters.filter(after => after.method !== "일반").length > 0) {
        jogressEvolution = new Evolution(evolution);
        jogressEvolution.afters = jogressEvolution.afters?.filter(after => after.method === "조그레스") ?? null;
        jogressEvolution.afters?.forEach(after => {
            after.digimon = evolution.afters!.find(a => a.to === after.to)!.digimon;
        });
    }

    return [ commonEvolution, jogressEvolution ];
}

export default divideEvolutionByMethod;