import { useState, useEffect } from "react";

const isInViewport = elem => {
    const rect = elem.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function useOnScreen({ selector, debounce }) {
    const [visible,setVisible] = useState(false);
    const [position, setPosition] = useState({});
    
    useEffect(() => {
        let timer = null;
    
        window.onscroll = () => {
            const target = document.querySelector(selector);
            
            if (!timer && target) {
                
                const isOnScreen = isInViewport(target);
                
                if (visible !== isOnScreen) {
                    timer = setTimeout(() => {
                        setVisible(isOnScreen);
                        setPosition(target.getBoundingClientRect());
                        
                        timer = null;
                    }, debounce);
                }
                
            }
            
        }
        
    }, [visible, JSON.stringify(position)]);
    
    return [visible, position];
}

export default useOnScreen;