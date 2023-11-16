export function detectScrollCloseToBottom(nativeEvent){
    return nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
};
