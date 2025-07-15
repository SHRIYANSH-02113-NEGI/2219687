const logger = (type, message) => {
  if (window.myLogger) {
    window.myLogger.log(type, message);
  } else {
    console[type](message);
  }
};

export default logger;