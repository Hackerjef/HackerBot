module.exports = {
  idk: function () {
    var responces = ["is that english?", "what you are doing?", "are you okay?", "Do you know the wae"];
    function randomRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return responces[randomRange(0, responces.length)];
  }
};
