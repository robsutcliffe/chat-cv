import {createContext, useState} from "react";

const ColourContext = createContext()

const ColourContextProvider = (props) => {
    const [circleColours, setCircleColours] = useState([]);
    const [primeColours, setPrimeColours] = useState([]);
    const [secondaryColours, setSecondaryColours] = useState([]);

    const colours = [
        { rgb : [200, 52, 38], hex: "#c83426" },
        { rgb : [149, 127, 18], hex: "#957f12" },
        { rgb : [18, 105, 136], hex: "#126988" },
        { rgb : [1, 114, 58], hex: "#01723a" },
        { rgb : [104, 67, 124], hex: "#68437c" },
        { rgb : [6, 30, 42], hex: "#061e2a" },
    ]

    const updateColours = () => {
        let lastColor = circleColours ? circleColours[0] : []
        let newColor = lastColor
        while (newColor === lastColor) {
            const randomColor = colours[Math.floor(Math.random() * colours.length)]
            if (!lastColor) lastColor = randomColor
            newColor = randomColor
        }

        const hexs = colours.map(c => c.hex);
        const newIdx = hexs.indexOf(newColor.hex)
        const lastIdx = hexs.indexOf(lastColor.hex)

        const primeColour = colours[Math.min(newIdx, lastIdx)].hex
        const secondaryColour = colours[Math.max(newIdx, lastIdx)].hex

        setPrimeColours(prev => [primeColour, prev[0] || primeColour ])
        setSecondaryColours(prev => [secondaryColour, prev[0] || secondaryColour])

        setCircleColours([newColor, lastColor])
    }

    const value = {
        circleColours,
        primeColours,
        secondaryColours,
        updateColours
    }

    return (
        <ColourContext.Provider value={value}>
            {props.children}
        </ColourContext.Provider>
    );
}

export { ColourContext, ColourContextProvider };