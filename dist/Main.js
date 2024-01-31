"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const functions_1 = require("./functions");
const commons_1 = require("./functions/commons");
const react_router_dom_1 = require("react-router-dom");
const DSR_ROOT = "https://www.digimonsuperrumble.com/";
const generateChecklist = () => {
    return {
        created: new Date(),
        lastModified: new Date(),
        list: [
            { title: "오버플로우 입장권 받기", titleEng: "Get OFD Tickets", checked: false },
            { title: "일일 퀘스트 클리어", titleEng: "Daily Quest", checked: false },
            { title: "오늘의 오버플로우 던전 클리어", titleEng: "Daily OFD", checked: false },
            { title: "디지패스 일일 미션 클리어", titleEng: "Daily Digipass Missions", checked: false },
            { title: "일일 이벤트 미션 클리어", titleEng: "Daily Event Missions", checked: false },
            { title: "유년기 먹이주기 & 놀아주기", titleEng: "Feed Baby Digimons", checked: false },
        ]
    };
};
const getPrevChecklist = () => {
    if (!localStorage.getItem("checklist"))
        return generateChecklist();
    const checklist = JSON.parse(localStorage.getItem("checklist"));
    const started = new Date(checklist.created).getDate();
    const now = new Date().getDate();
    if (started !== now)
        return generateChecklist();
    return checklist;
};
function Main() {
    let prevChecklist = getPrevChecklist();
    let prevNotices = localStorage.getItem("notices") ? JSON.parse(localStorage.getItem("notices")) : [];
    let prevCoupons = localStorage.getItem("coupons") ? JSON.parse(localStorage.getItem("coupons")) : [];
    const [checklist, setChecklist] = (0, react_1.useState)(prevChecklist);
    const [notices, setNotices] = (0, react_1.useState)(prevNotices);
    const [coupons, setCoupons] = (0, react_1.useState)(prevCoupons);
    (0, react_1.useEffect)(() => {
        const url = "https://script.google.com/macros/s/AKfycbzW0bOmuKVwka0LeClnrw68dNV4hi77bnbrZbeEOZjadwj1e-TnRiFBgC49z57F_PJkqw/exec";
        fetch(`${url}?sheetName=notices`).then((response) => __awaiter(this, void 0, void 0, function* () {
            const result = yield response.json();
            if (result.ok) {
                const notices = result.data;
                setNotices(notices.filter((e, i) => i < 5));
                localStorage.setItem("notices", JSON.stringify(notices.filter((e, i) => i < 5)));
            }
        })).catch(error => {
            console.log(error);
        });
        fetch(`${url}?sheetName=coupons`).then((response) => __awaiter(this, void 0, void 0, function* () {
            const result = yield response.json();
            if (result.ok) {
                const coupons = result.data;
                setCoupons(coupons.filter(e => e.active));
                localStorage.setItem("coupons", JSON.stringify(coupons));
            }
        })).catch(error => {
            console.log(error);
        });
    }, []);
    const getWeekdayText = (weekday) => {
        switch (weekday) {
            case 0: return "일";
            case 1: return "월";
            case 2: return "화";
            case 3: return "수";
            case 4: return "목";
            case 5: return "금";
            case 6: return "토";
            default: return "";
        }
    };
    const getCouponDateText = (coupon) => {
        let text = "";
        const startDate = new Date(coupon.startDate);
        const tz = startDate.getTimezoneOffset();
        // if(tz === 0) {
        text += `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}(${getWeekdayText(startDate.getDay())})-`;
        // } else {
        //     const fixedStartDate = new Date(startDate.getTime() + tz * 60 * 1000 * (-1));
        //     text += `${fixedStartDate.getFullYear()}.${fixedStartDate.getMonth() + 1}.${fixedStartDate.getDate()}(${getWeekdayText(fixedStartDate.getDay())})-`;
        // }
        const expDate = new Date(coupon.expDate);
        const expTz = expDate.getTimezoneOffset();
        // if(tz === 0) {
        text += `${expDate.getFullYear()}.${expDate.getMonth() + 1}.${expDate.getDate()}(${getWeekdayText(expDate.getDay())}) ${expDate.getHours()}:${expDate.getMinutes()}`;
        // } else {
        //     const fixedExpDate = new Date(expDate.getTime() + expTz * 60 * 1000 * (-1));
        //     text += `${fixedExpDate.getFullYear()}.${fixedExpDate.getMonth() + 1}.${fixedExpDate.getDate()}(${getWeekdayText(fixedExpDate.getDay())}) ${fixedExpDate.getHours()}:${fixedExpDate.getMinutes()}`;
        // }
        return text;
    };
    const toggleCheckbox = (event, dailyCheck) => {
        const target = event.target;
        const element = checklist.list.find(e => e.title === dailyCheck.title);
        element.checked = target.checked;
        checklist.lastModified = new Date();
        localStorage.setItem("checklist", JSON.stringify(checklist));
        setChecklist(Object.assign({}, checklist));
    };
    const copyCoupon = (coupon) => {
        navigator.clipboard.writeText(coupon.code).then(() => alert("복사 완료"));
    };
    const today = new Date().getDay();
    const activeOverflows = (0, functions_1.getAllOverflows)().filter(of => of.weekdays.includes(today));
    const text = activeOverflows.map(of => `${of.mapName} - ${of.reqItem.name}`);
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "dashboard" },
            react_1.default.createElement("aside", { className: "dashboard-left" },
                react_1.default.createElement("div", { className: "content-shortcut" },
                    react_1.default.createElement("div", { className: "title" }, "\uC624\uB298\uC758 \uC624\uBC84\uD50C\uB85C\uC6B0 \uB358\uC804"),
                    react_1.default.createElement("div", { className: "content" }, activeOverflows.map(overflow => (react_1.default.createElement("div", { className: "row", key: (0, commons_1.getUUID)() }, overflow.mapName))))),
                react_1.default.createElement("div", { className: "content-shortcut" },
                    react_1.default.createElement("div", { className: "title" }, "\uC624\uB298\uC758 \uB798\uB354"),
                    react_1.default.createElement("div", { className: "content" },
                        react_1.default.createElement("div", { className: "row" },
                            react_1.default.createElement("img", { src: "/images/daily_Ultimate.png" }))))),
            react_1.default.createElement("div", { className: "content-shortcut dashboard-center" },
                react_1.default.createElement("div", { className: "title" }, "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8"),
                react_1.default.createElement("div", { className: "content" }, checklist.list.map(element => (react_1.default.createElement("label", { htmlFor: element.titleEng, key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("input", { type: "checkbox", id: element.titleEng, checked: element.checked, onChange: (event) => toggleCheckbox(event, element) }),
                    react_1.default.createElement("span", null, element.title)))))),
            react_1.default.createElement("aside", { className: "dashboard-right" },
                react_1.default.createElement("div", { className: "content-shortcut" },
                    react_1.default.createElement("div", { className: "title" }, "\uB514\uC288\uB7FC \uC5C5\uB370\uC774\uD2B8 \uACF5\uC9C0"),
                    react_1.default.createElement("div", { className: "content" }, notices.map(notice => {
                        const date = new Date(notice.date).getTime();
                        const now = new Date().getTime();
                        return react_1.default.createElement(react_router_dom_1.Link, { className: "row long", to: `${DSR_ROOT}${notice.href}`, key: (0, commons_1.getUUID)(), title: notice.title },
                            react_1.default.createElement("span", null, notice.title),
                            now - date < 60 * 60 * 24 * 5 * 1000 && react_1.default.createElement("i", { className: 'new' },
                                react_1.default.createElement("img", { src: "/images/new_tag.png", alt: "" })));
                    }))),
                react_1.default.createElement("div", { className: "content-shortcut" },
                    react_1.default.createElement("div", { className: "title" }, "\uC801\uC6A9 \uAC00\uB2A5\uD55C \uCFE0\uD3F0"),
                    react_1.default.createElement("div", { className: "content" },
                        coupons.length === 0 && react_1.default.createElement("div", { className: "coupon" },
                            react_1.default.createElement("strong", null, "\uCFE0\uD3F0\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.")),
                        coupons.map((coupon, index) => (react_1.default.createElement("div", { className: "coupon", key: (0, commons_1.getUUID)() },
                            react_1.default.createElement("strong", null, coupon.name),
                            react_1.default.createElement("small", null, getCouponDateText(coupon)),
                            react_1.default.createElement("button", { type: 'button', className: 'copy-coupon', title: '\uB204\uB974\uBA74 \uBCF5\uC0AC\uB3FC\uC694!', onClick: () => copyCoupon(coupon) }, coupon.code),
                            index < coupons.length - 1 && react_1.default.createElement("hr", null))))))))));
}
exports.default = Main;
