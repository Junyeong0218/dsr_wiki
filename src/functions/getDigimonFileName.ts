const getDigimonFileName = (origin: String) => {
    console.log(origin)
    return origin.includes("[돌연변이]") ? origin.replace("[돌연변이]", "") : 
           origin.includes(":") ? origin.replace(":", " ") : 
           origin;
}

export {
    getDigimonFileName
}