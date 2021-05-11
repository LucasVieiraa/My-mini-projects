function quantoFaltaPara(month, day) {

    const currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    const birthdayDate = new Date(currentYear, month - 1, day)

    currentDate.setHours(0)
    currentDate.setMinutes(0)
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)


    const currentDate_TS = +currentDate
    const birthdayDate_TS = +birthdayDate

    if(birthdayDate_TS < currentDate_TS){ 
        birthdayDate.setFullYear(++currentYear)
        birthdayDate_TS = +birthdayDate
     };

    const oneDay = 24 * 60 * 60 * 1000
    const difference = birthdayDate_TS - currentDate_TS
    return parseInt(difference / oneDay)



};
