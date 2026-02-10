function decodeList(props) {

    const procBosses = (bosses) => {
        if (bosses.length == 1) {
            return parseInt(bosses);
        } else {
            const toRet = {};
            for (let i = 0; i < bosses.length; i++) {
                let curNum = parseInt(bosses.charAt(i))
                let dark = curNum >= 2;
                let reg = curNum % 2 == 1;
                if (i < 10) {
                    toRet[`reg0${i}`] = reg;
                    toRet[`dark0${i}`] = dark;
                } else {
                    toRet[`reg${i}`] = reg;
                    toRet[`dark${i}`] = dark;
                }
            }
            return toRet;
        }
    }

    const procCharacters = (chars) => {
        if (chars == null) return null;
        const toRet = {};
        for (let i = 0; i < chars.length; i++) {
            if (i < 10) {
                toRet[`char0${i}`] = chars.charAt(i) != '0';
            } else {
                toRet[`char${i}`] = chars.charAt(i) != '0';
            }
        }
        return toRet;
    }

    return {
        ...props,
        targets: procBosses(props.targets),
        char01: procCharacters(props.char01),
        char02: procCharacters(props.char02),
        char03: procCharacters(props.char03),
    }
}
export default decodeList;