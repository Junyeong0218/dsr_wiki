export interface IRawTRItem {
    ID: number,
    Class: number,
    Type: number,
    SubType: number,
    ItemFType: number,

    Name: string,
    Comment: string,
    Use: string|number,
    Name_Eng: string|number,
    Comment_Eng: string|number,

    FileName: string,
    BundleNum: number,
    InvFileName: string,
    InvBundleNum: number,
    CmtFileName: string,
    CmtBundleNum: number,
    EquipFileName: string|number,
    PivotID: number,
    PaletteId: number,

    Options: string|number,
    HideHat: string|number,
    ChrTypeFlags: string|number,
    GroundFlags: number,
    SystemFlags: number,
    OptionsEx: string|number,

    Weight: number,
    Value: number,
    MinLevel: number,

    Effect: number,
    EffectFlags2: number,
    SelRange: number,

    Life: number,
    Depth: number,
    Delay: number,
    AP: number,
    HP: number,
    HPCon: number,
    MP: number,
    MPCon: number,
    Money: number,
    APPlus: number,
    ACPlus: number,
    DXPlus: number,
    MaxMPPlus: number,
    MAPlus: number,
    MDPlus: number,
    MaxWTPlus: number,
    DAPlus: number,
    LKPlus: number,
    MaxHPPlus: number,
    DPPlus: number,
    HVPlus: number,
    HPRecoveryRate: number,
    MPRecoveryRate: number,

    CardNum: number,
    CardGenGrade: number,
    CardGenParam: number,
    DailyGenCnt: number,

    PartFileName: number|string,
    ChrFTypeFlag: number,
    ChrGender: number,
    ExistType: number,
    Ncash: number,
    NewCM: number,
    FamCM: number,
    Summary: number,

    ShopFileName: number|string,
    ShopBundleNum: number,
    MinStatType: number,
    MinStatLv: number,
    RefineIndex: number,
    RefineType: number,
    CompoundSlot: number,
    SetItemID: number,
    ReformCount: number
}

export class TRItemStat {
    life: number;
    depth: number;
    delay: number;
    ap: number;
    hp: number;
    hpCon: number;
    mp: number;
    mpCon: number;
    money: number;
    apPlus: number;
    acPlus: number;
    dxPlus: number;
    maxMpPlus: number;
    maPlus: number;
    mdPlus: number;
    maxWtPlus: number;
    daPlus: number;
    lkPlus: number;
    maxHpPlus: number;
    dpPlus: number;
    hvPlus: number;
    hpRecoveryRate: number;
    mpRecoveryRate: number;

    constructor(stats: Array<number>) {
        const [life, depth, delay, ap, hp, hpCon, mp, mpCon, money, apPlus, acPlus,
            dxPlus, maxMpPlus, maPlus, mdPlus, maxWtPlus, daPlus, lkPlus, maxHpPlus,
            dpPlus, hvPlus, hpRecoveryRate, mpRecoveryRate] = stats;
        this.life = life;
        this.depth = depth;
        this.delay = delay;
        this.ap = ap;
        this.hp = hp;
        this.hpCon = hpCon;
        this.mp = mp;
        this.mpCon = mpCon;
        this.money = money;
        this.apPlus = apPlus;
        this.acPlus = acPlus;
        this.dxPlus = dxPlus;
        this.maxMpPlus = maxMpPlus;
        this.maPlus = maPlus;
        this.mdPlus = mdPlus;
        this.maxWtPlus = maxWtPlus;
        this.daPlus = daPlus;
        this.lkPlus = lkPlus;
        this.maxHpPlus = maxHpPlus;
        this.dpPlus = dpPlus;
        this.hvPlus = hvPlus;
        this.hpRecoveryRate = hpRecoveryRate;
        this.mpRecoveryRate = mpRecoveryRate;
    }
}

export class TRItem {
    id: number;
    class: number;
    type: number;
    subType: number;
    itemFType: number;

    name: string;
    comment: string;
    use: string;
    nameEng: string;
    commentEng: string;

    fileName: string;
    fileIndex: number;
    invFileName: string;
    invFileIndex: number;
    cmtFileName: string;
    cmtFileIndex: number;
    equipFileName: string;

    weight: number;
    value: number;
    minLevel: number;

    stat: TRItemStat;

    cardNum: number;
    cardGenGrade: number;
    cardGenParam: number;

    minStatType: number;
    minStatLv: number;
    refineIndex: number;
    refineType: number;
    compoundSlot: number;
    setItemID: number;
    reformCount: number;

    constructor(raw: IRawTRItem) {
        this.id = raw.ID;
        this.class = raw.Class;
        this.type = raw.Type;
        this.subType = raw.SubType;
        this.itemFType = raw.ItemFType;

        this.name = raw.Name;
        this.comment = raw.Comment;
        this.use = raw.Use === 0 ? "" : String(raw.Use);
        this.nameEng = raw.Name_Eng === 0 ? "" : String(raw.Name_Eng);
        this.commentEng = raw.Comment_Eng === 0 ? "" : String(raw.Comment_Eng);

        this.fileName = raw.FileName;
        this.fileIndex = raw.BundleNum;
        this.invFileName = raw.InvFileName;
        this.invFileIndex = raw.InvBundleNum;
        this.cmtFileName = raw.CmtFileName;
        this.cmtFileIndex = raw.CmtBundleNum;
        this.equipFileName = raw.EquipFileName === 0 ? "" : String(raw.EquipFileName);

        this.weight = raw.Weight;
        this.value = raw.Value;
        this.minLevel = raw.MinLevel;

        this.stat = new TRItemStat([raw.Life, raw.Depth, raw.Delay, raw.AP, raw.HP, 
            raw.HPCon, raw.MP, raw.MPCon, raw.Money, raw.APPlus, raw.ACPlus, raw.DXPlus, 
            raw.MaxMPPlus, raw.MAPlus, raw.MDPlus, raw.MaxWTPlus, raw.DAPlus, raw.LKPlus, 
            raw.MaxHPPlus, raw.DPPlus, raw.HVPlus, raw.HPRecoveryRate, raw.MPRecoveryRate]);

        this.cardNum = raw.CardNum;
        this.cardGenGrade = raw.CardGenGrade;
        this.cardGenParam = raw.CardGenParam;
    
        this.minStatType = raw.MinStatType;
        this.minStatLv = raw.MinStatLv;
        this.refineIndex = raw.RefineIndex;
        this.refineType = raw.RefineType;
        this.compoundSlot = raw.CompoundSlot;
        this.setItemID = raw.SetItemID;
        this.reformCount = raw.ReformCount;
    }
}