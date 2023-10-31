import React, { useState, useEffect } from 'react'
import {ColourContext} from "@context/colour.conetxt";
import { useContext } from "react";
import Sketch from 'react-p5'

const radius = 50
const lineThickness = 0.5
const increment = 0.01
const variance = 10

function CircleBg({ sizes, ...props}) {
    const [p5, setP5] = useState()
    const [circles, setCircles] = useState([])
    const [updating, setUpdating] = useState(false)
    const [yRandom, setYRandom] = useState(Math.random() * variance)
    const [xRandom, setXRandom] = useState(Math.random() * variance)
    const { updateColours, circleColours } = useContext(ColourContext)
    const [colCount, setColCount] = useState(
        Math.round(window?.innerWidth / radius)
    )

    useEffect(() => {
        if (updating) {
            setYRandom(Math.random() * variance)
            setXRandom(Math.random() * variance)
            updateColours()
            setUpdating(false)
        }
    }, [updating])

    useEffect(()=>{
        if(sizes.height) {
            setUpdating(true)
        }
    },[sizes])

    function windowResized() {
        p5?.resizeCanvas(sizes.width , sizes.height)
        setColCount(Math.round(sizes.width  / radius))
        addCircles()
    }

    useEffect(() => {
        if (!circleColours.length && p5) {
            updateColours()
        }
    }, [p5])
    useEffect(addCircles, [circleColours])

    function addCircles() {
        function Circle({ x, y, radius, even }) {
            this.x = x
            this.y = y
            this.r = radius
            this.even = even
            this.theta = x * xRandom + y * yRandom
        }

        Circle.prototype = {
            draw: function () {
                const x = this.r * p5?.cos(this.theta)
                const y = this.r * p5?.sin(this.theta)

                const colour = circleColours[this.even ? 1 : 0]?.rgb
                p5?.fill(colour[0], colour[1], colour[2])

                p5?.ellipse(this.x + x, this.y + y, lineThickness, lineThickness)
                this.theta += increment
            },
        }

        const radius = sizes.width  / colCount
        const rowCount = Math.ceil(sizes.height  / radius)

        setCircles(
            new Array(colCount + 1).fill(1).flatMap((_, column) =>
                new Array(rowCount + 1).fill(1).flatMap(
                    (_, row) =>
                        new Circle({
                            radius,
                            even: column % 2 === 0 && row % 2 === 0,
                            x: column * radius,
                            y: row * radius,
                        })
                )
            )
        )
    }

    const setup = (p5, canvasParentRef) => {
        setP5(p5)
        p5?.createCanvas(sizes.width, sizes.height).parent(
            canvasParentRef
        )
        p5?.noStroke()
    }

    const draw = () => {
        if (circles[0]?.theta > Math.PI * 2) {
            setUpdating(true)
        } else {
            circles.forEach((circle) => circle.draw())
        }
    }

    return (
            <Sketch
                setup={setup}
                draw={draw}
                {...props}
                windowResized={windowResized}
            />
    )
}

export default CircleBg
