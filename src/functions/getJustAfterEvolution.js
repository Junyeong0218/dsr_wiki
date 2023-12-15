import { Evolution } from "../classes";

const getJustAfterEvolution = (digimon) => {
    if(digimon.afters === null) return;
  
    digimon.afters.forEach(after => {
      const target = Evolution.getById(after.to);
      target.afters = null;
      
      after['digimon'] = target;
    });
}

export default getJustAfterEvolution;