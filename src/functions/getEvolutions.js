import Evolution from "../classes/Evolution";
import { clearArray } from "./commons";

const temp = [];
const getDownEvolutions = (digimon) => {
  if(digimon.befores === null) return;
  
  digimon.befores.forEach(before => {
    const target = Evolution.getById(before.from);
    if(temp.includes(target.id)) {
      before['duplicated'] = true;
      target.befores = null;
    } else {
      temp.push(target.id);
    }
    before['digimon'] = target;
    getDownEvolutions(target);
  });
}

const getUpEvolutions = (digimon) => {
  if(digimon.afters === null) return;

  digimon.afters.forEach(after => {
    const target = Evolution.getById(after.to);
    // if(temp.includes(target.id)) {
    //   after['duplicated'] = true;
    //   target.afters = null;
    // } else {
    //   temp.push(target.id);
    // }
    after['digimon'] = target;
    getUpEvolutions(target);
  });
}

const getEvolutions = (digimon) => {
  getDownEvolutions(digimon);
  clearArray(temp);

  getUpEvolutions(digimon);
  clearArray(temp);
};

export default getEvolutions;