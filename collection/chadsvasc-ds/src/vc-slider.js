class VcSlider extends HTMLElement {
    static get observedAttributes() { return ['score']; }

    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'vc-wrapper');

        const leftOption = document.createElement('span');
        leftOption.setAttribute('class', 'vc-leftOption');
        leftOption.textContent = this.getAttribute('leftoption') || 'Stop Strokes';

        const slider = document.createElement('input');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', '1');
        slider.setAttribute('max', '100');

        const rightOption = document.createElement('span');
        rightOption.setAttribute('class', 'vc-rightOption');
        rightOption.textContent = this.getAttribute('rightoption') || 'Stop Bleeding';

        const outputArrow = document.createElement('div');
        outputArrow.setAttribute('class', 'vc-outputArrow');
        outputArrow.textContent = '🠗';

        const gradient = document.createElement('div');
        gradient.setAttribute('class', 'vc-gradient');

        const leftResult = document.createElement('span')
        leftResult.setAttribute('class', 'vc-leftResult');
        leftResult.textContent = this.getAttribute('leftresult') || 'Greater Bleeding Risk';

        const rightResult = document.createElement('span');
        rightResult.setAttribute('class', 'vc-rightResult');
        rightResult.textContent = this.getAttribute('rightresult') || 'Greater Stroke Risk';

        const belowLowerBound = document.createElement('span');
        belowLowerBound.setAttribute('class','recommend-none');
        belowLowerBound.textContent = this.getAttribute('belowlowerbound') || 'The patient\'s risk does not indicate a need for anti-coagulant.';

        const aboveUpperBound = document.createElement('span');
        aboveUpperBound.setAttribute('class', 'recommend-always');
        aboveUpperBound.textContent = this.getAttribute('aboveupperbound') || 'The patient\'s risk indicates a need for anti-coagulant.';

        const style = document.createElement('style');
        let leftColor = this.getAttribute('leftcolor') || 'blue';
        let rightColor = this.getAttribute('rightcolor') ||'red';

        style.textContent = `
        .vc-wrapper {
            text-align:center;
            font-size: 12pt;
            position: relative;
            border: 2px solid grey;
            padding: 10px;
            width: 500px;
        }
        
        .vc-gradient {
            margin-top: 0;
            width: 500px;
            height: 25px;
            background: linear-gradient(90deg, ${ leftColor }, ${ rightColor });
            font: 12pt sans-serif; color: #ffffff;
        }
        
        .vc-outputArrow {
            margin:1em 0 0 0;
            position: relative;
            left: 43px;
            font-size: 20pt;
            width: 1ex;
        }
        
        .vc-leftResult {
            float: left;
            margin: 0.2em;
        }
        
        .vc-rightResult {
            float: right;
            margin: 0.2em;
        }
        
        .recommend-none {
            border: 2px solid grey;
            padding: 10px;
            width: 500px;
            display: none;
        }
        
        .recommend-always {
            border: 2px solid grey;
            padding: 10px;
            width: 500px;
            display: none;
        }
        `;

        slider.addEventListener("change",
            () => {
                let risk = getRiskFunction()(slider.value, score);
                outputArrow.style.left = 2*risk - 7 + 'px';
            });

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(leftOption);
        wrapper.appendChild(slider);
        wrapper.appendChild(rightOption);
        wrapper.appendChild(outputArrow);
        wrapper.appendChild(gradient);
        gradient.appendChild(leftResult);
        gradient.appendChild(rightResult)
        shadow.appendChild(belowLowerBound);
        shadow.appendChild(aboveUpperBound);
    }

    score = this.getAttribute('score');

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'score') {
            let vcElem = this.shadowRoot.querySelector(".vc-wrapper");
            let recNone = this.shadowRoot.querySelector(".recommend-none");
            let recAll = this.shadowRoot.querySelector(".recommend-always");
            if (needsAc(newValue) === "NO") {
                vcElem.style.display = "none";
                recNone.style.display = "block";
                recAll.style.display = "none";
            } else if (needsAc(newValue) === "YES") {
                vcElem.style.display = "none";
                recNone.style.display = "none";
                recAll.style.display = "block";
            } else {
                vcElem.style.display = "block";
                recNone.style.display = "none";
                recAll.style.display = "none";
            }
            score = newValue;
        }
    }

}
customElements.define('vc-slider', VcSlider);
