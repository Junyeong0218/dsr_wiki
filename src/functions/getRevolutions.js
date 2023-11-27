import Digimon from "../classes/Digimon";
import { clearArray } from "./commons";

const temp = [];
const getDownRevolutions = (digimon) => {
  if(digimon.befores === null) return;
  
  digimon.befores.forEach(before => {
    const target = Digimon.getById(before.from);
    if(temp.includes(target.id)) {
      before['duplicated'] = true;
      target.befores = null;
    } else {
      temp.push(target.id);
    }
    before['digimon'] = target;
    getDownRevolutions(target);
  });
}

const getUpRevolutions = (digimon) => {
  if(digimon.afters === null) return;

  digimon.afters.forEach(after => {
    const target = Digimon.getById(after.to);
    // if(temp.includes(target.id)) {
    //   after['duplicated'] = true;
    //   target.afters = null;
    // } else {
    //   temp.push(target.id);
    // }
    after['digimon'] = target;
    getUpRevolutions(target);
  });
}

const getRevolutions = (digimon) => {
  getDownRevolutions(digimon);
  clearArray(temp);

  getUpRevolutions(digimon);
  clearArray(temp);
};

export default getRevolutions;