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
const react_router_dom_1 = require("react-router-dom");
const commons_1 = require("../../functions/commons");
function Guides() {
    const [list, setList] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const loadList = () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/.netlify/functions/getGuides');
        const result = yield response.json();
        setList(result.sort((a, b) => b.id - a.id));
    });
    (0, react_1.useEffect)(() => {
        loadList();
    }, []);
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("table", { className: "guides" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "\uBC88\uD638"),
                    react_1.default.createElement("td", null, "\uC81C\uBAA9"))),
            react_1.default.createElement("tbody", null, list.map(shortcut => (react_1.default.createElement("tr", { onClick: () => navigate(`/guides/${shortcut.id}`), key: (0, commons_1.getUUID)() },
                react_1.default.createElement("td", null, shortcut.id),
                react_1.default.createElement("td", null, shortcut.title))))))));
}
exports.default = Guides;
