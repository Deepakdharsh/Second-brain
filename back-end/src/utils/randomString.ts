export const random=(num:number)=>{
    const str="oierqofdgfabeflkanenfubvohadvbaew"
    let randomString=''
    for(let i=0;i<num;i++){
        randomString+=str[Math.floor(Math.random()*str.length)]
    }
    return randomString
}

