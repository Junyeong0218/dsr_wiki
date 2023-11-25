// import getAllDigimons from "./getAllDigimons";

import Digimon from "../classes/Digimon";
import { clearArray } from "./commons";

// const getDownEvolutions = (all, standard, selected) => {
//   const evolution = new Array();

//   for (let i = standard; i > 1; i--) {
//     const typeName = getTypeNameByProgression(i - 1);

//     all
//       .filter((each) => each.type === typeName && each.to === selected.from)
//       .forEach((each) => {
//         let sub = null;
//         sub = getDownEvolutions(all, standard - 1, each);
//         if (sub !== undefined && sub !== null) {
//           temp.push(...sub);
//         }
//         each["down"] = sub;
//         evolution.push(each);
//       });
//   }
//   return evolution.length > 0 ? evolution : null;
// };

// const getUpEvolutions = (all, standard, selected) => {
//   const typeName = getTypeNameByProgression(standard);
  
//   const evolution = new Array();
//   const froms = all.filter((each) => each.type === typeName && each.from === selected.from);
//   froms.forEach((each) => {
//     let to = all.find((e) => e.from === each.to);

//     if(to !== undefined && to !== null) {
//       to = Object.assign({}, to);
//       to.percentage = each.percentage;
//       evolution.push(to);
//     } else {
//       const nextType = getTypeNameByProgression(getTypeProgression(each.type) + 1);

//       evolution.push({
//         from: each.to,
//         type: nextType,
//         method: each.method,
//         to: "",
//         percentage: each.percentage,
//         ingredient: each.ingredient,
//         level: each.length,
//         bonding: 0,
//         str: 0,
//         int: 0,
//         spd: 0,
//         res: 0,
//         def: 0,
//         with: ""
//       });
//     }
//   });
  
//   if(evolution.length > 0) {
//     selected["up"] = evolution;
//     evolution.forEach(each => {
//       getUpEvolutions(all, standard + 1, each);
//     });
//   }
// };

// const getEvolutions = (selected) => {
//   const all = getAllDigimons();

//   selected["down"] = [];
//   selected["down"] = getDownEvolutions(all, selected);
//   clearTempArray();

//   selected["up"] = [];
//   getUpEvolutions(all, selected);
//   clearTempArray();
// };

// export default getEvolutions;


// 진화에 필요한 하위 디지몬들을 담음(중복x)
// 중복이 존재하는 경우 상위 디지몬의 befores[index]에 duplicated = true 넣어버림
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

const getUpEvolutions = (digimon) => {
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
    getUpEvolutions(target);
  });
}

const getEvolutions = (digimon) => {
  getDownRevolutions(digimon);
  clearArray(temp);

  getUpEvolutions(digimon);
  clearArray(temp);
};

export default getEvolutions;