export function detectScrollCloseToBottom(nativeEvent){
    offsetY = nativeEvent.contentOffset.y;
    itemHeight = 150;
    firstVisibleIndex = Math.floor(offsetY / itemHeight);
    if(firstVisibleIndex>10) return true;
    return false;

};
 