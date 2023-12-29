import { Evolution } from "../classes";

const getJustAfterEvolution = (evolution: Evolution): void => {
    if(evolution.afters === null) return;
  
    evolution.afters.forEach(after => {
      const target = Evolution.getById(after.to);
      
      if(target) {
        target.afters = null;
      
        after.digimon = target;
      }
    });
}

export default getJustAfterEvolution;