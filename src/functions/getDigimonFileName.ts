const getDigimonFileName = (origin: String) => {
    return origin.includes("??") ? "character_blank" : 
           origin.includes("[돌연변이]") ? origin.replace("[돌연변이]", "") : 
           origin.includes(":") ? origin.replace(":", " ") : 
           origin;
}

export {
    getDigimonFileName
}