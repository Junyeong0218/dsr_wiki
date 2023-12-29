import { Evolution } from "../classes";

const getJustBeforeEvolution = (evolution: Evolution): void => {
    if(evolution.befores === null) return;
  
    evolution.befores.forEach(before => {
      const target = Evolution.getById(before.from);
      
      if(target) {
        target.befores = null;
      
        before.digimon = target;
      }
    });
}

export default getJustBeforeEvolution;