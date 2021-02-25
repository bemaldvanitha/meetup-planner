export function isEmpty(val){
    return val.trim().length === 0;
}

export function isLongerThan(val,number){
    return val.trim().length > number;
}

export function isEmailValid(val){
    return val.includes('@') && val.includes('.com');
}

export function isImageUrl(val){
    return (val.includes('.jpg') || val.includes('.jpeg') || val.includes('.png'))
        && (val.includes('http') || val.includes('https'))
}