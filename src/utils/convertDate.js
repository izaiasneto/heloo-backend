function convertDate(d){
    //
    const [year, month, day] = d.split('-').map(Number);

    const date = [year, month, day]

    date.join('-')

    return date
}

module.exports = convertDate