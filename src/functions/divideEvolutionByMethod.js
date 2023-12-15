const divideEvolutionByMethod = (evolution) => {
    const commonEvolution = Object.assign({}, evolution);
    let jogressEvolution = null;

    commonEvolution.afters = commonEvolution.afters?.filter(after => after.method === "일반");
    if(commonEvolution.afters?.length !== evolution.afters?.length) {
        jogressEvolution = Object.assign({}, evolution);
        jogressEvolution.afters = jogressEvolution.afters.filter(after => after.method === "조그레스");
    }

    return [ commonEvolution, jogressEvolution ];
}

export default divideEvolutionByMethod;