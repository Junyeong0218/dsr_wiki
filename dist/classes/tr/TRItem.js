"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRItem = exports.TRItemStat = void 0;
class TRItemStat {
    constructor(stats) {
        const [life, depth, delay, ap, hp, hpCon, mp, mpCon, money, apPlus, acPlus, dxPlus, maxMpPlus, maPlus, mdPlus, maxWtPlus, daPlus, lkPlus, maxHpPlus, dpPlus, hvPlus, hpRecoveryRate, mpRecoveryRate] = stats;
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
exports.TRItemStat = TRItemStat;
class TRItem {
    constructor(raw) {
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
exports.TRItem = TRItem;
