import { Evolution } from "../classes";

const getJustBeforeEvolution = (digimon) => {
    if(digimon.befores === null) return;
  
    digimon.befores.forEach(before => {
      const target = Evolution.getById(before.from);
      target.befores = null;
      
      before['digimon'] = target;
    });
}

export default getJustBeforeEvolution;