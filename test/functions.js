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
};

module.exports = functions;
