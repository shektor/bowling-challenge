const Frame = require('./frame');

var Game = function(frameConstructor = Frame) {
  this._frameConstructor = frameConstructor;
  this._frameNumber = 0;
  this._frames = [];
};

Game.prototype._newFrame = function(number) {
  return new this._frameConstructor(number);
};

Game.prototype._addFrame = function(number) {
  this._frames.push(this._newFrame(number));
};

Game.prototype.frames = function(number) {
  return this._frames;
};

Game.prototype.addRoll = function(roll) {
  if (this._frameNumber === 0 || this._currentFrame().isComplete() === true ) {
    this._frameNumber++;
    this._addFrame(this._frameNumber);
  };
  this._currentFrame().pinsHit(roll);
};

Game.prototype._currentFrame = function() {
  if (this._frameNumber === 0) { return undefined }
  return this._frames[this._frameNumber - 1];
};

Game.prototype.isComplete = function() {
  var currentFrame = this._currentFrame();
  if (this._currentFrame().number() === 10 && this._currentFrame().isComplete() === true) {
    return true;
  };
  return false;
};

module.exports = Game;
