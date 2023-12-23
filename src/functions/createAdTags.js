const createAdTag = (id) => {
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style = "display: none; width: 100%;";
    ins.setAttribute("data-ad-width", "160");
    ins.setAttribute("data-ad-height", "600");
    ins.setAttribute("data-ad-unit", id);

    return ins;
}

const createAdScript = () => {
    const scr = document.createElement("script");
    scr.async = "true";
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";

    return scr;
}

export {
    createAdTag,
    createAdScript
}