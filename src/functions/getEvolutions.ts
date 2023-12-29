import { Evolution } from "../classes";
import { clearArray } from "./commons";

const temp = new Array<number>();
let standard = null;
const getDownEvolutions = (evolution: Evolution, isFold = false): void => {
  if(evolution.befores === null) return;
  
  evolution.befores.forEach(before => {
    const target = Evolution.getById(before.from);
    // if(temp.includes(target.id)) {
    //   before['duplicated'] = true;
    //   target.befores = null;
    // } else {
    //   temp.push(target.id);
    // }
    before.isFold = isFold;
    before.digimon = target;

    if(target) {
      const foldFlag = target.grade < 4 ? true : false;
      getDownEvolutions(target, foldFlag);
    }
    
  });
}

const getUpEvolutions = (evolution: Evolution, isFold = false) => {
  if(evolution.afters === null) return;

  evolution.afters.forEach(after => {
    const target = Evolution.getById(after.to);
    // if(temp.includes(target.id)) {
    //   after['duplicated'] = true;
    //   target.afters = null;
    // } else {
    //   temp.push(target.id);
    // }
    after.isFold = isFold;
    after.digimon = target;

    // const gradeSub = Math.abs(standard.grade - target.grade);
    // const foldFlag = gradeSub > 1 ? true : false;
    if(target) {
      const foldFlag = target.grade > 2 ? true : false;
      getUpEvolutions(target, foldFlag);
    }
  });
}

const getEvolutions = (evolution: Evolution): void => {
  standard = evolution;
  getDownEvolutions(evolution);
  clearArray(temp);

  getUpEvolutions(evolution);
  clearArray(temp);
  standard = null;
};

export default getEvolutions;