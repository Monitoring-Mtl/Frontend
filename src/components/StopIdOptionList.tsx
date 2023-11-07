function StopIdOptionList(){
    const stopIds = [1, 2, 3, 4]
    const stopIdOptionList = stopIds.map(stopId => <option key={stopId} value={stopId}>{stopId}</option>)
    return stopIdOptionList;
}

export default StopIdOptionList