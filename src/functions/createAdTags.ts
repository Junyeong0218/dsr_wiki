const createAdScript = () => {
    const scr = document.createElement("script");
    scr.async = true;
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";

    return scr;
}

export {
    createAdScript
}