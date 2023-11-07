function BusLineOptionList(){
    const busLines = [51, 80, 480, 168]
    const busLineOptionList = busLines.map(busLine => <option key={busLine} value={busLine}>{busLine}</option>)
    return busLineOptionList;
}

export default BusLineOptionList