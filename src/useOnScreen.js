import { useState, useEffect } from "react";

const isInViewport = (elem, container) => {
    const { top, left, bottom, right } = elem.getBoundingClientRect();
    
    if (container) {
        const containerRect = container.getBoundingClientRect();

        return (
            top <= containerRect.top ? (
                (containerRect.top - top) <= height 
            ) : (
                (bottom - containerRect.bottom) <= height
            )
        );
    } 
    else if (!container) {
        return (
            top >= 0 &&
            left >= 0 &&
            bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

function useOnScreen({ target, parent, delay }) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({});
    
    useEffect(() => {
        let timer = null;
    
        window.onscroll = () => {
            const targetElem = document.querySelector(target);
            const parentElem = document.querySelector(parent);
            
            if (!timer && targetElem) {
                const isOnScreen = isInViewport(targetElem, parentElem);
                
                if (visible !== isOnScreen) {
                    timer = setTimeout(() => {
                        setVisible(isOnScreen);
                        setPosition(targetElem.getBoundingClientRect());
                        
                        timer = null;
                    }, delay);
                }
                
            }
        }
        
    }, [visible]);
    
    return [visible, position];
}

useOnScreen.defaultProps = {
    target: "",
    parent: "",
    delay: 1000
}

export default useOnScreen;