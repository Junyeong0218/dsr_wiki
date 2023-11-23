import data from "../json/data.json";

const getTypeProgression = (type) => {
  if (type === "유년기1") return 1;
  if (type === "유년기2") return 2;
  if (type === "성장기") return 3;
  if (type === "성숙기") return 4;
  if (type === "완전체") return 5;
  if (type === "궁극체") return 6;

  return 0;
};

const getTypeNameByProgression = (progression) => {
  if (progression === 1) return "유년기1";
  if (progression === 2) return "유년기2";
  if (progression === 3) return "성장기";
  if (progression === 4) return "성숙기";
  if (progression === 5) return "완전체";
  if (progression === 6) return "궁극체";

  return 0;
};

const temp = [];
const clearTempArray = () => {
  for (let i = 0; i < temp.length; i++) {
    temp.pop();
  }
};

const getDownEvolutions = (all, standard, selected) => {
  const evolution = new Array();

  for (let i = standard; i > 1; i--) {
    const typeName = getTypeNameByProgression(i - 1);

    all
      .filter((each) => each.type === typeName && each.to === selected.from)
      .forEach((each) => {
        let sub = null;
        sub = getDownEvolutions(all, standard - 1, each);
        if (sub !== undefined && sub !== null) {
          temp.push(...sub);
        }
        each["down"] = sub;
        evolution.push(each);
      });
  }
  return evolution.length > 0 ? evolution : null;
};

const getUpEvolutions = (all, standard, selected) => {
  const typeName = getTypeNameByProgression(standard);
  
  const evolution = new Array();
  const froms = all.filter((each) => each.type === typeName && each.from === selected.from);
  froms.forEach((each) => {
    let to = all.find((e) => e.from === each.to);

    if(to !== undefined && to !== null) {
      to = Object.assign({}, to);
      to.percentage = each.percentage;
      evolution.push(to);
    } else {
      const nextType = getTypeNameByProgression(getTypeProgression(each.type) + 1);

      evolution.push({
        from: each.to,
        type: nextType,
        method: each.method,
        to: "",
        percentage: each.percentage,
        ingredient: each.ingredient,
        level: each.length,
        bonding: 0,
        str: 0,
        int: 0,
        spd: 0,
        res: 0,
        def: 0,
        with: ""
      });
    }
  });
  
  if(evolution.length > 0) {
    selected["up"] = evolution;
    evolution.forEach(each => {
      getUpEvolutions(all, standard + 1, each);
    });
  }
};

const deepCopyAll = () => {
  const all = new Array();
  for (const each of data) {
    all.push(Object.assign({}, each));
  }

  return all;
};

const getEvolutions = (selected) => {
  const standard = getTypeProgression(selected.type);

  const all = deepCopyAll(data);

  selected["down"] = [];
  selected["down"] = getDownEvolutions(all, standard, selected);
  clearTempArray();

  selected["up"] = [];
  getUpEvolutions(all, standard, selected);
  clearTempArray();
};

export default getEvolutions;
