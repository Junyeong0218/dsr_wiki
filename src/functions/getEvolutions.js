import Evolution from "../classes/Evolution";
import { clearArray } from "./commons";

const temp = [];
let standard = null;
const getDownEvolutions = (digimon, isFold = false) => {
  if(digimon.befores === null) return;
  
  digimon.befores.forEach(before => {
    const target = Evolution.getById(before.from);
    // if(temp.includes(target.id)) {
    //   before['duplicated'] = true;
    //   target.befores = null;
    // } else {
    //   temp.push(target.id);
    // }
    before['isFold'] = isFold;
    before['digimon'] = target;

    const foldFlag = target.grade < 4 ? true : false;
    getDownEvolutions(target, foldFlag);
  });
}

const getUpEvolutions = (digimon, isFold = false) => {
  if(digimon.afters === null) return;

  digimon.afters.forEach(after => {
    const target = Evolution.getById(after.to);
    // if(temp.includes(target.id)) {
    //   after['duplicated'] = true;
    //   target.afters = null;
    // } else {
    //   temp.push(target.id);
    // }
    after['isFold'] = isFold;
    after['digimon'] = target;

    // const gradeSub = Math.abs(standard.grade - target.grade);
    // const foldFlag = gradeSub > 1 ? true : false;
    const foldFlag = target.grade > 2 ? true : false;
    getUpEvolutions(target, foldFlag);
  });
}

const getEvolutions = (digimon) => {
  standard = digimon;
  getDownEvolutions(digimon);
  clearArray(temp);

  getUpEvolutions(digimon);
  clearArray(temp);
  standard = null;
};

export default getEvolutions;