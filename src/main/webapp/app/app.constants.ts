// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;
export const DISABLED_BACK = process.env.DISABLED_BACK;

export const QUIZES_URL = 'content/json/';
export const TEST_DIR = 'test/';
export const TRAINING_DIR = 'training/';
export const MEDIA_URL = 'content/images/';
export const MEDIA_QUIZ_URL = MEDIA_URL + 'quiz/';
export const MEDIA_TRAINING_URL = MEDIA_QUIZ_URL + TRAINING_DIR;
export const MEDIA_TEST_URL = MEDIA_QUIZ_URL + TEST_DIR;
