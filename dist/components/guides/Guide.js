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
function Guide() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    if (isNaN(Number(id))) {
        alert("게시글이 없습니다.\n다시 시도해 주세요.");
        navigate("/guides");
    }
    const [guide, setGuide] = (0, react_1.useState)();
    const loadGuide = () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/.netlify/functions/getGuide?id=${id}`);
        const result = yield response.json();
        setGuide(result);
    });
    (0, react_1.useEffect)(() => {
        loadGuide();
    }, []);
    return (react_1.default.createElement("div", { className: "main" }, guide &&
        react_1.default.createElement("div", { className: "guide-container" },
            react_1.default.createElement("div", { className: "guide-title-container" },
                react_1.default.createElement("span", null, guide.title),
                react_1.default.createElement("div", { className: "buttons" },
                    react_1.default.createElement("button", { type: "button", onClick: () => navigate("/guides") }, "\uBAA9\uB85D\uC73C\uB85C"))),
            react_1.default.createElement("div", { className: "guide-description", dangerouslySetInnerHTML: { __html: guide.description } }))));
}
exports.default = Guide;
