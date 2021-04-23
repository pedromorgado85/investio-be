function investorProfileCalculator(ageGroup, education, experience, profession, risk, investment) {
    const ipRandomizer = Math.floor(Math.random() * 3);
    switch (ipRandomizer) {
        case 0:
            return "conservative"
        case 1:
            return "moderate"
        case 2:
            return "dynamic"
        default:
            return "moderate"
    }
}

module.exports = investorProfileCalculator;
