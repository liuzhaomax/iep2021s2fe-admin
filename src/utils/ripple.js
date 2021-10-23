/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/14 8:40
 * @version     v1.0
 * @filename    ripple.js
 * @description
 ***************************************************************************/

const ripple = () => {
    const login = document.getElementById("login")
    let mx, my
    let z = 0
    // let wait = false
    document.addEventListener('click', e => {
        // if(!wait){
            mx = e.pageX
            my = e.pageY
            z = z + 1
            loadRipple(mx, my, z)
        //     wait = true
        //     setTimeout(() => wait = false,3000)
        // }
    })

    function loadRipple(x, y, z) {
        let water = document.createElement("div")
        let body = document.createElement("div")
        let r1 = document.createElement("div")
        let r2 = document.createElement("div")
        let r3 = document.createElement("div")
        let r4 = document.createElement("div")
        let r5 = document.createElement("div")
        let r6 = document.createElement("div")
        r1.setAttribute("class", "ripple ripple1")
        r2.setAttribute("class", "ripple ripple2")
        r3.setAttribute("class", "ripple ripple3")
        r4.setAttribute("class", "ripple ripple4")
        r5.setAttribute("class", "ripple ripple5")
        r6.setAttribute("class", "ripple ripple6")
        // let ripples = document.getElementsByClassName("ripple")
        // for (let i = 0; i < ripples.length; i++) {
        //     ripples[i].setAttribute("wid")
        // }
        body.appendChild(r1)
        body.appendChild(r2)
        body.appendChild(r3)
        body.appendChild(r4)
        body.appendChild(r5)
        body.appendChild(r6)
        body.setAttribute("class", "ripple-body")
        water.appendChild(body)
        water.setAttribute("class", "ripple-position water" + z)
        water.style.zIndex = z
        water.style.top = y + "px"
        water.style.left = x + "px"
        login.appendChild(water)

        setTimeout(() => {
            document.getElementsByClassName("water" + z)[0].remove()
        }, 30000)
    }
}

export default ripple