export function debounce(func, delay) {
    let timer = null;
    return function(...agr) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, agr);
        }, delay)
    }
}