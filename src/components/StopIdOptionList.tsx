function StopIdOptionList(){
    const stopIds = [1, 2, 3, 4]
    const busLineOptionList = stopIds.map(stopId => <option value={stopId}>{stopId}</option>)
    return busLineOptionList;
}

export default StopIdOptionList