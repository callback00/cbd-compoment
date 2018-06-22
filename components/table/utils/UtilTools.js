
import warning from 'warning';

const warned = {};
export function warningOnce(format) {
    if (!warned[format]) {
        warning(false, format);
        warned[format] = true;
    }
}


