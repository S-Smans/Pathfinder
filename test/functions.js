const functions = {
  addWall: (toggleWall) => {
    if (toggleWall != "row blocked") {
      toggleWall = "row blocked";
    } else {
      toggleWall = "row";
    }
    return toggleWall;
  },

  emptyObject: (obj) => {
    for (const key in obj) {
      delete obj[key];
    }
    return obj;
  },

  arrayEquals: (arrayOne, arrayTwo) => {
    return (
      Array.isArray(arrayOne) &&
      Array.isArray(arrayTwo) &&
      arrayOne.length === arrayTwo.length &&
      arrayOne.every((val, index) => val === arrayTwo[index])
    );
  }
};

module.exports = functions;
