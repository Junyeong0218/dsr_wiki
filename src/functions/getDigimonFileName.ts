const getDigimonFileName = (origin: string) => {
    const name = origin.includes("??") ? "character_blank" : 
                 origin.includes("[돌연변이]") ? origin.replace("[돌연변이]", "") : 
                 origin.includes(":") ? origin.replace(":", " ") : 
                 origin;
    
    return encodeURIComponent(name);
}

export {
    getDigimonFileName
}