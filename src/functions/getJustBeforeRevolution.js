import Digimon from "../classes/Digimon";

const getJustBeforeRevolution = (digimon) => {
    if(digimon.befores === null) return;
  
    digimon.befores.forEach(before => {
      const target = Digimon.getById(before.from);
      
      before['digimon'] = target;
    });
}

export default getJustBeforeRevolution;