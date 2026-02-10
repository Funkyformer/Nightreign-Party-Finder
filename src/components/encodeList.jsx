function encodeList(props, length) {
    const procBosses = (bosses) => {
        let toRet = "";
        for (let i = 0; i < length; i++) {
            let value = 0;
            if (bosses[`reg${i}`]) value += 1;
            if (bosses[`dark${i}`]) value += 2;
            toRet = toRet.concat(value);
        }
        return toRet;
    }

    const procChars = (chars) => {
        console.log(chars);
        if (chars != null) {
            let toRet = "";
            Object.keys(chars).forEach((element) =>
                toRet = toRet.concat(chars[element]? "1" : "0"))
            return toRet;
        } else {
            return null;
        }
    }

    return {
        targets: props.depth? 1 : procBosses(props.targets),
        char01: procChars(props.character1),
        char02: procChars(props.character2),
        char03: null,
        requireDLC: props.dlc,
        username: props.username,
        instructions : props.instructions, 
        description: props.description,
        platform: props.platform
    }
}
export default encodeList;