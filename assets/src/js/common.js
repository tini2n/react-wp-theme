import moment from 'moment';
moment.locale('nb');

import app from './app/index';
import detectTouchSupport from "./modules/detectTouchSupport";

document.addEventListener('DOMContentLoaded', () => {
    detectTouchSupport();
    app;
});

