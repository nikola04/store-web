export const mergeTwoStrings = (firstWord: string|undefined, secWord: string|undefined, unkownMessage: string): string => {
    let info = '';
    if(firstWord) info += firstWord;
    if(firstWord && secWord) info += ', ';
    if(secWord) info += secWord;
    if(info === '') return unkownMessage;
    return info;
}
