(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"interactive_atlas_1", frames: [[0,0,1072,110],[0,112,1034,110],[1036,112,997,110],[1074,0,960,110],[0,224,923,110],[925,224,885,110],[0,336,848,110],[850,336,811,110],[0,448,774,111],[0,561,738,111],[740,571,704,111],[0,674,670,111],[672,684,637,111],[1446,571,602,111],[1474,448,568,111],[0,878,668,17],[762,797,804,38],[1316,877,438,30],[762,837,648,26],[0,797,760,79],[1663,336,320,79],[1568,756,296,57],[776,448,696,121],[1311,684,639,70],[1568,815,275,60],[762,865,275,60],[1039,865,275,60]]},
		{name:"interactive_atlas_2", frames: [[0,722,1450,263],[0,987,1450,263],[0,1252,1450,263],[0,1626,1183,111],[0,1739,1146,111],[0,1852,1109,111],[0,1517,1430,107],[0,0,1280,720]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_90 = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(img.CachedBmp_61);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2334,891);


(lib.CachedBmp_60 = function() {
	this.initialize(img.CachedBmp_60);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2334,658);


(lib.CachedBmp_59 = function() {
	this.initialize(img.CachedBmp_59);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_58 = function() {
	this.initialize(img.CachedBmp_58);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_57 = function() {
	this.initialize(img.CachedBmp_57);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_56 = function() {
	this.initialize(img.CachedBmp_56);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_55 = function() {
	this.initialize(img.CachedBmp_55);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_54 = function() {
	this.initialize(img.CachedBmp_54);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_53 = function() {
	this.initialize(img.CachedBmp_53);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_52 = function() {
	this.initialize(img.CachedBmp_52);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_51 = function() {
	this.initialize(img.CachedBmp_51);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_50 = function() {
	this.initialize(img.CachedBmp_50);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_49 = function() {
	this.initialize(img.CachedBmp_49);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_48 = function() {
	this.initialize(img.CachedBmp_48);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_47 = function() {
	this.initialize(img.CachedBmp_47);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_46 = function() {
	this.initialize(img.CachedBmp_46);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_45 = function() {
	this.initialize(img.CachedBmp_45);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_44 = function() {
	this.initialize(img.CachedBmp_44);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_43 = function() {
	this.initialize(img.CachedBmp_43);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_42 = function() {
	this.initialize(img.CachedBmp_42);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_41 = function() {
	this.initialize(img.CachedBmp_41);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_40 = function() {
	this.initialize(img.CachedBmp_40);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_39 = function() {
	this.initialize(img.CachedBmp_39);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_38 = function() {
	this.initialize(img.CachedBmp_38);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_37 = function() {
	this.initialize(img.CachedBmp_37);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_36 = function() {
	this.initialize(img.CachedBmp_36);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_35 = function() {
	this.initialize(img.CachedBmp_35);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_34 = function() {
	this.initialize(img.CachedBmp_34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_33 = function() {
	this.initialize(img.CachedBmp_33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_32 = function() {
	this.initialize(img.CachedBmp_32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_31 = function() {
	this.initialize(img.CachedBmp_31);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_30 = function() {
	this.initialize(img.CachedBmp_30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_29 = function() {
	this.initialize(img.CachedBmp_29);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_28 = function() {
	this.initialize(img.CachedBmp_28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_27 = function() {
	this.initialize(img.CachedBmp_27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_26 = function() {
	this.initialize(img.CachedBmp_26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_25 = function() {
	this.initialize(img.CachedBmp_25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_24 = function() {
	this.initialize(img.CachedBmp_24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_23 = function() {
	this.initialize(img.CachedBmp_23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_22 = function() {
	this.initialize(img.CachedBmp_22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_21 = function() {
	this.initialize(img.CachedBmp_21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_20 = function() {
	this.initialize(img.CachedBmp_20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_19 = function() {
	this.initialize(img.CachedBmp_19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_18 = function() {
	this.initialize(img.CachedBmp_18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_17 = function() {
	this.initialize(img.CachedBmp_17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_16 = function() {
	this.initialize(img.CachedBmp_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_15 = function() {
	this.initialize(img.CachedBmp_15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_14 = function() {
	this.initialize(img.CachedBmp_14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_13 = function() {
	this.initialize(img.CachedBmp_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_12 = function() {
	this.initialize(img.CachedBmp_12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_11 = function() {
	this.initialize(img.CachedBmp_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_10 = function() {
	this.initialize(img.CachedBmp_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_9 = function() {
	this.initialize(img.CachedBmp_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2516,270);


(lib.BMP_37950a7f_d357_42af_b9fa_25ef3191b743 = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.BMP_3b832d90_b1ff_44c6_acd1_782989bcd00b = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.Chrome = function() {
	this.initialize(ss["interactive_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.HoverButton = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.PressedButton = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.RestButton = function() {
	this.initialize(ss["interactive_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.WarpedAsset_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.BMP_3b832d90_b1ff_44c6_acd1_782989bcd00b();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,639,70);


(lib.Tween3_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Tween3_mc, null, null);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(-362.5,-65.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-362.5,-65.8,725,131.5);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(-362.5,-65.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-362.5,-65.8,725,131.5);


(lib.StartBtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		playSound("hover");
	}
	this.frame_2 = function() {
		playSound("press");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(2));

	// Label
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AtvBzIgQgDIgQgDQgGgDgFgDIAAgfQAFAFAHAEIAQAGIARAEIAPABQAZAAAMgIQALgKAAgRQAAgJgDgHQgFgGgHgGQgHgFgKgFIgUgLIgWgLQgKgGgHgHQgIgIgFgJQgEgJAAgNQAAgQAHgKQAHgMALgIQAKgGAOgEQAOgEAPAAQAhAAAPAIIAAAdQgTgNggAAQgIAAgJACQgIABgHAEQgHAFgEAGQgEAHgBAIQABAJADAHQADAGAGAFQAGAFAJAFIAVAKIAXAMQALAHAIAHQAIAJAFAJQAEAKAAANQABAQgHAMQgGALgLAHQgLAHgOADQgPAEgQAAIgNgBgANABwIAAjHIhAAAIAAgYICbAAIAAAYIhBAAIAADHgAHnBwIgmg/IgKgOQgEgHgGgEQgFgDgGgCQgFgCgIAAIgWAAIAABfIgaAAIAAjfIBEAAQAOAAANAEQAMAEAJAHQAJAHAFALQAGAMgBAPQABAMgEAJQgDAKgHAHQgGAIgKAFQgJAFgLADIAAABQAFACAFADIAIAIIAHAKIAIANIAqBDgAF/gGIAkAAQAKAAAIgDQAJgDAGgFQAGgGAEgIQADgIAAgKQAAgSgLgKQgMgKgXAAIgkAAgAAuBwIgYg/IhfAAIgWA/IgdAAIBWjfIAbAAIBWDfgAgdhFIgjBfIBNAAIgihfQgCgEgBgLIgBAAIgEAPgAnCBwIAAjHIhBAAIAAgYICcAAIAAAYIhBAAIAADHg");
	this.shape.setTransform(138.15,30.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Skins
	this.instance = new lib.RestButton();

	this.instance_1 = new lib.HoverButton();

	this.instance_2 = new lib.PressedButton();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,275,60);


(lib.Scene_1_Sun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Sun
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","#333333","#333333","#333333","#FFFFFF","#FFFFFF","#FFCC66"],[0,0,0,0,0,0,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape.setTransform(975.45,170);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFFFF","#333333","#333333","#333333","#FFFFFF","#FFFFFF","#FFCC66"],[0,0,0,0,0,0,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGJkWEWQkXEXmJAAQmIAAkXkXg");
	this.shape_1.setTransform(975.4,170);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#FFFFFF","#333333","#333333","#333333","#FFFFFF","#FFFFFF","#FFCC66"],[0,0,0,0,0,0,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_2.setTransform(975.3,170.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#FFFFFF","#333333","#333333","#333333","#FFFFFF","#FFFFFF","#FFCC66"],[0,0,0,0,0,0,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGKAAEWEWQEWEXAAGIQAAGKkWEVQkWEXmKAAQmJAAkWkXg");
	this.shape_3.setTransform(975.1,170.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#FFFFFF","#333333","#333333","#333333","#FFFFFF","#FFFFFF","#FFCC66"],[0,0,0,0,0,0,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGKkXEWQkWEWmJAAQmJAAkWkWg");
	this.shape_4.setTransform(974.55,170.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#FFFFFE","#333333","#333333","#333333","#FFFFFE","#FFFFFF","#FFCC66"],[0,0,0,0,0,0.004,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_5.setTransform(974.15,170.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.rf(["#FFFFFE","#343434","#343434","#333333","#FFFFFE","#FFFFFF","#FFCC66"],[0,0,0,0,0,0.004,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmJAAkWkXg");
	this.shape_6.setTransform(973.65,171);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.rf(["#FFFEFE","#343434","#343434","#333333","#FFFEFE","#FFFFFE","#FFCC66"],[0,0,0,0,0,0.004,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEWQkVEXmKAAQmJAAkWkXg");
	this.shape_7.setTransform(973.1,171.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.rf(["#FFFEFE","#343434","#343434","#333333","#FFFEFE","#FFFFFE","#FFCC66"],[0,0,0,0,0,0.004,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmIAAkXkWg");
	this.shape_8.setTransform(972.45,171.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.rf(["#FFFEFE","#343434","#343434","#333333","#FFFEFE","#FFFEFE","#FFCC66"],[0,0,0,0,0,0.004,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGKAAEVEWQEXEWAAGJQAAGKkXEVQkVEXmKAAQmJAAkWkXg");
	this.shape_9.setTransform(971.75,172.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.rf(["#FFFEFD","#343434","#343434","#333333","#FFFEFD","#FFFEFE","#FFCC66"],[0,0,0,0,0,0.008,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_10.setTransform(971,172.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.rf(["#FFFEFD","#353535","#353535","#333333","#FFFEFD","#FFFEFE","#FFCC66"],[0,0,0,0,0,0.008,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGKkWEVQkWEXmKAAQmJAAkWkXg");
	this.shape_11.setTransform(970.15,173);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.rf(["#FFFEFD","#353535","#353535","#333333","#FFFEFD","#FFFEFD","#FFCB66"],[0,0,0,0,0,0.008,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGJkWEWQkWEXmKAAQmJAAkWkXg");
	this.shape_12.setTransform(969.25,173.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.rf(["#FFFDFC","#353535","#353535","#333333","#FFFDFC","#FFFEFD","#FFCB66"],[0,0,0,0,0,0.012,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGKkXEWQkWEWmJAAQmJAAkWkWg");
	this.shape_13.setTransform(968.25,174.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.rf(["#FFFDFC","#363636","#363636","#333333","#FFFDFC","#FFFEFD","#FFCB66"],[0,0,0,0,0,0.012,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_14.setTransform(967.15,174.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.rf(["#FFFDFB","#363636","#363636","#333333","#FFFDFB","#FFFDFD","#FFCB66"],[0,0,0,0,0,0.016,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGJkXEWQkWEXmJAAQmIAAkXkXg");
	this.shape_15.setTransform(966.05,175.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.rf(["#FFFDFB","#363636","#363636","#333333","#FFFDFB","#FFFDFC","#FFCB66"],[0,0,0,0,0,0.016,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_16.setTransform(964.8,176.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.rf(["#FFFCFA","#373737","#373737","#333333","#FFFCFA","#FFFDFC","#FFCB66"],[0,0,0,0,0,0.02,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGKkXEWQkVEWmKAAQmIAAkXkWg");
	this.shape_17.setTransform(963.55,176.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.rf(["#FFFCFA","#373737","#373737","#333333","#FFFCFA","#FFFDFC","#FFCB66"],[0,0,0,0,0,0.02,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape_18.setTransform(962.15,177.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.rf(["#FFFCF9","#383838","#383838","#333333","#FFFCF9","#FFFDFB","#FFCB66"],[0,0,0,0,0,0.024,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmIAAkXkWg");
	this.shape_19.setTransform(960.75,178.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.rf(["#FFFBF9","#383838","#383838","#333333","#FFFBF9","#FFFCFB","#FFCB66"],[0,0,0,0,0,0.024,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_20.setTransform(959.2,179.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.rf(["#FFFBF8","#393939","#393939","#333333","#FFFBF8","#FFFCFA","#FFCA66"],[0,0,0,0,0,0.027,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape_21.setTransform(957.65,180.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.rf(["#FFFAF7","#393939","#393939","#333333","#FFFAF7","#FFFCFA","#FFCA65"],[0,0,0,0,0,0.031,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmJAAkWkWg");
	this.shape_22.setTransform(956,181.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.rf(["#FFFAF7","#3A3A3A","#3A3A3A","#333333","#FFFAF7","#FFFCF9","#FFCA65"],[0,0,0,0,0,0.031,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmIAAkXkWg");
	this.shape_23.setTransform(954.25,182.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.rf(["#FFFAF6","#3A3A3A","#3A3A3A","#333333","#FFFAF6","#FFFBF9","#FFCA65"],[0,0,0,0,0,0.035,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEWQkXEWmJAAQmIAAkXkWg");
	this.shape_24.setTransform(952.45,183.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.rf(["#FFF9F5","#3B3B3B","#3B3B3B","#333333","#FFF9F5","#FFFBF9","#FFCA65"],[0,0,0,0,0,0.039,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_25.setTransform(950.55,184.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.rf(["#FFF9F4","#3B3B3B","#3B3B3B","#333333","#FFF9F4","#FFFBF8","#FFCA65"],[0,0,0,0,0,0.043,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGJkXEWQkVEXmKAAQmIAAkXkXg");
	this.shape_26.setTransform(948.6,185.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.rf(["#FFF8F4","#3C3C3C","#3C3C3C","#333333","#FFF8F4","#FFFAF7","#FFCA65"],[0,0,0,0,0,0.043,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_27.setTransform(946.6,186.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.rf(["#FFF8F3","#3D3D3D","#3D3D3D","#333333","#FFF8F3","#FFFAF7","#FFC965"],[0,0,0,0,0,0.047,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGKkWEWQkWEWmKAAQmJAAkWkWg");
	this.shape_28.setTransform(944.5,187.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.rf(["#FFF7F2","#3D3D3D","#3D3D3D","#333333","#FFF7F2","#FFFAF6","#FFC965"],[0,0,0,0,0,0.051,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGJkXEWQkVEXmKAAQmIAAkXkXg");
	this.shape_29.setTransform(942.3,188.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.rf(["#FFF7F1","#3E3E3E","#3E3E3E","#333333","#FFF7F1","#FFF9F6","#FFC965"],[0,0,0,0,0,0.055,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGJAAEXEWQEWEWAAGJQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_30.setTransform(940.1,190.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.rf(["#FFF6F0","#3F3F3F","#3F3F3F","#333333","#FFF6F0","#FFF9F5","#FFC965"],[0,0,0,0,0,0.059,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGKkWEVQkWEXmKAAQmJAAkWkXg");
	this.shape_31.setTransform(937.75,191.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.rf(["#FFF6EF","#404040","#404040","#333333","#FFF6EF","#FFF8F5","#FFC965"],[0,0,0,0,0,0.063,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_32.setTransform(935.35,192.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.rf(["#FFF5EE","#404040","#404040","#333333","#FFF5EE","#FFF8F4","#FFC865"],[0,0,0,0,0,0.067,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape_33.setTransform(932.9,194.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.rf(["#FFF4ED","#414141","#414141","#333333","#FFF4ED","#FFF8F3","#FFC865"],[0,0,0,0,0,0.071,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEWQkVEXmKAAQmJAAkWkXg");
	this.shape_34.setTransform(930.35,195.65);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.rf(["#FFF4EC","#424242","#424242","#333333","#FFF4EC","#FFF7F3","#FFC865"],[0,0,0,0,0,0.075,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmJAAkWkXg");
	this.shape_35.setTransform(927.75,197.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.rf(["#FFF3EB","#434343","#434343","#333333","#FFF3EB","#FFF7F2","#FFC865"],[0,0,0,0,0,0.078,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGKkXEVQkWEXmJAAQmJAAkWkXg");
	this.shape_36.setTransform(925.05,198.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.rf(["#FFF3EA","#444444","#444444","#333333","#FFF3EA","#FFF6F1","#FFC765"],[0,0,0,0,0,0.082,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEWQkXEWmJAAQmIAAkXkWg");
	this.shape_37.setTransform(922.3,200.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.rf(["#FFF2E9","#454545","#454545","#333333","#FFF2E9","#FFF6F0","#FFC765"],[0,0,0,0,0,0.086,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmIAAkXkWg");
	this.shape_38.setTransform(919.45,201.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.rf(["#FFF1E8","#454545","#454545","#333333","#FFF1E8","#FFF5F0","#FFC764"],[0,0,0,0,0,0.09,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_39.setTransform(916.55,203.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.rf(["#FFF0E7","#464646","#464646","#333333","#FFF0E7","#FFF5EF","#FFC764"],[0,0,0,0,0,0.094,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_40.setTransform(913.6,205.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.rf(["#FFF0E6","#474747","#474747","#333333","#FFF0E6","#FFF4EE","#FFC664"],[0,0,0,0,0,0.098,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEWQkXEXmJAAQmJAAkWkXg");
	this.shape_41.setTransform(910.5,206.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.rf(["#FFEFE4","#484848","#484848","#333333","#FFEFE4","#FFF4ED","#FFC664"],[0,0,0,0,0,0.106,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmJAAkWkWg");
	this.shape_42.setTransform(907.4,208.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.rf(["#FFEEE3","#494949","#494949","#333333","#FFEEE3","#FFF3EC","#FFC664"],[0,0,0,0,0,0.11,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGJkWEWQkXEXmJAAQmIAAkXkXg");
	this.shape_43.setTransform(904.2,210.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.rf(["#FFEDE2","#4A4A4A","#4A4A4A","#333333","#FFEDE2","#FFF3EC","#FFC664"],[0,0,0,0,0,0.114,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_44.setTransform(900.9,212.4);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.rf(["#FFEDE0","#4B4B4B","#4B4B4B","#333333","#FFEDE0","#FFF2EB","#FFC564"],[0,0,0,0,0,0.122,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_45.setTransform(897.55,214.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.rf(["#FFECDF","#4C4C4C","#4C4C4C","#333333","#FFECDF","#FFF2EA","#FFC564"],[0,0,0,0,0,0.125,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmIAAkXkWg");
	this.shape_46.setTransform(894.15,216.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.rf(["#FFEBDE","#4E4E4E","#4E4E4E","#333333","#FFEBDE","#FFF1E9","#FFC564"],[0,0,0,0,0,0.129,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGKkXEWQkVEWmKAAQmIAAkXkWg");
	this.shape_47.setTransform(890.65,218.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.rf(["#FFEADC","#4F4F4F","#4F4F4F","#333333","#FFEADC","#FFF0E8","#FFC464"],[0,0,0,0,0,0.137,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_48.setTransform(887.05,220.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.rf(["#FFE9DB","#505050","#505050","#333333","#FFE9DB","#FFF0E7","#FFC464"],[0,0,0,0,0,0.141,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEWQkXEXmJAAQmJAAkWkXg");
	this.shape_49.setTransform(883.4,222.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.rf(["#FFE9DA","#515151","#515151","#333333","#FFE9DA","#FFEFE6","#FFC464"],[0,0,0,0,0,0.145,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEWEWQEWEXAAGIQAAGJkWEXQkWEWmKAAQmJAAkWkWg");
	this.shape_50.setTransform(879.7,224.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.rf(["#FFE8D8","#525252","#525252","#333333","#FFE8D8","#FFEFE5","#FFC363"],[0,0,0,0,0,0.153,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmJAAkWkWg");
	this.shape_51.setTransform(875.9,226.6);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.rf(["#FFE7D7","#535353","#535353","#333333","#FFE7D7","#FFEEE4","#FFC363"],[0,0,0,0,0,0.157,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGKkWEVQkWEXmKAAQmJAAkWkXg");
	this.shape_52.setTransform(872.05,228.8);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.rf(["#FFE6D5","#555555","#555555","#333333","#FFE6D5","#FFEDE3","#FFC363"],[0,0,0,0,0,0.165,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape_53.setTransform(868.1,231);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.rf(["#FFE5D3","#565656","#565656","#333333","#FFE5D3","#FFEDE2","#FFC263"],[0,0,0,0,0,0.173,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_54.setTransform(864.1,233.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.rf(["#FFE4D2","#575757","#575757","#333333","#FFE4D2","#FFECE1","#FFC263"],[0,0,0,0,0,0.176,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEWkWGJAAQGJAAEXEWQEWEWAAGJQAAGJkWEWQkXEXmJAAQmJAAkWkXg");
	this.shape_55.setTransform(860,235.65);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.rf(["#FFE3D0","#585858","#585858","#333333","#FFE3D0","#FFEBE0","#FFC263"],[0,0,0,0,0,0.184,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGKkWEWQkWEWmKAAQmJAAkWkWg");
	this.shape_56.setTransform(855.85,238);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.rf(["#FFE2CF","#5A5A5A","#5A5A5A","#333333","#FFE2CF","#FFEBDF","#FFC163"],[0,0,0,0,0,0.188,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGKkXEVQkVEXmKAAQmJAAkWkXg");
	this.shape_57.setTransform(851.6,240.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.rf(["#FFE1CD","#5B5B5B","#5B5B5B","#333333","#FFE1CD","#FFEADE","#FFC163"],[0,0,0,0,0,0.196,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGJkWEWQkWEXmKAAQmJAAkWkXg");
	this.shape_58.setTransform(847.3,242.85);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.rf(["#FFE0CB","#5D5D5D","#5D5D5D","#333333","#FFE0CB","#FFE9DC","#FFC163"],[0,0,0,0,0,0.204,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_59.setTransform(842.95,245.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.rf(["#FFDFC9","#5E5E5E","#5E5E5E","#333333","#FFDFC9","#FFE8DB","#FFC062"],[0,0,0,0,0,0.212,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEWQkXEXmJAAQmJAAkWkXg");
	this.shape_60.setTransform(838.5,247.85);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.rf(["#FFDEC8","#5F5F5F","#5F5F5F","#333333","#FFDEC8","#FFE8DA","#FFC062"],[0,0,0,0,0,0.216,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmIAAkXkWg");
	this.shape_61.setTransform(833.95,250.45);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.rf(["#FFDDC6","#616161","#616161","#333333","#FFDDC6","#FFE7D9","#FFBF62"],[0,0,0,0,0,0.224,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmIAAkXkWg");
	this.shape_62.setTransform(829.35,253.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.rf(["#FFDCC4","#626262","#626262","#333333","#FFDCC4","#FFE6D8","#FFBF62"],[0,0,0,0,0,0.231,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_63.setTransform(824.65,255.7);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.rf(["#FFDAC2","#646464","#646464","#333333","#FFDAC2","#FFE5D6","#FFBF62"],[0,0,0,0,0,0.239,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_64.setTransform(819.9,258.4);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.rf(["#FFD9C0","#656565","#656565","#333333","#FFD9C0","#FFE5D5","#FFBE62"],[0,0,0,0,0,0.247,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape_65.setTransform(815.1,261.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.rf(["#FFD8BE","#676767","#676767","#333333","#FFD8BE","#FFE4D4","#FFBE62"],[0,0,0,0,0,0.255,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmJAAkWkWg");
	this.shape_66.setTransform(810.2,263.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.rf(["#FFD7BC","#686868","#686868","#333333","#FFD7BC","#FFE3D3","#FFBD62"],[0,0,0,0,0,0.263,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEWQkVEXmKAAQmJAAkWkXg");
	this.shape_67.setTransform(805.25,266.75);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.rf(["#FFD6BA","#6A6A6A","#6A6A6A","#333333","#FFD6BA","#FFE2D1","#FFBD61"],[0,0,0,0,0,0.271,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_68.setTransform(800.2,269.65);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.rf(["#FFD5B8","#6C6C6C","#6C6C6C","#333333","#FFD5B8","#FFE1D0","#FFBC61"],[0,0,0,0,0,0.278,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGJkWEWQkXEXmJAAQmIAAkXkXg");
	this.shape_69.setTransform(795.05,272.55);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.rf(["#FFD3B6","#6D6D6D","#6D6D6D","#333333","#FFD3B6","#FFE1CF","#FFBC61"],[0,0,0,0,0,0.286,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_70.setTransform(789.9,275.5);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.rf(["#FFD2B4","#6F6F6F","#6F6F6F","#333333","#FFD2B4","#FFE0CD","#FFBC61"],[0,0,0,0,0,0.294,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEWQkXEWmJAAQmIAAkXkWg");
	this.shape_71.setTransform(784.6,278.5);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.rf(["#FFD1B2","#707070","#707070","#333333","#FFD1B2","#FFDFCC","#FFBB61"],[0,0,0,0,0,0.302,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmJAAkWkWg");
	this.shape_72.setTransform(779.25,281.5);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.rf(["#FFD0B0","#727272","#727272","#333333","#FFD0B0","#FFDECA","#FFBB61"],[0,0,0,0,0,0.31,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGKkXEVQkWEXmJAAQmJAAkWkXg");
	this.shape_73.setTransform(773.85,284.6);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.rf(["#FFCEAE","#747474","#747474","#333333","#FFCEAE","#FFDDC9","#FFBA61"],[0,0,0,0,0,0.318,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmJAAkWkWg");
	this.shape_74.setTransform(768.35,287.7);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.rf(["#FFCDAC","#767676","#767676","#333333","#FFCDAC","#FFDCC7","#FFBA60"],[0,0,0,0,0,0.325,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGJAAEXEWQEWEWAAGJQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_75.setTransform(762.8,290.9);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.rf(["#FFCCAA","#777777","#777777","#333333","#FFCCAA","#FFDBC6","#FFB960"],[0,0,0,0,0,0.333,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmJAAkWkWg");
	this.shape_76.setTransform(757.2,294.1);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.rf(["#FFCAA7","#797979","#797979","#333333","#FFCAA7","#FFDAC5","#FFB960"],[0,0,0,0,0,0.345,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGJkXEWQkVEXmKAAQmIAAkXkXg");
	this.shape_77.setTransform(751.5,297.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.rf(["#FFC9A5","#7B7B7B","#7B7B7B","#333333","#FFC9A5","#FFD9C3","#FFB860"],[0,0,0,0,0,0.353,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_78.setTransform(745.7,300.6);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.rf(["#FFC8A3","#7D7D7D","#7D7D7D","#333333","#FFC8A3","#FFD8C1","#FFB860"],[0,0,0,0,0,0.361,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGJAAEXEWQEWEWAAGJQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_79.setTransform(739.85,303.95);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.rf(["#FFC6A0","#7F7F7F","#7F7F7F","#333333","#FFC6A0","#FFD7C0","#FFB760"],[0,0,0,0,0,0.373,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGKkWEWQkWEWmKAAQmJAAkWkWg");
	this.shape_80.setTransform(733.9,307.3);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.rf(["#FFC59E","#818181","#818181","#333333","#FFC59E","#FFD6BE","#FFB760"],[0,0,0,0,0,0.38,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_81.setTransform(727.9,310.7);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.rf(["#FFC39C","#828282","#828282","#333333","#FFC39C","#FFD5BD","#FFB65F"],[0,0,0,0,0,0.388,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEWkWGJAAQGJAAEXEWQEWEWAAGJQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape_82.setTransform(721.85,314.15);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.rf(["#FFC299","#848484","#848484","#333333","#FFC299","#FFD4BB","#FFB65F"],[0,0,0,0,0,0.4,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEWkWGJAAQGKAAEVEWQEXEWAAGJQAAGKkXEWQkVEWmKAAQmJAAkWkWg");
	this.shape_83.setTransform(715.7,317.65);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.rf(["#FFC197","#868686","#868686","#333333","#FFC197","#FFD3BA","#FFB55F"],[0,0,0,0,0,0.408,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmJAAkWkWg");
	this.shape_84.setTransform(709.5,321.2);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.rf(["#FFBF94","#888888","#888888","#333333","#FFBF94","#FFD2B8","#FFB55F"],[0,0,0,0,0,0.42,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGJkXEWQkWEXmJAAQmJAAkWkXg");
	this.shape_85.setTransform(703.2,324.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.rf(["#FFBE92","#8A8A8A","#8A8A8A","#333333","#FFBE92","#FFD1B6","#FFB45F"],[0,0,0,0,0,0.427,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGJkXEWQkWEXmJAAQmJAAkWkXg");
	this.shape_86.setTransform(696.8,328.4);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.rf(["#FFBC8F","#8C8C8C","#8C8C8C","#333333","#FFBC8F","#FFD0B5","#FFB35F"],[0,0,0,0,0,0.439,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEWkWGJAAQGJAAEXEWQEWEWAAGJQAAGKkWEWQkXEWmJAAQmJAAkWkWg");
	this.shape_87.setTransform(690.35,332.05);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.rf(["#FFBA8D","#8E8E8E","#8E8E8E","#333333","#FFBA8D","#FFCFB3","#FFB35E"],[0,0,0,0,0,0.447,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGJkXEXQkWEWmJAAQmJAAkWkWg");
	this.shape_88.setTransform(683.85,335.75);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.rf(["#FFB98A","#909090","#909090","#333333","#FFB98A","#FFCEB1","#FFB25E"],[0,0,0,0,0,0.459,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_89.setTransform(677.25,339.5);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.rf(["#FFB788","#939393","#939393","#333333","#FFB788","#FFCDAF","#FFB25E"],[0,0,0,0,0,0.467,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGKkXEWQkVEWmKAAQmIAAkXkWg");
	this.shape_90.setTransform(670.6,343.3);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.rf(["#FFB685","#959595","#959595","#333333","#FFB685","#FFCCAE","#FFB15E"],[0,0,0,0,0,0.478,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGKkXEVQkVEXmKAAQmIAAkXkXg");
	this.shape_91.setTransform(663.85,347.15);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.rf(["#FFB482","#979797","#979797","#333333","#FFB482","#FFCBAC","#FFB15E"],[0,0,0,0,0,0.49,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_92.setTransform(657.05,351);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.rf(["#FFB380","#999999","#999999","#333333","#FFB380","#FFCAAA","#FFB05E"],[0,0,0,0,0,0.498,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGJkXEWQkWEXmJAAQmIAAkXkXg");
	this.shape_93.setTransform(650.15,354.9);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.rf(["#FFB17D","#9B9B9B","#9B9B9B","#333333","#FFB17D","#FFC8A8","#FFAF5D"],[0,0,0,0,0,0.51,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_94.setTransform(643.2,358.85);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.rf(["#FFAF7A","#9D9D9D","#9D9D9D","#333333","#FFAF7A","#FFC7A6","#FFAF5D"],[0,0,0,0,0,0.522,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmIAAkXkWg");
	this.shape_95.setTransform(636.2,362.85);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.rf(["#FFAE77","#A0A0A0","#A0A0A0","#333333","#FFAE77","#FFC6A5","#FFAE5D"],[0,0,0,0,0,0.533,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGJkWEXQkWEWmKAAQmJAAkWkWg");
	this.shape_96.setTransform(629.05,366.9);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.rf(["#FFAC75","#A2A2A2","#A2A2A2","#333333","#FFAC75","#FFC5A3","#FFAE5D"],[0,0,0,0,0,0.541,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_97.setTransform(621.9,371);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.rf(["#FFAA72","#A4A4A4","#A4A4A4","#333333","#FFAA72","#FFC4A1","#FFAD5D"],[0,0,0,0,0,0.553,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEWEWQEWEXAAGIQAAGJkWEXQkWEWmKAAQmJAAkWkWg");
	this.shape_98.setTransform(614.65,375.1);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.rf(["#FFA96F","#A6A6A6","#A6A6A6","#333333","#FFA96F","#FFC39F","#FFAC5C"],[0,0,0,0,0,0.565,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEWQkXEWmJAAQmIAAkXkWg");
	this.shape_99.setTransform(607.3,379.3);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.rf(["#FFA76C","#A9A9A9","#A9A9A9","#333333","#FFA76C","#FFC19D","#FFAC5C"],[0,0,0,0,0,0.576,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmJAAkWkXg");
	this.shape_100.setTransform(599.9,383.5);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.rf(["#FFA569","#ABABAB","#ABABAB","#333333","#FFA569","#FFC09B","#FFAB5C"],[0,0,0,0,0,0.588,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGJkWEWQkXEXmJAAQmIAAkXkXg");
	this.shape_101.setTransform(592.45,387.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.rf(["#FFA366","#ADADAD","#ADADAD","#333333","#FFA366","#FFBF99","#FFAA5C"],[0,0,0,0,0,0.6,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_102.setTransform(584.9,392.05);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.rf(["#FFA163","#B0B0B0","#B0B0B0","#333333","#FFA163","#FFBE97","#FFAA5C"],[0,0,0,0,0,0.612,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEWQkWEXmJAAQmIAAkXkXg");
	this.shape_103.setTransform(577.25,396.35);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.rf(["#FFA060","#B2B2B2","#B2B2B2","#333333","#FFA060","#FFBC95","#FFA95B"],[0,0,0,0,0,0.624,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmIAAkXkWg");
	this.shape_104.setTransform(569.6,400.75);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.rf(["#FF9E5D","#B5B5B5","#B5B5B5","#333333","#FF9E5D","#FFBB93","#FFA85B"],[0,0,0,0,0,0.635,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGJkXEXQkWEWmJAAQmJAAkWkWg");
	this.shape_105.setTransform(561.8,405.15);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.rf(["#FF9C5A","#B7B7B7","#B7B7B7","#333333","#FF9C5A","#FFBA91","#FFA85B"],[0,0,0,0,0,0.647,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_106.setTransform(553.95,409.6);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.rf(["#FF9A57","#BABABA","#BABABA","#333333","#FF9A57","#FFB88F","#FFA75B"],[0,0,0,0,0,0.659,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGKkXEVQkWEXmJAAQmJAAkWkXg");
	this.shape_107.setTransform(546.05,414.1);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.rf(["#FF9854","#BCBCBC","#BCBCBC","#333333","#FF9854","#FFB78D","#FFA65B"],[0,0,0,0,0,0.671,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGJkXEXQkWEWmJAAQmJAAkWkWg");
	this.shape_108.setTransform(538.05,418.65);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.rf(["#FF9651","#BFBFBF","#BFBFBF","#333333","#FF9651","#FFB68B","#FFA65A"],[0,0,0,0,0,0.682,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEXQkWEWmJAAQmIAAkXkWg");
	this.shape_109.setTransform(530,423.25);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.rf(["#FF944D","#C1C1C1","#C1C1C1","#333333","#FF944D","#FFB489","#FFA55A"],[0,0,0,0,0,0.698,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGJAAEWEWQEXEXAAGIQAAGJkXEWQkWEXmJAAQmJAAkWkXg");
	this.shape_110.setTransform(521.85,427.85);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.rf(["#FF934A","#C4C4C4","#C4C4C4","#333333","#FF934A","#FFB386","#FFA45A"],[0,0,0,0,0,0.71,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEWkWGJAAQGKAAEVEWQEXEWAAGJQAAGJkXEXQkVEWmKAAQmJAAkWkWg");
	this.shape_111.setTransform(513.65,432.5);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.rf(["#FF9147","#C6C6C6","#C6C6C6","#333333","#FF9147","#FFB284","#FFA45A"],[0,0,0,0,0,0.722,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEWkWGJAAQGJAAEXEWQEWEWAAGJQAAGJkWEWQkXEXmJAAQmJAAkWkXg");
	this.shape_112.setTransform(505.4,437.25);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.rf(["#FF8F44","#C9C9C9","#C9C9C9","#333333","#FF8F44","#FFB082","#FFA35A"],[0,0,0,0,0,0.733,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGKkWEVQkXEXmJAAQmIAAkXkXg");
	this.shape_113.setTransform(497.05,442);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.rf(["#FF8D40","#CCCCCC","#CCCCCC","#333333","#FF8D40","#FFAF80","#FFA259"],[0,0,0,0,0,0.749,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEXkWGIAAQGJAAEWEWQEXEXAAGIQAAGJkXEWQkWEXmJAAQmIAAkXkXg");
	this.shape_114.setTransform(488.6,446.75);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.rf(["#FF8B3D","#CECECE","#CECECE","#333333","#FF8B3D","#FFAE7E","#FFA159"],[0,0,0,0,0,0.761,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGKAAEWEWQEWEXAAGIQAAGJkWEXQkWEWmKAAQmJAAkWkWg");
	this.shape_115.setTransform(480.1,451.6);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.rf(["#FF893A","#D1D1D1","#D1D1D1","#333333","#FF893A","#FFAC7B","#FFA159"],[0,0,0,0,0,0.773,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGKkXEVQkWEXmJAAQmIAAkXkXg");
	this.shape_116.setTransform(471.5,456.5);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.rf(["#FF8736","#D4D4D4","#D4D4D4","#333333","#FF8736","#FFAB79","#FFA059"],[0,0,0,0,0,0.788,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGJkWEXQkXEWmJAAQmIAAkXkWg");
	this.shape_117.setTransform(462.85,461.4);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.rf(["#FF8533","#D6D6D6","#D6D6D6","#333333","#FF8533","#FFA977","#FF9F58"],[0,0,0,0,0,0.8,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmIAAkXkWg");
	this.shape_118.setTransform(454.15,466.35);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.rf(["#FF822F","#D9D9D9","#D9D9D9","#333333","#FF822F","#FFA875","#FF9E58"],[0,0,0,0,0,0.816,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGJAAEWEWQEXEWAAGJQAAGKkXEVQkWEXmJAAQmJAAkWkXg");
	this.shape_119.setTransform(445.35,471.35);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.rf(["#FF802C","#DCDCDC","#DCDCDC","#333333","#FF802C","#FFA672","#FF9E58"],[0,0,0,0,0,0.827,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGJkWEWQkWEXmKAAQmJAAkWkXg");
	this.shape_120.setTransform(436.45,476.4);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.rf(["#FF7E28","#DFDFDF","#DFDFDF","#333333","#FF7E28","#FFA570","#FF9D58"],[0,0,0,0,0,0.843,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGJkXEWQkVEXmKAAQmIAAkXkXg");
	this.shape_121.setTransform(427.5,481.5);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.rf(["#FF7C25","#E1E1E1","#E1E1E1","#333333","#FF7C25","#FFA36E","#FF9C57"],[0,0,0,0,0,0.855,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEXkWGIAAQGKAAEVEWQEXEXAAGIQAAGJkXEXQkVEWmKAAQmIAAkXkWg");
	this.shape_122.setTransform(418.5,486.6);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.rf(["#FF7A21","#E4E4E4","#E4E4E4","#333333","#FF7A21","#FFA26B","#FF9B57"],[0,0,0,0,0,0.871,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGJAAEWEWQEXEWAAGJQAAGKkXEWQkWEWmJAAQmIAAkXkWg");
	this.shape_123.setTransform(409.4,491.8);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.rf(["#FF781E","#E7E7E7","#E7E7E7","#333333","#FF781E","#FFA069","#FF9B57"],[0,0,0,0,0,0.882,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkVAAmKQAAmJEWkWQEWkWGJAAQGKAAEVEWQEXEWAAGJQAAGKkXEVQkVEXmKAAQmJAAkWkXg");
	this.shape_124.setTransform(400.25,497);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.rf(["#FF761A","#EAEAEA","#EAEAEA","#333333","#FF761A","#FF9F66","#FF9A57"],[0,0,0,0,0,0.898,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEWkWGJAAQGKAAEWEWQEWEWAAGJQAAGJkWEXQkWEWmKAAQmJAAkWkWg");
	this.shape_125.setTransform(391,502.25);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.rf(["#FF7316","#EDEDED","#EDEDED","#333333","#FF7316","#FF9D64","#FF9956"],[0,0,0,0,0,0.914,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGKkXEWQkVEWmKAAQmIAAkXkWg");
	this.shape_126.setTransform(381.7,507.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.rf(["#FF7113","#F0F0F0","#F0F0F0","#333333","#FF7113","#FF9C62","#FF9856"],[0,0,0,0,0,0.925,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEXkWGIAAQGJAAEXEWQEWEXAAGIQAAGJkWEWQkXEXmJAAQmJAAkWkXg");
	this.shape_127.setTransform(372.3,512.9);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.rf(["#FF6F0F","#F3F3F3","#F3F3F3","#333333","#FF6F0F","#FF9A5F","#FF9756"],[0,0,0,0,0,0.941,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGJkWEWQkXEXmJAAQmIAAkXkXg");
	this.shape_128.setTransform(362.85,518.25);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.rf(["#FF6D0B","#F6F6F6","#F6F6F6","#333333","#FF6D0B","#FF995D","#FF9656"],[0,0,0,0,0,0.957,1],0,0,0,0,0,96.5).s().p("AqfKfQkWkWAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEWQkXEXmJAAQmJAAkWkXg");
	this.shape_129.setTransform(353.3,523.7);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.rf(["#FF6B08","#F9F9F9","#F9F9F9","#333333","#FF6B08","#FF975A","#FF9656"],[0,0,0,0,0,0.969,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkWAAmKQAAmJEWkWQEXkWGIAAQGJAAEXEWQEWEWAAGJQAAGKkWEWQkXEWmJAAQmIAAkXkWg");
	this.shape_130.setTransform(343.7,529.15);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.rf(["#FF6804","#FCFCFC","#FCFCFC","#333333","#FF6804","#FF9658","#FF9555"],[0,0,0,0,0,0.984,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmJEWkWQEXkWGIAAQGKAAEVEWQEXEWAAGJQAAGJkXEXQkVEWmKAAQmIAAkXkWg");
	this.shape_131.setTransform(334,534.65);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.rf(["#FF6600","#FFFFFF","#FFFFFF","#333333","#FF6600","#FF9455"],[0,0,0,0,0,1],0,0,0,0,0,96.5).s().p("AqfKgQkWkXAAmJQAAmIEWkXQEWkWGJAAQGJAAEXEWQEWEXAAGIQAAGJkWEXQkXEWmJAAQmJAAkWkWg");
	this.shape_132.setTransform(324.25,540.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{x:975.45,y:170}}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape,p:{x:974.85,y:170.35}}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).wait(47));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Stars = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Stars
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(50.8,31.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_61();
	this.instance_1.setTransform(50.8,31.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},55).wait(125));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Sky = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Sky
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#0066CC","#002E5C"],[0,1],-640,0,640,0).s().p("Ehj/A4QMAAAhwfMDH/AAAMAAABwfg");
	this.shape.setTransform(640.0073,360.005,0.5616,1.7769,90.0482);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(180));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Mountains = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Mountains
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EhmVgLtIOEn0IGQGQIGQhkIGQAAIDIDIIBkjIIGQAAIJYjIIDIhkIJODsIE2QnICiE5QCvFFA/A+QA+A/GpB9QDVA+DIAyIBkxLIBkxMIDImQIDIjIIJXAAIGuFPIFyFtIJYDIIH0hkIEsAAIDIDIIJYBkIGQsgIMgDIIBkDIIDIEsIXcK8IBkY/MjMrADIg");
	this.shape.setTransform(646,481.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("EhmVgLtIOEn0IGQGQIGQhkIGQAAIDIDIIBkjIIGQAAIJYjIIDIhkIJODsIE2QnICjE4QCuFFA/A/QA/A+GoB9QDVA/DIAyIBkxLIBkxMIDImQIDIjIIJXAAIGuFPIFyFtIJYDIIH0hkIEsAAIDIDIIJYBkIGQsgIMgDIIBkDIIDIEsIXcK8IBkY/MjMrADIg");
	this.shape_1.setTransform(646,481.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},5).to({state:[{t:this.shape_1},{t:this.shape}]},9).wait(166));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Ground = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ground
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#333333","#333333","#000000","#000000"],[0,0,1,1],-640,0,640,0).s().p("Ehj/AGQIAAsfMDH/AAAIAAMfg");
	this.shape.setTransform(639.9802,630,0.1406,15.9996,-90);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(180));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Detail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Detail
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(24.7,577.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(24.7,577.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(24.7,577.75,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_4();
	this.instance_3.setTransform(24.7,577.75,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_5();
	this.instance_4.setTransform(24.7,577.75,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_6();
	this.instance_5.setTransform(24.7,577.75,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_7();
	this.instance_6.setTransform(24.7,577.75,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_8();
	this.instance_7.setTransform(24.7,577.75,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_9();
	this.instance_8.setTransform(24.7,577.75,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_10();
	this.instance_9.setTransform(24.7,577.75,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_11();
	this.instance_10.setTransform(24.7,577.75,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_12();
	this.instance_11.setTransform(24.7,577.75,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_13();
	this.instance_12.setTransform(24.7,577.75,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_14();
	this.instance_13.setTransform(24.7,577.75,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_15();
	this.instance_14.setTransform(24.7,577.75,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_16();
	this.instance_15.setTransform(24.7,577.75,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_17();
	this.instance_16.setTransform(24.7,577.75,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_18();
	this.instance_17.setTransform(24.7,577.75,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_19();
	this.instance_18.setTransform(24.7,577.75,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_20();
	this.instance_19.setTransform(24.7,577.75,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_21();
	this.instance_20.setTransform(24.7,577.75,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_22();
	this.instance_21.setTransform(24.7,577.75,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_23();
	this.instance_22.setTransform(24.7,577.75,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_24();
	this.instance_23.setTransform(24.7,577.75,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_25();
	this.instance_24.setTransform(24.7,577.75,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_26();
	this.instance_25.setTransform(24.7,577.75,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_27();
	this.instance_26.setTransform(24.7,577.75,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_28();
	this.instance_27.setTransform(24.7,577.75,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_29();
	this.instance_28.setTransform(24.7,577.75,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_30();
	this.instance_29.setTransform(24.7,577.75,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_31();
	this.instance_30.setTransform(24.7,577.75,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_32();
	this.instance_31.setTransform(24.7,577.75,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_33();
	this.instance_32.setTransform(24.7,577.75,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_34();
	this.instance_33.setTransform(24.7,577.75,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_35();
	this.instance_34.setTransform(24.7,577.75,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_36();
	this.instance_35.setTransform(24.7,577.75,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_37();
	this.instance_36.setTransform(24.7,577.75,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_38();
	this.instance_37.setTransform(24.7,577.75,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_39();
	this.instance_38.setTransform(24.7,577.75,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_40();
	this.instance_39.setTransform(24.7,577.75,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_41();
	this.instance_40.setTransform(24.7,577.75,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_42();
	this.instance_41.setTransform(24.7,577.75,0.5,0.5);

	this.instance_42 = new lib.CachedBmp_43();
	this.instance_42.setTransform(24.7,577.75,0.5,0.5);

	this.instance_43 = new lib.CachedBmp_44();
	this.instance_43.setTransform(24.7,577.75,0.5,0.5);

	this.instance_44 = new lib.CachedBmp_45();
	this.instance_44.setTransform(24.7,577.75,0.5,0.5);

	this.instance_45 = new lib.CachedBmp_46();
	this.instance_45.setTransform(24.7,577.75,0.5,0.5);

	this.instance_46 = new lib.CachedBmp_47();
	this.instance_46.setTransform(24.7,577.75,0.5,0.5);

	this.instance_47 = new lib.CachedBmp_48();
	this.instance_47.setTransform(24.7,577.75,0.5,0.5);

	this.instance_48 = new lib.CachedBmp_49();
	this.instance_48.setTransform(24.7,577.75,0.5,0.5);

	this.instance_49 = new lib.CachedBmp_50();
	this.instance_49.setTransform(24.7,577.75,0.5,0.5);

	this.instance_50 = new lib.CachedBmp_51();
	this.instance_50.setTransform(24.7,577.75,0.5,0.5);

	this.instance_51 = new lib.CachedBmp_52();
	this.instance_51.setTransform(24.7,577.75,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_53();
	this.instance_52.setTransform(24.7,577.75,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_54();
	this.instance_53.setTransform(24.7,577.75,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_55();
	this.instance_54.setTransform(24.7,577.75,0.5,0.5);

	this.instance_55 = new lib.CachedBmp_56();
	this.instance_55.setTransform(24.7,577.75,0.5,0.5);

	this.instance_56 = new lib.CachedBmp_57();
	this.instance_56.setTransform(24.7,577.75,0.5,0.5);

	this.instance_57 = new lib.CachedBmp_58();
	this.instance_57.setTransform(24.7,577.75,0.5,0.5);

	this.instance_58 = new lib.CachedBmp_59();
	this.instance_58.setTransform(24.7,577.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).wait(122));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Comet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Bits
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(137.75,-21.9,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AkMAlQgHgCgJABQgJAAgGABQAAgHgLgCIgJgCIgIgCQgBADADABQAGACABACQgCAAgCADQgBADgGgDQAAAAAAAAQAAABABAAQAAAAAAAAQABAAAAAAQAAABgBgBQAAAAgBAAQAAgBAAAAQgBgBAAgBQAAgDgFAAIAAAFIgGgGIgZABQgMAAgMACQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAABgBIgMgCQgHgCgFACIADABIgFAAIgEAAIgFgBQgKgCgFAAIAGAAQAGAAAAgCIgCgBIADAAIgBgBIAOABIgHAAQABACAHAAIAIgBQAAAAgBgBQAAAAAAgBQAAAAgBAAQAAgBgBAAIACgDQAHgBAEACQAFAEAFACIgCABIAFACQAEACADgCQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAgBgBAAIgFgCIAGACQAEACADgBQgEgEgGgBIgLgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBgBAAIAfADQATACALgDQgBAAgBgBQgBAAAAgBQAAAAAAgBQAAAAABAAQAFAAgBgEQAAABABAAQAAAAABABQAAAAABAAQABAAABgBQAGgBACABQAAgDgFgCQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAAAABgBQAEAAAOAFQANAEAHgCQgCgCgDgBQAEAAAKAHQAKAEACgGIgNgLQACAAACgCIgEgFQAGgBAEAGIAGAKIAGgHQAIgDAIABQAJACAGAIIAGgCQADgBgCgFIgIgJQgGgEgIABQgBADAGACQAAAAABAAQAAABABAAQAAAAAAAAQAAAAAAABQgDgBgHACQgGABgCgDIAMgBQAAgFgDABQgBABgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQACgFAFACQAIAAABgCIgBgBIAJABIAKACQABAGgCABIgHADQAJgBATAEQATADAJgJIgLgGQAEgBAIABQAGABgCgHQgDACgBgDQgCgDgCgBIAAABQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAEAEAGADIALAEQAAAAgBAAQAAgBAAAAQAAgBAAAAQABgBAAgBIADgDQABAAAAABQABAAAAAAQABABAAAAQAAABAAAAIgCAFIAFADQAEABABgDQADgEgEgCQgGgCAAgCIARAHIAAgBQAEADACgCQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAAAgBAAQgBgBAAAAQgBAAAAABQgBAAgBAAQAEgDAJAFQAHAFAFgHIAEADQABgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIAFADQAGACgBgFQgBgFABgBIgBAAQABAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIAKAEQABADAJAEQAJAFAAAGQAEgCgBgCQADAAAAgFQAAgEAGABIgDgCQAEAAABACIABgFQAAAFAHgDIgEgGQADAEAGgCIgDgDQADAAABADQABADAGgCIgJAFQAGAAADAFIADAHQAFADALgDQAKgBAGAHIAAgFQAAAAAAgBQAAAAAAgBQABgBAAAAQABgBAAAAQgKgCgEgGQgHgDgBAHQAAABAAABQAAAAAAABQAAAAgBABQAAAAgBAAQgCABgEgDQAAgIAIAFQAAgEgHgGQAEABAIgCIALgCIAAAAIAGADQAEACADgBQAAABAFAEQAGAEgCADQAEAAADgEQACgCAEADQAAAAAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAQABgBAAAAQABgBAAAAQAAAAAAgBQgBAAAAgBQgBADgGgDIgKgGIANgEQgBABAAAAQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQABAAAAABQABAAAAAAIACgFQABAGALgEQAMgEAFAHIgGAAQgDAAgBgDQgEACACAEQACAEgBACQAEABARgBQANgBAIADIgFgCQgDgBgBgDQAFgBAKAEIARAGIgCgFQAEACACgBQACgCAEAAIAAACQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAABAAQABAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAFAEADgEQADgDAGABIgBgCQAFACALgDIAKgCQAAAAAAAAQgBAAAAABQAAAAAAABQAAAAAAABIAOAAIACgBQABgBAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAIgEABIABgDQAIABgDAEQgFADAAACQAHgCAGAEQABgCgDgDQgEgBAEgCQACgCAIACQAGAAAFADQAEgFALAAQAKgBAAgCIABABIAFAAIgDgCQAGgBADADQAEACACAAIgCgDQAEAAAMACQAHACAIgBIgCgCQgBgBAHACIgFACQAEACAJgBQAJgDAFAAIgDgBQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAAAABAAIAGABQADACAFgBIgDgCIgDgCQAKgBABABQAAAAAAAAQABAAAAAAQAAAAAAAAQAAgBABAAQADACAIgCIgBgBQAFADAEgCIAKgBIgBAAIAHAAIAJAAIgEgCQAEABAGgBQAGAAADABIgCgBQAAAAABAAQAAgBAAAAQABAAABAAQABAAABAAQAGACAEgBQAAgBAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIAAABIgDgBIAMAAIgEgBIAZACIgBAAIAAABIgIAAQAAAAAAAAQgBAAAAAAQABAAAAAAQABABAAAAIAHAAIgFAAIgEABIADAAIgDAAQgFABAEAAIgHAAIgHABIAJAAIgFABIABAAIgEABQgHABgGACIgKACQgCABAAAAQgBAAgBAAQAAAAAAgBQAAAAABAAQAEgCgEABIgEABIgDAAIgDgBQAAAAAAABQAAAAgBAAQAAABgBAAQgBAAgBgBQgBABAAAAQgBAAAAAAQAAAAAAAAQAAAAABAAIAEABQgFgBgFACQACAAABAAQABAAABAAQAAAAAAAAQgBAAgBAAIgUADIgSADIABABIgEAAIABABIgdADIAFABIgJgBIACADQgEgCgGACIgOABIAAABIgFAAIACABIgIAAQgGgBgEACQAFgBAAAFIgQgCIgEACQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgFgBIAAABQgLADgYgBIgRAAQgKABgIAEIAAABIgPgEQgDAGgFABQABAAAAgBQgBAAAAAAQgBAAAAAAQgBAAgBAAQgHAAgBgBQgBAAAAABQAAAAAAAAQAAAAAAABQAAAAABAAIABACQgHAEgMAAQgPgBgGADQAJgGAFgBIALgDQgGgBgHABQgGADgJAAIAHABQgDAFgKgBQgJgBAAAEIgMgDQgIgDgFABIAEAHIgIABIgBgFQgEAAAAACQgDgCgIAAQgIAAgFgCIAAACIgCgBQAAACgFACQgDACAAACQAJACAAgCQAEACgGABIgLABQABAAAAgBQABAAAAgBQAAAAgBAAQAAAAAAAAIgGgCIABACQgEACgFgEQgEgDgDAGIgBgGIgHAFQAAgFgEAAQgGAAgBgEQgEAAACACIABACQgDACgJgDIgGgBQgBAAAAABQgBAAAAAAQgBAAAAABQAAAAAAAAQgEgCgGABIgIgBIAAAGIgFgCQAAAAgBAAQgBgBAAAAQgBAAAAABQgBAAAAAAIABACQgMgCgOACQABAFAEABQgEADgKgCQgNgEgGACIACADIgIgFQACADgBAEQgLACgHgBIgIgCQgDgCgCgEIgBAFQgBAEAEACIgFgDIgFgBIgegBIAAgBIgFgDIgBACIAEABIgIgBIgGgFQgCAJgDABQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAIgHACQgJADgDgEIABACQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAIgdgEgAiuAdIACACIACgDIgBAAIgDABgAj7AbQgCgGACgCQAAAAAAAAQAAAAABAAQAAAAABAAQAAABABAAIAGACQADACABgDQgEgBgCgCQADgEAEACIAAgFQgIAIgOgBQgBACADADIAGAEIAAAAgAliAbIADgFIgFAAgAiqAYQACACAEAAQAFgBABgDIABgBIgNADgAhpASQgCAFgCACIAJgEQgCgDgCAAIgBAAgAhxARQACAEAFgDIgHgIIgCgCQAAAFACAEgAkrASIAEAAIABgCgAA6AQIgCABIAEAAIgBgCIgBABgABIAMIAEADQADgBgFgFIAEAAIgBgCIgCABQgEADgDgCQAAABAAAAQABABAAAAQABAAAAABQABAAABAAgAidAHQABAAAAABQAAAAAAABQABAAAAAAQABABAAAAQACgEgFgCgACwACQADABADgDQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIgEAAIADACgAiWABIgEgDIAHACQgBgDgEgDQgGgCgDACIALAHgACBgBIgHgEQgEgBgFACIAGACQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAIAHACgAAsgEQAAABAAAAQAAABAAAAQAAAAABAAQAAABAAAAIADAAIgEgEQgBgCgEACIACAAIABAAIACABgAC6gGQABABAAAAQAAABAAAAQgBABAAAAQgBAAgBABQAAAAAAAAQgBAAABAAQAAAAAAAAQABAAABABQAEAAACgBQAAAAAAAAQAAgBgBAAQAAAAgBAAQAAAAgBgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBIADAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAIADAAQAAAAAAAAQgBABAAAAQAAAAABABQAAAAABAAgABBgGQAEgIgSAFIAHABIABgBQAFAAABADgAA5gPIAFgBIgDgCgAFLgRIAFABQACACADgCIgEgBIgCAAIgEAAgAD4gUQABAAAAAAQAAAAAAAAQABABAAAAQAAAAgBAAIAEgBQAAgBABAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIgGAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBIgCAEIABAAIAEABgADkgZQgFACAAABIAMgCQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAIgDAAgAEmgaIAJAAIACAAQAAAAABgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIgHgBIgCAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAgBABgAnFAZIAAgBIAFABgAm2AVIAFABIgGACgAlXASIgFgCIADgBQABAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQADABAEAFIgCABIgEgBgAmrARQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAIAFAAIgEABIgBAAgAlwAOIgEABQAHgCgDgCQgHgBAAgBQAFAAACABIAFAFIgFgBgAkegEQADgBACACIADADgAjGgHQABAAAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAIABAIgAjigRIgBgCIAHgBQACABgFACIgDAAgACBgWQAGAAABgCQABACgGACIgIABQABgEAFABgAiBgUIABgDIAHADgAidgbIACABIADAAIAFABIgHABg");
	this.shape.setTransform(99.55,-28.4);

	this.instance_1 = new lib.CachedBmp_63();
	this.instance_1.setTransform(88.85,-31.05,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_64();
	this.instance_2.setTransform(88.85,-31.05,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_65();
	this.instance_3.setTransform(104.75,-31.9,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_66();
	this.instance_4.setTransform(100.85,4.45,0.5,0.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AipAeIgdgEIAAAAIgEgDIgBABIAEACIgIgCIgFgEIgCAFQgCADgCABQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAgBAAIgGABQgJADgDgEIABACIgBACIgagGIgPgCQgHAAgHABQgBgIgJgCIgIgCIgJgDQgBADADACQAFABACADQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgCACQgBADgFgDIACACQgBAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAgBQAAgDgFAAIAAAFIgFgGIgYAAQgQgBgIABQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQgDAAgIgDQgHgCgFACIACABIgEAAIgDAAIgFgCQgHgCgHgBIAGAAQAEAAAAgBQgBgBgEAAIgGABIABgDIAMACIgCgBIAPACIgIAAQADACAFgBIAIAAIgDgDQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABgBQAGgBAEACQAEAEAFACIgCABIAFADQADACAEgCQAAgBAAAAQAAgBgBAAQAAAAAAgBQgBAAAAAAIgFgCQABAAAAAAQABAAAAAAQABAAAAAAQABABABABQAFACABgBQgCgEgGgBQgGgCgFABIAAgEIAdAEQAUADAJgCQgBgBgBAAQgBgBAAAAQAAgBAAAAQAAAAABAAQAFAAgBgDQABADADgBIAIAAQABgDgFgCQgEgBACgDIAQAGQANAEAHAAQgCgDgDgBQADAAALAHQAIAFAEgGIgOgLQACAAADgDIgDgEQAGgCADAHIACAGQABADABACIAHgHQAHgDAJACQAIADAFAHQALAAgEgGIgIgMQgEgEgIAAQgBAEAEACIACACIgJABQgFABgDgEIANABQAAgGgDABQgBABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQABgFAGABQAFABADgCIAIABIAJADQAAAFgCABIgGADQAFAAAIACIAOAEQAQAEAKgJIgKgIIALABQAGABgBgHQgEACgBgCIgDgFIAAABQAAgBgBAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQADAEAHADIAJAFQAAAAAAgBQAAAAAAAAQAAgBAAgBQABAAAAgBIADgDQABAAAAAAQABABAAAAQAAABAAAAQAAABAAAAIgCAFIAFADQADABACgDQABgBAAAAQAAgBAAgBQAAAAgBgBQAAAAgBgBQgFgDgBgCIARAJIAAgCQADAEACgCQAAAAABgBQAAAAAAgBQAAAAgBgBQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAEgCAHAFQAHAFAEgGIgDgCQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAIAAABIAFADQAAgBABAAQAAAAAAgBQAAAAAAgBQAAAAgBAAIAFADQAFACAAgEQAAgGAAgBIAAAAIADgCQAAgBAAAAQABAAAAgBQAAAAgBAAQAAAAAAgBIAJAFIALAIQAGAFAAAGQAGgBgCgDQADAAAAgEQAAgEAHABQAAgBgBAAQAAAAAAAAQgBgBAAAAQgBAAgBAAQABAAABAAQABAAAAAAQABAAAAAAQABABAAAAIABgEQAAAEAHgBIgEgHQADAEAGgBIgDgEQAEAAAAAEQABADAEgCIgIAEQAGABACAFIADAIQAEACAMgBQAKgBAEAGIABgEIABgEQgJgDgDgGQgDgCgCABIgCAFIgCAEQgCABgFgDQABgIAIAFQAAgEgIgGQAFACAIgCIAKgCIABAAQAHAHAEgDIAFAFQAFAEgCAEQAEABADgEQACgDAEAEQAAAAAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAQABgBAAAAQABgBAAAAQAAgBAAAAQgBgBAAAAQgCADgFgEQgEgCgFgEIAMgDQAAAAgBABQAAAAAAAAQAAABAAAAQABABAAAAIADADIACgFQAAAEAEAAIAIgCQAMgDAEAHIgGAAQgCAAgBgDQgEABABAEQACAFgCACQAHACAOgBQANAAAHAEIgFgDIgDgCIAAgBIgBgBQAGgCAJAFIAPAHIgCgFQAFACACgBQACgCAEABQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAABAAQABAAAAAAQABAAABgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAgBAAAAQAFAEADgDQADgEAGACIgBgBQAFABALgCIAJgCQAAAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABIANABIACgBQABAAAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIACgCQAGABgDAEIgEAFQAGgBAGADQABAAAAgBQAAAAgBgBQAAAAgBgBQAAAAgBgBQgBAAAAgBQgBAAAAgBQAAAAABgBQAAAAABgBQACgBAIACQAFAAAFAEQAEgFALAAQAJAAABgCIABABIAEAAIgCgBQAFgBADADQAEADACgBIgCgDIAOADQAIACAHgBIgBgBQgCgBAHACIgEACQAEADAHgCQALgDAEABIgEgBQgBAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQAEAAACACQADABAFgBQgBAAAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAIgDgCIAHgBIADABQABAAAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAEABAIgBIgBAAQADACAFAAIgCAAIACABIgIgBIAGACIAGAAQAAgBAAAAQABAAgBAAQAAgBAAAAQgBAAAAAAIgDAAIAKgBIgBgBIAGABIAIAAIgDgCIAJABIAJABIgBgBIADgBQAFADAFgCQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAIgBAAIABAAIgDgBIALABQAAAAAAAAQAAAAAAAAQgBgBgBAAQAAAAgCAAIAYADIgBAAQgBAAACABIgIAAQgGABAIAAIAAAAIgDAAIACABIgCAAIgGABIgCgBQgEAAgDABIAIABIgEAAQABAAABAAQAAAAAAAAQAAABgBAAQgCAAgCAAQgIAAgFACIgKACQgBAAgBAAQgBAAAAAAQAAAAAAAAQAAAAABgBQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAIgEABIgCABIgDgCQgBAAgBAAQgBAAAAAAQAAAAgBAAQAAAAAAABIgBAAQAAABgBAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAFABIgFAAIgFAAQACAAABAAQABAAAAAAQAAAAAAAAQAAAAgBAAQgLAAgIACQgLACgGAAIABABQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIABABIgLAAIgRABIAGABIgKgBIABACQgBgBgIAAIgMABIAAACIgGgBIACACIgIgBQgFgBgEABQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAAAABIgQgCIgDACIgBABIgEgCIAAACQgNADgVgDIgQgBQgKABgIAEIABAAIgPgEIgDADIgEAEQAAgBAAAAQAAAAAAgBQgBAAgBAAQgBAAgBAAQgFABgCgCQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAAAIACACQgHADgMgBQgMgBgIACIAPgGIAKgDQgHgBgGACQgHACgGAAIAFABQgCADgDAAIgHAAQgIgBgBAEIgLgEQgHgEgGABIAFAHIgJABIAAgFQgDAAgCACQgDgDgHAAQgIgBgDgCIgBADIgCgCQAAACgFACQgDABAAADQAIADAAgDQAEADgGAAIgKABQADgDgHgBIABACQgEABgFgEQgDgDgEAFIgBgFIgGAFQAAgFgFgBQgEAAgBgFQgBAAgBAAQAAAAgBABQAAAAAAABQAAAAABABIAAACQgEABgHgDIgGgBQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABQgDgCgGAAIgIgBIAAAFQgIgDAAABIAAACQgIgCgRAAQABAGAEABQgEADgKgEQgNgDgFABIABADIgGgFIABAGQgKACgHgBIgFgBIgDgCQgDgDgCgDIgBAEQgBAEADADgAiuAXIACACIABgDIAAgBIgDACgAAwAWIgCABIADAAIgBgBIAAAAgAA9ATIAFADQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBIgCgDIAEABQgBgBAAgBQAAgBgBAAQAAAAgBAAQAAAAgBABQgEACgCgBQAAAAAAABQAAAAAAABQABAAAAAAQABABABAAgAhsAQIgEAGIAJgEQgBgBAAAAQgBgBAAgBQAAAAgBAAQAAgBAAAAIgCACgAiqASQACACAEgBQAEAAABgDgAj3ARQgBgHABgBQAAgBAAAAQAAAAABAAQAAAAABABQAAAAABAAQAHAFACgDIgCgCQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQADgDAEACIgBgEQgDACgHACQgGABgFgBQgBACADAEIAGAFIAAAAgAh1AFQgBADACAFQACAFAFgDIgGgIQgCgEgFgCIgBAGIACgDIABAAIADABgAChAPQADABADgDQgBgBAAAAQgBgBAAAAQgBAAAAAAQgBAAAAAAIgFABIADADgACnAEIADAAQAAAAAAAAQgBAAAAABQAAAAABAAQAAABABAAQAAABABAAQAAABAAAAQgBAAAAABQgBAAgBAAQAFADACgCQAAAAAAAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAABAAIACgBQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBIgDgBIgCABgAlZAKIACgEIgFAAgABrAJQgBgFAEABIAGADIgFgEQgGgCgDACIAEACIgBAAgAE2ADIAEACIAFgBIgDgBIgDAAIgDAAgAicABQAAABAAAAQAAABABAAQAAABAAAAQABAAAAABQABgEgDgCgAkkAFIACAAIABgDgAAjAAIABADIADAAIgEgDQAAAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAIACAAgAAqgDIAHAAQAGAAABADQABgEgFAAIgCAAIgIABgADmgEQABAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAIAEgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQgIAAAAgCIgCADIABAAIADABgAiWgDIgEgFIAHAEQgBgEgDgDQgFgDgEADIAKAIgAF9gGIACAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAgBAAIgDAAgAETgIIAJABIACAAQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAgBAAIgGgBQgBAAgBAAQgBAAAAAAQgBAAAAABQAAAAgBAAgADUgKQgCABgBAAQAAAAgBABQgBAAAAAAQAAABABAAQAAgBAKgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAgBAAIgCAAgAAxgJIAEgBIgCgDgAlPACIgEgCIADAAQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBgBAAQAEAAAEAFIgDABIgEgCgAk/gDIAAAAIAAAAgAB2gMQAEABACgDQABADgFAAIgIABQABgDAFABgAkYgQQAEgCACACIACAFgAjDgPQAAAAABAAQAAAAABgBQAAAAABAAQAAgBAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAAAAAIAAAJgAiBgZIABgBIAHACgAjegdIAGAAQABAAAAAAQAAABAAAAQgBAAgBABQgBAAgBABQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBgAiYgeIgDgDIACABIADABIAEABg");
	this.shape_1.setTransform(111.15,-26.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAiQABAAAAgBQABAAAAAAQAAgBAAAAQgBAAAAgBIgDgBIAAACQgCACgFgFQgCgDgCAFIgBgEIgFADQAAgFgDAAQgEAAgBgFQAAAAgBAAQAAAAAAABQgBAAAAABQAAAAABABIABADQgEABgGgEQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAAAgBAAQgCgCgEAAIgGgBIAAAGQgGgDgBAAIABADQgIgDgMAAQABAGADABQgDADgIgEQgJgDgDABIAAACIgFgDIAAAFQgJABgDgBIgDgBIgDgBIgEgHIAAAFQgCAEADACIgDgCIgEgCIgHgBIgPgCIABgBIgFgDIAAABIADADIgFgDIgGgEQgCAIgBABQAAgDgGADQgIABgCgDIABACIgBABIgUgGIgLgCIgLABQgBgIgGgCIgHgCQgEgBgCgDQgBAEADABQADACABACIgCABIgBACQgBADgEgDIgBgCQAAgBAAAAQAAgBAAAAQgBgBAAAAQgBAAgBAAIAAAFIgFgHIgSAAQgLgBgHABQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAIgIgDQgEgCgFABIACABIgEABIgCgBIgEgBQgEgDgFAAIADAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQgDgBgCABIABgDQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAIAFABIgCgCIALACIgFAAQABACAEAAIAGgBIgBgCQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBAAAAQAHgBABADIAHAFIgBABIAEADQABAAAAABQABAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAgBgBQAAAAAAAAQAAgBgBAAIgDgCQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAEADABgCQgCgDgEgCQgDAAgFAAQAAgBAAAAQABgBAAAAQAAgBgBAAQAAgBAAgBIAWAFQAOADAIgCQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAEABgBgEQABAAAAABQAAAAABAAQAAABABAAQAAAAABAAQAEgBACABQAAgEgDgBQgBAAAAgBQgBAAAAgBQgBAAABgBQAAAAAAgBIANAGQAJAGAFgCQgBgCgCgCIALAIQAGAEACgGIgJgLIADgCIgCgFQAEgBACAGIAEAMIAEgHQAHgEAGADQAGADAEAHQAIAAgCgHIgGgKQgEgFgFAAQgCAEAEACIABABIgGABQgFACgBgEIAJAAQAAgBgBgBQAAgBAAAAQAAgBgBAAQAAAAAAAAQgBAAgBABQAAAAgBAAQAAAAAAgBQgBAAAAgBQACgEAEABQAEABACgCIgBAAIAHABQACAAAFACQABAGgCABIgFADQADAAAGADIALADQANAEAIgIIgIgIIAIABQAFABgBgHQgBABAAAAQgBAAAAAAQgBAAAAgBQAAAAgBgBIgBgEIgBABQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADAEAEADIAHAFQgBgDAEgEQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABIgCAFIAEADQABAAAAAAQABABAAgBQABAAAAgBQAAAAAAgBQACgDgDgCIgDgEIAMAIIAAgCQABABAAABQABAAAAABQABAAAAAAQABAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQADgDAGAHQAGAEADgGIAEAEIABgDIADADQADACAAgEIAAgHIADgCQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIAGAGIAAAAIAIAIQAGAFAAAFQABAAAAAAQABAAAAgBQABAAAAgBQAAgBgBAAQABAAAAgBQABAAAAAAQAAgBAAgBQAAgBAAgBQABgDAEABIgBgCQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAIAAgEQABAFAFgCIgDgHQADAEAEgBIgCgEQACAAABAEQAAABAAABQABAAAAAAQABAAAAAAQABAAABAAIgHADQAFABACAFIACAIQACACAJgBQAHgBAEAGIABgDIACgFQgIgDgCgGQgGgDgBAHIAAAEQgCABgEgDQACgIAEAFQAAgEgEgGQAEACAFgCQAHgCABAAQAFAHAEgCIAEAFQAEAEgCADQADABACgDQACgDADAEQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAADgFgEIgHgHIAJgCQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAIADACIABgEQABAEADAAIAGgCQAJgCADAGIgFAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQAAgBgBgBQgCACABAEQACAEgCACQAFACAKgBQALAAAEAEIgDgDQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQAEgBAHAFIAMAHIgCgFQABABABAAQABAAAAABQABAAAAAAQABgBAAAAQABgCAEABIAAACQABAAABAAQABAAAAAAQAAgBAAAAQABAAgBgBQAAgBAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQADAEACgDQADgDAFACIgBgCQAEACAIgDIAJgCQgBAAAAAAQgBABAAAAQgBABAAAAQAAABAAABIAKABQAFgCgDgCIgDABIABgCQAFACgCACQgDADAAACQACAAADABIAEACQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBQgBAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQACgBAGACQAFABADACQACgDAJAAQAHAAABgDIABACIACAAIgBgCQAEgBACADQADADABAAIgBgDQAEAAAHADQAGACAFgCIgBAAQAAAAAAAAQAAAAABAAQAAAAABAAQABAAABAAIgDACQADADAGgCQAIgCADABIgDgBQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAAAAAAAIAGACQABACADgCIgCgBIgBgCIAEAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAABgBQAAAAAAAAQAAAAAAAAQABAAAAAAIAJAAIgBgBQACACAEAAIAHAAIgBgCIAGACIAFgBIgCgBIAOACIgBgBIADgBQAEACAEAAQAAgBgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIAAAAIgDgBQAFAAADACQABgBAAAAQAAAAgBAAQAAAAAAgBQgBAAgBAAIASADIAAAAIAAABIgGAAQgBAAgBAAQAAABAAAAQABAAABAAQABAAACAAIgCAAIABAAIgEAAIADABIgDAAIgDAAIgCAAIgFABIAHABIgFAAQABAAAAAAQAAAAgBAAQAAAAAAAAQgBAAgBABQgDgBgGACIgIACQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAABAAQABAAAAAAQABgBAAAAQAAAAgBAAQAAAAAAAAIgDAAIgDABIgCgBQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAAAIgBABQgBAAAAAAQAAAAAAABQAAAAAAAAQAAAAABAAIgFABQABAAABAAQABAAAAAAQAAAAAAAAQAAAAgBAAIgOACIgOACIABABIgEAAIABABIgUAAIADACIgHgCIABADQgBgBgFAAIgKABIAAABIgFAAIACABIgGgBQgEgBgDABQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQABAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAIgMgCIgCACQAAAAgBAAQAAAAAAABQAAAAABAAQAAAAABAAIgFgBIAAABQgKADgQgDIgNgBQgHAAgGAEIABAAIgMgDIgCACIgDAEQAAgBAAAAQAAAAgBAAQAAgBgBAAQAAAAgBAAQgEAAgBgCQAAABgBAAQAAAAAAABQAAAAAAAAQAAABAAAAIACACQgGADgJgBQgLgBgEACQAHgFAEgBIAIgDQgGgBgEABQgGACgFAAIAFACQgDAEgGgCQgHgBgBAEIgIgEQgGgEgEABIAEAHIgGABIgBgFQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAAAABQgDgEgFAAQgGgBgDgCIgBADIgBgCQAAADgDACQgBAAgBAAQAAABAAAAQgBABAAAAQAAABAAAAQAHADgBgDQADADgFABIgIAAgAiAAWIACACIABgDIAAAAIgDABgAA0AVIADADQAAAAAAAAQABgBAAAAQAAAAgBgBQAAAAAAgBIgCgCIADAAQAAgBAAgBQAAAAAAgBQgBAAAAAAQAAAAgBABQgEACgBgBQAAAAAAABQAAAAABABQAAAAAAABQABAAABAAgAhOAPIgDAHIAHgDQAAgBgBgBQAAgBAAAAQgBgBAAAAQAAAAgBAAIgBAAgAh9ARQACACADAAQABAAABAAQAAAAABgBQAAAAAAgBQAAAAAAgBIABAAIgJABgACAASQABAAAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBgBgBQAAAAAAgBQgBAAAAAAQAAAAgBAAIgDABIACADgAhUAFIABAIQABAFADgDIgDgIIgGgGIgBAHIABgEIACAAIACABgAi4APQgBgKAEADQAFAFACgDIgCgCIgCgDQACgDADACIAAgDQgCACgGABQgFACgDgBQgBACACAEIAEAEIAAAAgACHAKQABAAAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABAAAAQAAAAAAAAQAAAAAAABQABAAAAAAQABAAABAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAAAQAAAAgBAAQAAgBAAAAQgBAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAIACAAIgCgCQAAgBgBAAQAAgBAAAAQgBAAAAABQgBAAAAABIACgBQAAAAgBAAQAAABAAAAQAAAAABABQAAAAAAABgAkDAIIACgFIgEAAgAAgACIABACIACABIgCgDQgBgBAAAAQgBgBAAAAQgBAAAAAAQgBAAgBABQABAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIACAAgAhyABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAgEgCgBIAAACgAAlgCIAGABQAEAAAAADQACgEgEgBIgCAAIgGABgAC1AAIABAAIADAAQAAAAAAAAQABgBAAAAQAAAAAAAAQAAgBAAAAIgEgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBIgBAEIABAAIACABgADYgEIAGACIACgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIgFgBIgCAAQAAAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAAAgAEQgDIAFgBQAAAAAAAAQABAAgBgBQAAAAAAAAQAAgBgBAAIgEAAIACABIgGgBIAEADgACngGQgBAAgBABQAAAAgBAAQAAABAAAAQgBABAAAAIAJgCQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIgCAAgAhtgEIgDgEIAFAEQgBgEgCgEQgEgDgDADIAIAIgAArgHIADgBIgCgDgAj6AAIgEgCQABAAABAAQAAAAABgBQAAAAAAAAQAAgBAAgBQACABAEAFIgCAAIgDgBgAlLAAIAAAAIAEAAgAkNgFIgCABQAFgBgDgCIgEgEQADABABACIAEAFQAAAAgBgBQAAAAAAAAQgBAAgBAAQAAgBgBAAgAk4gGQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAEAAIgDABIgBgBgABfgJQADABACgDQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABIgGAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAABAAgAiQgPQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIgBAIgAjQgSQABAAAAgBQABAAAAAAQABAAAAABQABAAAAABIABAEgAhcgYIAAgCIAFACgAikgeIAFgBQABABAAAAQAAABgBAAQAAABgBAAQAAAAgCABQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBgAhugeIgDgDIACABIACAAIADACg");
	this.shape_2.setTransform(119.75,-31.75);

	this.instance_5 = new lib.CachedBmp_67();
	this.instance_5.setTransform(185.15,-7.2,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_68();
	this.instance_6.setTransform(61,-27.5,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_69();
	this.instance_7.setTransform(24.1,-29.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},4).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},2).wait(2));

	// Comet
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Av9EXIhRgEIAFAAIgPgFIADAIIgDgCIgFgDIgMgCQgNgDACgDIACAAQAAgBABAAQAAAAgBgBQAAAAAAgBQAAAAgBgBIgBgBIgBgBIgNgGIgDgCQgBADADADIgNgDQgGgGgLgHIgWgOIgEgDIgCgBIgJgIIgDgEIgFgGIgKgCQgEgHgLgNIgTgUQgKgLgFgKQgGgMAAgKIgHgNIgBgBIABAAIgBgBIgFgKIgBgCIgBgCIgKgaIgJgcIgGggIABgUQAAgJACgLQACgMADgHIAEgHQABgDAEgCIAHgVIAFgQIAAgCIABgFIAAAAIABgBIAFgRIAGgNQADADADgCIAEgGIAGgJIADgEIADgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBABgBIAEgGIAEgEIABgBQACgEAAgDIAFADQAJgJAHgGQAIgIAJgGIgBADQAAAAABABQAAAAABAAQAAAAABgBQAAAAABgBIAHgGIAEgKIACAHIAEgDIACgDIABACIAHgDQADgCACgDQADgCAAgDIABgEIACAAIACAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABgBQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAAAIgGgBIACgBIAKAAIAFgCIAIgFIgEAFIAIgDIABAAIABAAIAFgBIADgCIAHgFIgCgJIgKAHIAAAAIAAAAIASgPIACAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAABAAIAHgDIAFAAIAEgBQACAAACgEIADAHIAJgIIgBAHQAAABAAAAQABABAAAAQABABAAAAQABAAAAABIAIABIAOAAIgFgHIAFADIACAAIADACIAEABQAFAAADgDIAAAGQAEAAACgBIACgDQAAAAABgBQAAAAAAAAQAAgBAAAAQAAAAABAAQABgBAEABIgEAFIAmgCIASABIAIADIAIADIAAACQAGADAJACIAMABIgCgBIASAEIgBAEIAHACIABAAIAAAAIAFABIgBACIAHAEIACABIACAAIAEACIAHABIAHAAIgCgDIABgBIABAAIAKgMQADAAAEgCIAEAAIAFADIgDACQgBAAAAABQAAAAAAABQAAAAAAABQAAAAABABIAKAAIAJgFQgGAEABAGQAAACAEADIAGAFIANACIAKAAQALAAAHAEIAHALQAFACAFgEQAFgDACADIAHACQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBQABgCAIADIAAAAIABABQAFADAFAAIAIACIAMgBQADgEAFADIAHAGIAFgFQAKAHARAHQAOAFAWAGQABAFARAAIgEgDIAnANIAQAEIAJADIAFgIIAAABQAFADAJgCQAHgDAGADIAAgBQAAABAAABQABAAAAAAQAAABABAAQAAAAABAAQABAAAFgCQAJgDACADQADACAFgCIAHgEIACACQADADADgCIAFgFQADgDADACQADACAFAAIAJgBIgBgCQAHACAbgBQAXAAAKACIAAABIABgBIABgCIgBACIAIABIAAgBQAEgEADAAQAEgDADAEQAAABAAAAQAAABABAAQAAAAABAAQAAAAABAAQABgBAAAAQAAAAABABQAAAAAAAAQAAABgBAAQAHgDAHAAQAEgBAIACIAMABQAHAAAHgDIgBAAIAFABIgCgEQABACAGgCQABAAABAAQABAAAAAAQABAAAAABQAAAAAAAAIAAABQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAIAGAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAgBAAIADgCQAGADAJgBQAJgBADADIADgCQAEABANgBQAKgDAGAFIAogFIANABQAJABACACQAGABAIgBQAJgCAEABQAAAAAAABQAAABAAAAQABAAABAAQAAAAABAAQAGAAAAABQAAAAAAgBQABAAAAAAQABgBAAAAQABAAABABQABAAAAAAQABgBABAAQAAAAABAAQAAgBAAAAIABADIAPAAIgBABIABABIADAAIADgDIAAADIACAAIAAABIAFAAQAAgBABAAQAAAAABgBQAAAAAAgBQAAAAAAgBIABACIABAAQABAAAAAAQABAAAAAAQAAAAgBgBQAAAAgBAAIAEABIAFABIgCAAIAEABQADABACgCIABgEIgFACIAHgFIABACIAAABIAFAAQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAAAAAIABACIAEgCQgDAFAFABIAFAAIgCgDIAEADQAAAAABAAQAAAAABAAQAAAAABAAQABgBAAAAIAAACQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIgBACIANgCQAHgBAFACIAAABIAKAAIgBAAIAGgBIAAABIAFAAIAAABQAGACAGgCIgBgBQABAAACgFIADgBQAAAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQgBAAAAABQAAAAAAAAQAAAAAAABQAAAAABAAIADgBIADgCQAAABgBAAQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQABAAAAAAQABABAAAAQABAAABAAIAKgBIAHAAIAEADQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAIADgBIAEAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAIABABIAEAAIAEAAIAEAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAIADACIABgCQALADAQAAQABABAGAAIgBgBIAhABIABAAIABABIADAAIANAAIAAABIgZAAIgBABIAHABIABgCIALABIAIAAQAFAAACgBIALABIgFAAIAFABIAEAAIAIAAIADABIAGAAIAKABIgHgDIATAAIABABIADgBIACABIACgBIAAgBIALAAIAMABIABgBIAIABIAGgBIAKABIABAAIAEAAQAFAAAEABIAcAAQAKAAACgBIAAABIAHAAIAAgBIAAABIAfgBIgTABIAAAAIgDABIgXABIgCAAIgJABIABAAIghACIgYACIgbACIAHAAIgiAEQggADgDgBIgrADQgcADgNAAIgpACIgoADIhPAHIgPgBQgJAAgFACIAAgBIgHABIgVACIgIABIABADQABAHAGgDIADgBIAAAEQAMgHAOAAQAIAAAPADQAOAEAJgBQAOAAAOgIIgCACIAJACIgDgLQADAGAJgDQAEgCADABQAAAAABAAQAAAAAAABQAAAAABABQAAAAAAABIgCABQAAAGAGACIAJACQAAgGgCgBQACAAAFgEQAKAGARgBIANAAQAHABAEAFIAFgIQAIAEAIgBIASgCQAVgEAKAJIBNgKIAaACQAQACAFAHQAOAEAOgDQARgEAIAAQgCAHAIAAQAKAAADACQAAgBAAgBQAAgBAAAAQAAgBAAAAQAAAAAAAAQACgBADABQAIABABgEIABAGIAdADIgCABQAAABAAAAQAAABAAAAQABAAAAAAQABAAABAAQAEgBACACIAFgIIgBAIIADAAIACgBIAAACQAGACAEgBQAEgCABgFIACADQABABAAAAQAAAAAAAAQABABAAAAQAAAAABAAQAEgCgFgEIAGADQAEACAHgBIgEADQACgBAGACQAGACAEgEIABgKIgJAEIAOgIQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAIAAACQADgBAFACIACAAIAEgCIABAGIAGgGIgBAIQAAAEAHABIAJACIgDgHIAGAGQAEADAEgFIABAGQADABABgEQABgDAEACIgCADQAGABAHgBIAMgCQAOgDAKAEIAAACQAHADAMgCIgCgBIANgBIABAEIAJgBIAAADQALADAOgEIgDgCQACAAAFgNQACAAADgCQACgCAFACIgCADIAAADIAJgCIAFgEQgDACACAFQACAEAHACQAIAAALgCQAHgCAHACIAHAHQAEAAADgDQACgEAEACQAHACAAgCQAAgBAHABIAAgBIABAAQAGADAJgBIAIgCQABgDAFABIAGADIADgEQASAIAhABQADACAMAAIgCgCQATADAMAAIAfABIAEgCQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAABABIAFACIAaAAIAAABIgyAAIAAACIAMADIAEgEQAKACAKAAIAPAAQALABADgDIABAAIgBAAIAAgBIAXAFIgKAAIAKADIAEAAIACgCQACgBADABIALABIAGACIAMAAIAUADIgOgGIATAAIARAAIAAABIACABIAGgBIAEABQABAAABAAQABgBAAAAQABAAAAgBQAAAAAAAAIABgDIAUAAQAXADAEAAIgCgBIADAAIgGgBIAUACQABgBAMAAIARABIADABIgEAAIALACIgBgBIAAgBIADABIAGABIALAAIBOABIgBABIAMgBIAAABIADgBIALABIACgBIAFABIAggBIgbABIgHACIgNAAIgGABIgcACIgUACIALAAIgGAAIgjABIgTABQgLADgDgBIACAAIgvAEIgXACIgcACIANABIhwALQgUACgEgBIgqACIgqAEIgpAEQgVACgRgBQgkABgrADQgnACgmAFIhOAIIhPAIIABgBIgegCQgRAAgKAEQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAIgNACIABAAQgZAAgSADQgYACgTAIQgEgCgQABQgRgBgEgCQgfgBgkADQgeABgoAEIhIAJIhJAJIgCgEQgDgDgGABIAAAKQgNgEgQABIgeAEIgdADQgRAAgKgHIgNANIitAWIgGgBIAAACQAAAAAAABQAAAAABABQAAAAABAAQABABABAAIADABIgBgEIAEADQAAAAABABQAAAAAAAAQABAAAAgBQABAAAAAAIAAACQABAAAAAAQABAAAAAAQAAAAABAAQAAgBAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAAAABIgBACIANgCQAHgCAFADIAAABIAKAAIgBgBIAGAAIABABIAEAAIAAABQAGABAGgBIgBgBIADgHIACgBIAEAAQAAAAAAABQgBAAAAAAQAAABAAAAQABAAAAABIADgBIADgDQgEAEAJADIAJgBIAHAAIAEADQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAABAAQABAAABAAQAAAAAAAAQAAAAAAgBIADAAIABABIAEAAIAEgBIAEAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAAAAAIAEACIABgDQAIADASABQABABAHgBIgCAAIAQABQAIABAHgBIACAAIABAAIADACIgNAAIABACIAGAAIACgBQADABAGgBIAHAAQAHAAABgBIAAAAIALACIgFAAIAGABQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAgBQACgBAGABIAEACIAGAAIAJABIgGgEIARABIACAAIACAAIACAAIADgBIAAgCIAAABQAAgBAKABIANAAQgCgBACABIAAAAIAGAAIAHAAIAJAAIABABIgCAAIAGAAQgBAAgBAAQAAAAAAAAQAAAAABAAQABAAABAAIAjAAQAKABACgBIAAABIAHgBIAAgBIAAABIAGAAIAAAAIABAAIABAAIAWgBIgQABIgCABIgEAAIgJABIgYACIAFAAIhTAIIAGABIgiAEQgdAEgEgBIg/AHIgTABIgnADIgnAEIgmAFIgoAFIAAgBIgOAAQgJAAgFACIAAgBIgHABIgVACQgKACgLAEQgCgBgIABIgKgBQgbgBgqAFIhIALIgCgDIgBAAIgDAAIgBAFIgJgBIgGACQgVAKgEgEQgLAAgLAHIgIAFIgGAEIgGgCQgIgCgIAFIgJAIQgIAHgHgBQgHgBgMADIgWAHIADACIihApIACgDIgDAEQgFAGAEgHIgSAFIAAABQgDACgDAEIgJAJIgDABIgFABIgCAAIgDgBQgBgBAAAAQgBgBAAAAQAAAAgBAAQgBAAAAAAIgCAAIgBABIgDACIgCABIgCABQAAAAgBAAQAAAAAAAAQAAgBAAAAQABgBAAgBQgJAGgKAEQgLAEgHABQgOADgSAAIgEAAgAllBLIACAAIABAAIACAAQAAgBABAAQAAAAAAgBQABAAAAgBQAAAAAAgBIACABIAAABQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAgBgBIAEACQACACADgBIgCABIAEABQACABADgDIAAgEIgEABIAHgEIgegGIgiALQAFgBABABQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAABABQABAAAAAAQABAAAAgBQABAAAAAAQAAgBAAAAIABADIAPABIgBABQAAAAAAAAQAAAAAAAAQAAABABAAQAAAAABAAIACgBIADgDIgBAEQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAABgBgAlBBGIACgCIgCAAgAlJBDIABACQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIgGgCIgBABgAjMh3QAVABAPAFIgCADIADgEQAGgKgFAMIAOABIABgCIAGgFIACgCQgDgBgEAAIgLAAIgLAAQgPAAgRACgAo5iWIABgCIAAAAgAhbBNIgBAAIgMABg");
	this.shape_3.setTransform(105.425,-2.0222);

	this.instance_8 = new lib.CachedBmp_70();
	this.instance_8.setTransform(-28.15,-29.9,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_71();
	this.instance_9.setTransform(-28.15,-29.8,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_72();
	this.instance_10.setTransform(-28.15,-29.75,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_73();
	this.instance_11.setTransform(-28.15,-29.65,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_74();
	this.instance_12.setTransform(-28.15,-29.6,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_75();
	this.instance_13.setTransform(-28.15,-29.5,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_76();
	this.instance_14.setTransform(-28.15,-29.45,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_77();
	this.instance_15.setTransform(-28.15,-29.4,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_78();
	this.instance_16.setTransform(-28.15,-29.3,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_79();
	this.instance_17.setTransform(-28.2,-29.25,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_80();
	this.instance_18.setTransform(-28.2,-29.25,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_81();
	this.instance_19.setTransform(-28.2,-29.25,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_82();
	this.instance_20.setTransform(-28.2,-29.25,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_83();
	this.instance_21.setTransform(-28.2,-29.2,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_84();
	this.instance_22.setTransform(-28.2,-29.3,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_85();
	this.instance_23.setTransform(-28.2,-29.45,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_86();
	this.instance_24.setTransform(-28.2,-29.6,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_87();
	this.instance_25.setTransform(-28.2,-29.8,0.5,0.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("EgkaAEXIi7gEIAMAAIgjgFIAHAIIgHgCIgLgDIgbgCQgfgDAFgDIAGAAQABgBAAAAQAAAAAAgBQgBAAAAgBQgBAAgBgBIgDgBIgngJQgCADAHADIgegDQgPgGgZgHIgzgOIgJgDIgEgBIgVgIIgHgEIgLgGIgWgCQgJgHgagNIgtgUQgVgLgMgKQgPgMABgKIgQgNIgCgBIABAAIgCgBIgMgKIgBgCIgCgCQgRgRgHgJQgPgSgGgKIgMggIACgUQAAgJAEgLQAFgMAHgHIAJgHQACgDAJgCQAKgLAHgKIAKgQIAAgCIADgFIAAAAIABgBIAMgRIAPgNQAHADAGgCQACAAAIgGIAMgJIAIgEIAHgCQgHgCAEgDQABgCAJgEIAJgEIACgBQAGgEgCgDIAMADQAVgJAQgGQASgIAWgGIgDADQABACAIgDIARgGIAIgKIAEAHIAKgDIAEgDIADACIAQgDQAGgCAFgDQAHgCABgDQABAAAAgBQAAgBABAAQAAgBAAAAQgBgBAAAAIAJAAQAGACADgCQAIgCgDgBIgNgBIAFgBIAWAAIANgCIASgFIgLAFIATgDIADAAIACAAIAjgIIgFgJIgWAHIgBAAIAAAAIApgPIAFAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAgBAAQAAABABAAQAAABAAAAQAAABABAAQAAAAABAAIAQgDIALAAIALgBQAEAAAFgEIAHAHIAVgIIgEAHQACADAGABIAyABIgLgHIAMADIADAAIAIACIAJABQAKAAAHgDIABAGQAKAAAEgBIAFgDQAAAAABgBQAAAAABAAQAAgBABAAQAAAAABAAQADgBAIABIgJAFICAgBIATADIATADIgBACQAPADATACIAcABIgEgBIApAEIgBAEIAPACIACAAIABAAIAKABIgCACIAQAEIAFABIAFAAIAJACIAQABIARAAIgGgDIAGgBIAXgMQAHAAAJgCIAIAAIAMADIgIACQAAAAgBABQAAAAAAABQAAAAAAABQABAAAAABIAYAAIAUgFQgNAEADAGQAAACAIADIANAFIAgACIAWAAQAYAAASAEIAQALQALACALgEQAMgDAEADIARACQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAgBQADgCARADIACAAIABABQAMADAKAAIAUACIAcgBQAGgEALADIAQAGIAMgFQAWAHApAHQAfAFAyAGQACAFAnAAIgJgDIBbANIAkAEIAUADIANgIIgBABQAMADATgCQASgDANADIABgBQAAADAFAAQAEAAALgCQAUgDAFADQAIACALgCIAQgEQAAAAAAABQAAAAABAAQAAAAABABQABAAABAAQAHADAHgCIALgFQAIgDAHACQAFACANAAIAVgBIgDgCQARACA9gBQA1AAAYACIAAABIABgBIADgCIgDACIASABIAAgBQAKgEAGAAQAJgDAHAEQAAADAIgBQABgBABAAQABAAAAABQAAAAAAAAQAAABAAAAQAOgDAQAAQAKgBASACIAbABQARAAARgDIgCAAIALABIgGgEQAEACAMgCQALAAgBABIgBABQABACAFABIAMAAQAAAAAAgBQAAAAgBAAQAAgBgBAAQAAAAAAAAIAGgCQANADAUgBQAVgBAHADIAHgCQAJABAegBQAXgDANAFIBegFIAdABQAUABAFACQAPABASgBQATgCAKABQgBADAJgBQAOAAgBABQAAgCAJABQAHAAADgCIABADIAiAAIgCABQAAAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAIAIAAIAIgDIgCADIAGAAIgBABQAFABAGgBQAGgBgBgDIADACIADAAQAFAAgFgBIAHABIANABIgDABIAIAAQAFABAHgCIABgEIgLACIAQgFQABAAAAABQABAAAAAAQAAAAAAAAQABAAAAABIAAABIAKAAQACAAADgBIADACIAIgCQgHAFAMABIALAAIgEgDIAJADQAEABAGgCIgBACQAFABACgCQABgCAEABIgDACIAegCQAQgBALACIABABIAWAAIgCAAIAPgBIABABIALAAIAAABQAPACAOgCIgEgBQACAAAGgFIAGgBQACgBAHABQgBAAAAABQgBAAAAAAQAAAAABABQAAAAABAAIAPgDQgFACAEACQABACAJAAIAXgBIAPAAIAJADQAFAAADgBIAHgBIAIAAQABgBAGAAIACABIAKAAIAJAAIAJAAQACgCAEAAIAHACIAEgCQAZADAjAAQAEABAOAAIgDgBIBLABIAEAAIABABIAIAAIAeAAIgBABIg6AAIgBABIAPABIACgCIAZABIATAAQAMAAAEgBIAbABIgOAAIAOABIAJAAIARAAIAIABIANAAIAXABIgPgDIAqAAQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAABAAIAHgBIAEABIAGgBIABgBIAXAAIAeABIABgBIATABIANgBIAYABIACAAIAJAAQALAAAKABIBAAAQAWAAAFgBIABABIAOAAIACgBIAAABIBHgBIiCAEIADAAIhLACIg4ACIg9ACIAQAAIhOAEQhKADgHgBIhkADQg/ADgeAAIheACIhcADIjYAGQgVAAgNACIABgBIgQABIgxACQgJAAgJABIADADQACAHANgDIAIgBQAAAAAAAAQAAAAAAABQAAAAAAABQgBABAAABQAcgHAfAAQATAAAjADQAgAEAVgBQAfAAAhgIIgFACIAVACIgIgLQAJAGAVgDQAJgCAGABQAFAAAAADIgDABQgCAGAOACIAWACQgBgGgEgBQAEAAANgEQAWAGAogBIAeAAQAOABALAFIALgIQASAEATgBIAogCQAwgEAZAJICwgKIA8ACQAkACALAHQAgAEAggDQAogEASAAQgFAHASAAQAYAAAGACQAAgBAAgBQAAgBAAAAQAAgBAAAAQABAAABAAQADgBAIABQARABADgEIABAGIBFADIgHABQAAADAIgBQAKgBAFACIALgIIgCAIIAGAAIAFgBIgBACQAOACAKgBQAIgCADgFIAFADQADACADAAQAKgCgMgEIAOADQAKACAPgBIgJADQAFgBAOACQAMACAKgEIACgKIgTAEIAegIQAFAAAAACQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAIgBALACIAFAAIAIgCIACAGIAPgGQgDAGAAACQABAEAPABIAVACIgHgHIAPAGQAJADAJgFIACAGQAHABADgEQACgDAJACIgFADQANABASgBIAbgCQAfgDAYAEIgBACQAQADAdgCIgFgBIAegBIACAEIAVgBIAAADQAZADAfgEIgGgCQAEAAAMgNQAFAAAGgCQAFgCAMACIgGADQAAAAAAAAQAAABAAAAQAAAAAAABQABAAAAABIAUgCIAMgEQgHADAEAEQAGAEAPACQASAAAagCQARgCAQACIAQAHQAJAAAGgDQAGgEAHACQASACgCgCQACgBAPABIAAgBIACAAQAPADATgBIATgCQADgDALABIAOADIAGgEQApAIBOABQAFACAcAAIgFgCQAtADAaAAIBIABIAKgCQgEABAFACIANACIA6AAIAAABIhzAAIAAACIAdADIAKgEQAVACAYAAIAhAAQAbABAFgDIADAAIgDAAIAAgBIA2AFIgYAAIAYADIAKAAIAFgCQADgBAIABIAZABIAOACIAbAAIAtADIgfgGIAqAAIAoAAIAAABIAFABIANgBIAKABQAJgBABgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAIAvAAQA0ADAKAAIgGgBIAHAAIgOgBIAuACQAEgBAaAAIAoABIAGABIgKAAIAbACIgCgBQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAABAAIAIABIAMABIAZAAIC0ABIgBABIAbgBIgBABIAHgBIAaABIAEgBIAMABIAqgBIhMADIgOABIhAACIgwACIAaAAIgOAAIhQABIgsABQgZADgHgBIAGAAIhtAEIg0ACIhBACIAeABIkAALQgvACgIgBIhiACIhgAEIhdAEQgxACgogBQhSABhiADQhaAChYAFIiyAIIi2AIIACgBIhEgCQgpAAgVAEQAAAAABAAQAAgBAAAAQgBAAAAgBQgBAAAAAAIgeACIAEAAQg6AAgqADQg3ACgsAIQgKgCgkABQgogBgIgCQhHgBhSADQhFABhdAEIimAJIimAJIgGgEQgJgDgNABIAAAKQgcgEgmABIhFAEIhBADQgnAAgYgHIgdANImOAWIgPgBIAAACQABACAJABIAIABIgDgEIAJADQADABAEgBIAAACQAFABACgCQABgBAAAAQABAAAAgBQABAAAAAAQABAAABABIgCACIAdgCQAQgCAMADIgBABIAXAAIgDgBIAQAAIABABIAKAAIAAABQAOABAOgBIgCgBQABAAAEgHIAGgBIAJAAQgBAAAAABQgBAAAAAAQAAABAAAAQAAAAABABIAIgBIAHgCQgKADAUADIAVgBQAIgBAIABIAJADQAFABADgCQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQALABgBgCIAGAAIACABIAKAAIAIgBIAJAAQADgCADABIAKACIABgDQATADAqABQAAABARgBIgEAAIAlABQARABARgBIAFAAIACAAIAGACIgdAAIACACIANAAIAFgBQAHABAPgBIAQAAQAQAAABgBIAAAAIAbACIgMAAIANABQACABADgCQAFgBANABIAIACIAPAAIAUABIgNgEIAnABIAEAAIAFAAIAFAAQAFAAABgBIAAgCIABABQAAgBAXABIAdAAQgGgBAGABIgBAAIARAAIAPAAIAVAAIACABIgDAAIAMAAQgCAAgBAAQgBAAAAAAQABAAACAAQABAAAEAAIBQAAQAVABAHgBIAAABIAOgBIABgBIAAABIANAAIABAAIACAAIADAAIAxgBIgxACIgWABIg2ACIAKAAIi/AIIANABIhMAEQhEAEgKgBIiPAHIgtABIhaADIhXAEIhZAFIhbAFIAAgBIggAAQgWAAgMACIAAgBIgOABIgxACQgWACgaAEQgFgBgTABQgRAAgFgBQg/gBhgAFIilALIgEgDIgCAAIgIAAIgCAFIgVgBIgOACQgwAKgJgEQgZAAgaAHIgSAFIgOAEIgOgCQgSgCgSAFIgUAIQgTAHgQgBQgQgBgdADIgyAHIAHACIlxApIAFgDQgBAAgGAEQgLAGAIgHIgpAFIAAABQgHACgGAEIgWAJIgHABIgMABIgEAAIgHgBQgDgCgGAAIgEAAIgDABIgHACIgEABIgEABQgGABAGgEQgVAGgWAEQgbAEgQABQggADgoAAIgKAAgAslBLIAEAAIACAAIAEAAQAFgCACgCIACABIACABQAEAAgEgDIAIACQAEACAIgBIgFABIAJABQAFABAGgDIAAgEIgHABIAOgEIhDgGIhPALQALgBACABQgBgCAIABQAIAAAAgCIACADIAhABIgBABQAAAAAAAAQAAAAABAAQAAABABAAQABAAABAAIAGgBIAGgDIgCAEQAEABACgCgArUBGIAHgCIgHAAgArlBDIABACQAGgCAEABQABAAABAAQAAAAABAAQAAAAABAAQAAAAABAAIgPgCIgBABgAnHh3QAxABAiAFIgDADIAHgEQAOgKgMAMIAgABIACgCIAOgFIAFgCQgIgBgJAAIgaAAIgaAAQghAAgoACgA0MiWIACgCIgBAAg");
	this.shape_4.setTransform(276.95,-2.0222);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.shape_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.2,-35.1,767.3000000000001,61.2);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Scene_1_UI = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// UI
	this.startbutton = new lib.StartBtn();
	this.startbutton.name = "startbutton";
	this.startbutton.setTransform(640.5,679,1,1,0,0,0,137.5,30);
	new cjs.ButtonHelper(this.startbutton, 0, 1, 2, false, new lib.StartBtn(), 3);

	this.instance = new lib.Chrome();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.startbutton}]}).to({state:[]},1).wait(179));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ShootingStar = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ShootingStar
	this.instance = new lib.Comet();
	this.instance.setTransform(1425.7,-62.95,1,1,-14.9983,0,0,273.6,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(130).to({_off:false},0).wait(1).to({regX:355.4,regY:-4.5,rotation:-14.9989,x:1479.35,y:-79.95,alpha:0.9796},0).wait(1).to({x:1455.3,y:-70.9,alpha:0.9592},0).wait(1).to({x:1431.25,y:-61.85,alpha:0.9388},0).wait(1).to({x:1407.15,y:-52.8,alpha:0.9184},0).wait(1).to({x:1383.1,y:-43.75,alpha:0.898},0).wait(1).to({x:1359.05,y:-34.7,alpha:0.8776},0).wait(1).to({x:1334.95,y:-25.7,alpha:0.8571},0).wait(1).to({x:1310.9,y:-16.65,alpha:0.8367},0).wait(1).to({x:1286.85,y:-7.6,alpha:0.8163},0).wait(1).to({x:1262.8,y:1.45,alpha:0.7959},0).wait(1).to({x:1238.7,y:10.5,alpha:0.7755},0).wait(1).to({x:1214.65,y:19.55,alpha:0.7551},0).wait(1).to({x:1190.6,y:28.55,alpha:0.7347},0).wait(1).to({x:1166.5,y:37.6,alpha:0.7143},0).wait(1).to({x:1142.45,y:46.65,alpha:0.6939},0).wait(1).to({x:1118.4,y:55.7,alpha:0.6735},0).wait(1).to({x:1094.35,y:64.75,alpha:0.6531},0).wait(1).to({x:1070.25,y:73.8,alpha:0.6327},0).wait(1).to({x:1046.2,y:82.8,alpha:0.6122},0).wait(1).to({x:1022.15,y:91.85,alpha:0.5918},0).wait(1).to({x:998.05,y:100.9,alpha:0.5714},0).wait(1).to({x:974,y:109.95,alpha:0.551},0).wait(1).to({x:949.95,y:119,alpha:0.5306},0).wait(1).to({x:925.9,y:128.05,alpha:0.5102},0).wait(1).to({x:901.8,y:137.05,alpha:0.4898},0).wait(1).to({x:877.75,y:146.1,alpha:0.4694},0).wait(1).to({x:853.7,y:155.15,alpha:0.449},0).wait(1).to({x:829.6,y:164.2,alpha:0.4286},0).wait(1).to({x:805.55,y:173.25,alpha:0.4082},0).wait(1).to({x:781.5,y:182.3,alpha:0.3878},0).wait(1).to({x:757.45,y:191.35,alpha:0.3673},0).wait(1).to({x:733.35,y:200.35,alpha:0.3469},0).wait(1).to({x:709.3,y:209.4,alpha:0.3265},0).wait(1).to({x:685.25,y:218.45,alpha:0.3061},0).wait(1).to({x:661.15,y:227.5,alpha:0.2857},0).wait(1).to({x:637.1,y:236.55,alpha:0.2653},0).wait(1).to({x:613.05,y:245.6,alpha:0.2449},0).wait(1).to({x:589,y:254.6,alpha:0.2245},0).wait(1).to({x:564.9,y:263.65,alpha:0.2041},0).wait(1).to({x:540.85,y:272.7,alpha:0.1837},0).wait(1).to({x:516.8,y:281.75,alpha:0.1633},0).wait(1).to({x:492.7,y:290.8,alpha:0.1429},0).wait(1).to({x:468.65,y:299.85,alpha:0.1224},0).wait(1).to({x:444.6,y:308.85,alpha:0.102},0).wait(1).to({x:420.55,y:317.9,alpha:0.0816},0).wait(1).to({x:396.45,y:326.95,alpha:0.0612},0).wait(1).to({x:372.4,y:336,alpha:0.0408},0).wait(1).to({x:348.35,y:345.05,alpha:0.0204},0).wait(1).to({x:324.3,y:354.1,alpha:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.PuppetShape_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.BMP_37950a7f_d357_42af_b9fa_25ef3191b743();
	this.instance_1.setTransform(-33.35,-27.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[]},1).wait(28));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.3,-27.6,696.3,121.19999999999999);


(lib.MoonSunSets = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Message
	this.instance = new lib.PuppetShape_1("synched",1,false);
	this.instance.setTransform(364.5,72,1,1,0,0,0,319.5,35);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,707.7,130.4);


(lib.Scene_1_Message = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Message
	this.instance = new lib.MoonSunSets("single",0);
	this.instance.setTransform(644.65,97.7,1,1,0,0,0,362.5,65.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.instance_1 = new lib.Tween1("single",0);
	this.instance_1.setTransform(644.65,97.75);

	this.instance_2 = new lib.Tween2("single",0);
	this.instance_2.setTransform(644.65,97.75);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween3_mc();
	this.instance_3.setTransform(-534.5,540.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},59).to({state:[{t:this.instance_1}]},30).to({state:[{t:this.instance_2}]},30).to({state:[{t:this.instance_3}]},60).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59).to({_off:false},0).to({_off:true,regX:0,regY:0,y:97.75,alpha:1},30).wait(91));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(119).to({_off:false},0).to({_off:true,x:-534.5,y:540.8,mode:"independent"},60).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.interactive = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,179];
	this.streamSoundSymbolsList[0] = [{id:"Gothic",startFrame:0,endFrame:180,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("Gothic",0);
		this.InsertIntoSoundStreamData(soundInstance,0,180,1);
		this.startbutton = this.UI.startbutton;
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.startbutton.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_1 = function() {
		this.startbutton = undefined;
	}
	this.frame_179 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(178).call(this.frame_179).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(656,307.05,0.647,0.647,0,0,0,0.4,0.4);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).to({regX:0.5,regY:0.5,scaleX:0.841,scaleY:0.841,x:614.05,y:340.7},65,cjs.Ease.sineOut).to({regX:0.6,scaleX:0.9391,scaleY:0.9391,x:614.1},55,cjs.Ease.sineOut).wait(1).to({regX:0,regY:0,scaleX:0.9302,scaleY:0.9302,x:607.7827,y:340.341},0).wait(1).to({scaleX:0.9213,scaleY:0.9213,x:601.9683,y:340.4328},0).wait(1).to({scaleX:0.9124,scaleY:0.9124,x:596.1092,y:340.5253},0).wait(1).to({scaleX:0.9033,scaleY:0.9033,x:590.208,y:340.6184},0).wait(1).to({scaleX:0.8942,scaleY:0.8942,x:584.268,y:340.7122},0).wait(1).to({scaleX:0.8851,scaleY:0.8851,x:578.2927,y:340.8065},0).wait(1).to({scaleX:0.8759,scaleY:0.8759,x:572.2863,y:340.9013},0).wait(1).to({scaleX:0.8666,scaleY:0.8666,x:566.2534,y:340.9965},0).wait(1).to({scaleX:0.8573,scaleY:0.8573,x:560.1992,y:341.0921},0).wait(1).to({scaleX:0.848,scaleY:0.848,x:554.1293,y:341.1879},0).wait(1).to({scaleX:0.8387,scaleY:0.8387,x:548.0503,y:341.2838},0).wait(1).to({scaleX:0.8294,scaleY:0.8294,x:541.969,y:341.3798},0).wait(1).to({scaleX:0.8201,scaleY:0.8201,x:535.893,y:341.4757},0).wait(1).to({scaleX:0.8108,scaleY:0.8108,x:529.8306,y:341.5714},0).wait(1).to({scaleX:0.8015,scaleY:0.8015,x:523.7903,y:341.6667},0).wait(1).to({scaleX:0.7923,scaleY:0.7923,x:517.7817,y:341.7616},0).wait(1).to({scaleX:0.7832,scaleY:0.7832,x:511.8145,y:341.8557},0).wait(1).to({scaleX:0.7741,scaleY:0.7741,x:505.8991,y:341.9491},0).wait(1).to({scaleX:0.7652,scaleY:0.7652,x:500.0461,y:342.0415},0).wait(1).to({scaleX:0.7563,scaleY:0.7563,x:494.2664,y:342.1327},0).wait(1).to({scaleX:0.7476,scaleY:0.7476,x:488.5711,y:342.2226},0).wait(1).to({scaleX:0.739,scaleY:0.739,x:482.9713,y:342.311},0).wait(1).to({scaleX:0.7306,scaleY:0.7306,x:477.4782,y:342.3977},0).wait(1).to({scaleX:0.7223,scaleY:0.7223,x:472.1024,y:342.4825},0).wait(1).to({scaleX:0.7143,scaleY:0.7143,x:466.8544,y:342.5654},0).wait(1).to({scaleX:0.7065,scaleY:0.7065,x:461.7442,y:342.646},0).wait(1).to({scaleX:0.6989,scaleY:0.6989,x:456.7808,y:342.7244},0).wait(1).to({scaleX:0.6915,scaleY:0.6915,x:451.973,y:342.8002},0).wait(1).to({scaleX:0.6844,scaleY:0.6844,x:447.3282,y:342.8736},0).wait(1).to({scaleX:0.6775,scaleY:0.6775,x:442.8533,y:342.9442},0).wait(1).to({scaleX:0.6709,scaleY:0.6709,x:438.5539,y:343.012},0).wait(1).to({scaleX:0.6646,scaleY:0.6646,x:434.4346,y:343.0771},0).wait(1).to({scaleX:0.6586,scaleY:0.6586,x:430.4993,y:343.1392},0).wait(1).to({scaleX:0.6528,scaleY:0.6528,x:426.7504,y:343.1983},0).wait(1).to({scaleX:0.6474,scaleY:0.6474,x:423.1897,y:343.2545},0).wait(1).to({scaleX:0.6422,scaleY:0.6422,x:419.8177,y:343.3078},0).wait(1).to({scaleX:0.6373,scaleY:0.6373,x:416.6343,y:343.358},0).wait(1).to({scaleX:0.6327,scaleY:0.6327,x:413.6386,y:343.4053},0).wait(1).to({scaleX:0.6284,scaleY:0.6284,x:410.8286,y:343.4496},0).wait(1).to({scaleX:0.6244,scaleY:0.6244,x:408.2022,y:343.4911},0).wait(1).to({scaleX:0.6207,scaleY:0.6207,x:405.7563,y:343.5297},0).wait(1).to({scaleX:0.6172,scaleY:0.6172,x:403.4875,y:343.5655},0).wait(1).to({scaleX:0.614,scaleY:0.614,x:401.3919,y:343.5986},0).wait(1).to({scaleX:0.611,scaleY:0.611,x:399.4654,y:343.629},0).wait(1).to({scaleX:0.6083,scaleY:0.6083,x:397.7035,y:343.6568},0).wait(1).to({scaleX:0.6059,scaleY:0.6059,x:396.1018,y:343.6821},0).wait(1).to({scaleX:0.6037,scaleY:0.6037,x:394.6554,y:343.7049},0).wait(1).to({scaleX:0.6017,scaleY:0.6017,x:393.3594,y:343.7254},0).wait(1).to({scaleX:0.5999,scaleY:0.5999,x:392.2091,y:343.7435},0).wait(1).to({scaleX:0.5984,scaleY:0.5984,x:391.1995,y:343.7595},0).wait(1).to({scaleX:0.597,scaleY:0.597,x:390.3259,y:343.7732},0).wait(1).to({scaleX:0.5959,scaleY:0.5959,x:389.5833,y:343.785},0).wait(1).to({scaleX:0.5949,scaleY:0.5949,x:388.9672,y:343.7947},0).wait(1).to({scaleX:0.5942,scaleY:0.5942,x:388.4728,y:343.8025},0).wait(1).to({scaleX:0.5936,scaleY:0.5936,x:388.0958,y:343.8084},0).wait(1).to({scaleX:0.5932,scaleY:0.5932,x:387.8316,y:343.8126},0).wait(1).to({regX:1.1,regY:1.2,scaleX:0.593,scaleY:0.593,x:388,y:344.1},0).to({regX:0.6,regY:0.6,scaleX:0.8321,scaleY:0.8321,x:614.05,y:340.8},1).wait(2));

	// UI_obj_
	this.UI = new lib.Scene_1_UI();
	this.UI.name = "UI";
	this.UI.setTransform(640,360,1,1,0,0,0,640,360);
	this.UI.depth = 0;
	this.UI.isAttachedToCamera = 1
	this.UI.isAttachedToMask = 0
	this.UI.layerDepth = 0
	this.UI.layerIndex = 0
	this.UI.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.UI).wait(180));

	// Message_obj_
	this.Message = new lib.Scene_1_Message();
	this.Message.name = "Message";
	this.Message.setTransform(0.1,0.1,1.5457,1.5457,0,0,0,241.7,73.9);
	this.Message.depth = 0;
	this.Message.isAttachedToCamera = 0
	this.Message.isAttachedToMask = 0
	this.Message.layerDepth = 0
	this.Message.layerIndex = 1
	this.Message.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Message).wait(59).to({regX:77.2,regY:37.9,scaleX:1.192,scaleY:1.192,x:0,y:0},0).to({regX:35.6,regY:15.2,scaleX:1.1073,scaleY:1.1073,x:-0.05,y:0.1},30).wait(30).to({regX:12.6,regY:2.1,scaleX:1.0649,scaleY:1.0649,x:0,y:0},0).to({regX:81,regY:40.7,scaleX:1.2018,scaleY:1.2018,x:0.05},60).wait(1));

	// ShootingStar_obj_
	this.ShootingStar = new lib.Scene_1_ShootingStar();
	this.ShootingStar.name = "ShootingStar";
	this.ShootingStar.setTransform(0.1,0.1,1.5457,1.5457,0,0,0,241.7,73.9);
	this.ShootingStar.depth = 0;
	this.ShootingStar.isAttachedToCamera = 0
	this.ShootingStar.isAttachedToMask = 0
	this.ShootingStar.layerDepth = 0
	this.ShootingStar.layerIndex = 2
	this.ShootingStar.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ShootingStar).wait(130).to({regX:11.3,regY:35.9,scaleX:1.1792,scaleY:1.1792,x:-0.1},0).wait(1).to({regX:913.9,regY:132.5,scaleX:1,scaleY:1,x:902.55,y:96.7},0).wait(49));

	// Detail_obj_
	this.Detail = new lib.Scene_1_Detail();
	this.Detail.name = "Detail";
	this.Detail.setTransform(653.8,645.25,1.5457,1.5457,0,0,0,664.6,491.3);
	this.Detail.depth = 0;
	this.Detail.isAttachedToCamera = 0
	this.Detail.isAttachedToMask = 0
	this.Detail.layerDepth = 0
	this.Detail.layerIndex = 3
	this.Detail.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Detail).wait(1).to({regX:663.6,regY:493.4,scaleX:1.5346,scaleY:1.5346,x:653.65,y:645.2},0).wait(1).to({regX:662.6,regY:495.6,scaleX:1.5237,scaleY:1.5237},0).wait(1).to({regX:661.7,regY:497.8,scaleX:1.5129,scaleY:1.5129,x:653.7,y:645.35},0).wait(1).to({regX:660.8,regY:499.9,scaleX:1.5022,scaleY:1.5022,x:653.75,y:645.3},0).wait(1).to({regX:659.8,regY:502,scaleX:1.4918,scaleY:1.4918,x:653.7,y:645.2},0).wait(1).to({regX:658.9,regY:504.1,scaleX:1.4815,scaleY:1.4815,x:653.75,y:645.25},0).wait(1).to({regX:657.9,regY:506.2,scaleX:1.4714,scaleY:1.4714,x:653.7},0).wait(1).to({regX:657,regY:508.4,scaleX:1.4615,scaleY:1.4615,x:653.65,y:645.3},0).wait(1).to({regX:656.1,regY:510.4,scaleX:1.4518,scaleY:1.4518,x:653.75,y:645.2},0).wait(1).to({regX:655.1,regY:512.5,scaleX:1.4422,scaleY:1.4422,x:653.7},0).wait(1).to({regX:654.2,regY:514.7,scaleX:1.4328,scaleY:1.4328,y:645.25},0).wait(1).to({regX:653.4,regY:516.6,scaleX:1.4236,scaleY:1.4236,x:653.8,y:645.15},0).wait(1).to({regX:652.4,regY:518.8,scaleX:1.4146,scaleY:1.4146,x:653.7,y:645.35},0).wait(1).to({regX:651.6,regY:520.8,scaleX:1.4058,scaleY:1.4058,x:653.8,y:645.3},0).wait(1).to({regX:650.6,regY:522.9,scaleX:1.3971,scaleY:1.3971,x:653.7},0).wait(1).to({regX:649.7,regY:524.8,scaleX:1.3887,scaleY:1.3887,x:653.65,y:645.25},0).wait(1).to({regX:648.8,regY:526.8,scaleX:1.3804,scaleY:1.3804},0).wait(1).to({regX:648,regY:528.7,scaleX:1.3723,scaleY:1.3723,x:653.8,y:645.2},0).wait(1).to({regX:647.1,regY:530.6,scaleX:1.3644,scaleY:1.3644,x:653.65,y:645.15},0).wait(1).to({regX:646.2,regY:532.6,scaleX:1.3566,scaleY:1.3566,y:645.25},0).wait(1).to({regX:645.5,regY:534.5,scaleX:1.3491,scaleY:1.3491,x:653.8,y:645.3},0).wait(1).to({regX:644.6,regY:536.4,scaleX:1.3417,scaleY:1.3417,x:653.7,y:645.35},0).wait(1).to({regX:643.8,regY:538.1,scaleX:1.3345,scaleY:1.3345,y:645.15},0).wait(1).to({regX:643,regY:540,scaleX:1.3275,scaleY:1.3275,x:653.75,y:645.25},0).wait(1).to({regX:642.2,regY:541.8,scaleX:1.3207,scaleY:1.3207,x:653.7,y:645.3},0).wait(1).to({regX:641.4,regY:543.6,scaleX:1.3141,scaleY:1.3141,y:645.25},0).wait(1).to({regX:640.7,regY:545.2,scaleX:1.3076,scaleY:1.3076,y:645.2},0).wait(1).to({regX:640,regY:546.9,scaleX:1.3013,scaleY:1.3013,x:653.8,y:645.25},0).wait(1).to({regX:639.1,regY:548.6,scaleX:1.2952,scaleY:1.2952,x:653.65},0).wait(1).to({regX:638.5,regY:550.2,scaleX:1.2893,scaleY:1.2893,x:653.75},0).wait(1).to({regX:637.8,regY:551.8,scaleX:1.2836,scaleY:1.2836},0).wait(1).to({regX:637.1,regY:553.4,scaleX:1.278,scaleY:1.278},0).wait(1).to({regX:636.4,regY:555,scaleX:1.2726,scaleY:1.2726,x:653.65,y:645.35},0).wait(1).to({regX:635.8,regY:556.4,scaleX:1.2674,scaleY:1.2674,x:653.8,y:645.25},0).wait(1).to({regX:635,regY:557.9,scaleX:1.2623,scaleY:1.2623,x:653.65,y:645.3},0).wait(1).to({regX:634.5,regY:559.2,scaleX:1.2574,scaleY:1.2574,x:653.75,y:645.2},0).wait(1).to({regX:633.9,regY:560.6,scaleX:1.2528,scaleY:1.2528},0).wait(1).to({regX:633.2,regY:561.9,scaleX:1.2482,scaleY:1.2482,x:653.65},0).wait(1).to({regX:632.6,regY:563.2,scaleX:1.2439,scaleY:1.2439},0).wait(1).to({regX:632.1,regY:564.5,scaleX:1.2397,scaleY:1.2397,y:645.3},0).wait(1).to({regX:631.6,regY:565.6,scaleX:1.2357,scaleY:1.2357,x:653.75,y:645.15},0).wait(1).to({regX:631.1,regY:566.9,scaleX:1.2318,scaleY:1.2318,x:653.7,y:645.3},0).wait(1).to({regX:630.6,regY:567.9,scaleX:1.2282,scaleY:1.2282,x:653.65,y:645.2},0).wait(1).to({regX:630.1,regY:569,scaleX:1.2247,scaleY:1.2247,x:653.6,y:645.25},0).wait(1).to({regX:629.7,regY:570,scaleX:1.2214,scaleY:1.2214,x:653.7,y:645.2},0).wait(1).to({regX:629.2,regY:571,scaleX:1.2182,scaleY:1.2182,x:653.6,y:645.3},0).wait(1).to({regX:628.9,regY:571.9,scaleX:1.2152,scaleY:1.2152,x:653.75,y:645.25},0).wait(1).to({regX:628.5,regY:572.8,scaleX:1.2123,scaleY:1.2123},0).wait(1).to({regX:628.1,regY:573.6,scaleX:1.2097,scaleY:1.2097},0).wait(1).to({regX:627.8,regY:574.4,scaleX:1.2072,scaleY:1.2072},0).wait(1).to({regX:627.5,regY:575.1,scaleX:1.2048,scaleY:1.2048,y:645.2},0).wait(1).to({regX:627.1,regY:575.9,scaleX:1.2026,scaleY:1.2026,x:653.7,y:645.3},0).wait(1).to({regX:626.9,regY:576.5,scaleX:1.2006,scaleY:1.2006,x:653.8,y:645.25},0).wait(1).to({regX:626.6,regY:577.1,scaleX:1.1988,scaleY:1.1988,x:653.75,y:645.3},0).wait(1).to({regX:626.3,regY:577.6,scaleX:1.1971,scaleY:1.1971,x:653.7,y:645.25},0).wait(1).to({regX:626.1,regY:578.1,scaleX:1.1956,scaleY:1.1956,x:653.65},0).wait(1).to({regX:626,regY:578.5,scaleX:1.1942,scaleY:1.1942,x:653.75},0).wait(1).to({regX:625.8,regY:578.9,scaleX:1.193,scaleY:1.193,x:653.8},0).wait(122));

	// Ground_obj_
	this.Ground = new lib.Scene_1_Ground();
	this.Ground.name = "Ground";
	this.Ground.setTransform(639.85,629.95,1.5457,1.5457,0,0,0,655.6,481.4);
	this.Ground.depth = 0;
	this.Ground.isAttachedToCamera = 0
	this.Ground.isAttachedToMask = 0
	this.Ground.layerDepth = 0
	this.Ground.layerIndex = 4
	this.Ground.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Ground).wait(5).to({regX:650.6,regY:491.8,scaleX:1.4918,scaleY:1.4918,x:640,y:630},0).wait(9).to({regX:641.8,regY:509.9,scaleX:1.4058,scaleY:1.4058,x:640.05,y:629.95},0).wait(166));

	// Mountains_obj_
	this.Mountains = new lib.Scene_1_Mountains();
	this.Mountains.name = "Mountains";
	this.Mountains.setTransform(646.05,481.25,1.5457,1.5457,0,0,0,659.6,385.2);
	this.Mountains.depth = 0;
	this.Mountains.isAttachedToCamera = 0
	this.Mountains.isAttachedToMask = 0
	this.Mountains.layerDepth = 0
	this.Mountains.layerIndex = 5
	this.Mountains.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Mountains).wait(5).to({regX:654.6,regY:392.2,scaleX:1.4918,scaleY:1.4918,x:645.95,y:481.4},0).wait(9).to({regX:646.1,regY:404.2,scaleX:1.4058,scaleY:1.4058,x:646.05,y:481.35},0).wait(166));

	// Sun_obj_
	this.Sun = new lib.Scene_1_Sun();
	this.Sun.name = "Sun";
	this.Sun.setTransform(975.45,169.95,1.5457,1.5457,0,0,0,872.7,183.8);
	this.Sun.depth = 0;
	this.Sun.isAttachedToCamera = 0
	this.Sun.isAttachedToMask = 0
	this.Sun.layerDepth = 0
	this.Sun.layerIndex = 6
	this.Sun.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Sun).wait(1).to({regX:873.3,scaleX:1.5346,scaleY:1.5346,y:170.1},0).wait(1).to({regX:873.8,regY:183.7,scaleX:1.5237,scaleY:1.5237,y:170},0).wait(1).to({regX:874.4,regY:183.6,scaleX:1.5129,scaleY:1.5129,x:975.5},0).wait(1).to({regX:875,regY:183.5,scaleX:1.5022,scaleY:1.5022,x:975.55},0).wait(1).to({regX:875.5,scaleX:1.4918,scaleY:1.4918,x:975.5,y:170.1},0).wait(1).to({regX:876.1,regY:183.3,scaleX:1.4815,scaleY:1.4815,y:169.95},0).wait(1).to({regX:876.6,regY:183.2,scaleX:1.4714,scaleY:1.4714},0).wait(1).to({regX:877.1,scaleX:1.4615,scaleY:1.4615,x:975.35,y:170},0).wait(1).to({regX:877.7,regY:183.1,scaleX:1.4518,scaleY:1.4518,x:975.45},0).wait(1).to({regX:878.2,regY:183,scaleX:1.4422,scaleY:1.4422},0).wait(1).to({regX:878.8,scaleX:1.4328,scaleY:1.4328,x:975.5},0).wait(1).to({regX:879.4,regY:182.8,scaleX:1.4236,scaleY:1.4236,x:975.55,y:169.95},0).wait(1).to({regX:879.9,scaleX:1.4146,scaleY:1.4146,x:975.5,y:170.05},0).wait(1).to({regX:880.4,regY:182.7,scaleX:1.4058,scaleY:1.4058,x:975.45,y:170},0).wait(1).to({regX:880.9,scaleX:1.3971,scaleY:1.3971,x:975.5},0).wait(1).to({regX:881.4,regY:182.6,scaleX:1.3887,scaleY:1.3887,x:975.45},0).wait(1).to({regX:881.9,regY:182.5,scaleX:1.3804,scaleY:1.3804},0).wait(1).to({regX:882.4,regY:182.4,scaleX:1.3723,scaleY:1.3723},0).wait(1).to({regX:883,regY:182.3,scaleX:1.3644,scaleY:1.3644,x:975.5,y:169.95},0).wait(1).to({regX:883.4,scaleX:1.3566,scaleY:1.3566,x:975.45,y:170},0).wait(1).to({regX:884,regY:182.2,scaleX:1.3491,scaleY:1.3491,x:975.55},0).wait(1).to({regX:884.4,regY:182.1,scaleX:1.3417,scaleY:1.3417,x:975.45,y:169.95},0).wait(1).to({regX:884.9,scaleX:1.3345,scaleY:1.3345,y:170.05},0).wait(1).to({regX:885.4,regY:182,scaleX:1.3275,scaleY:1.3275,x:975.55,y:170},0).wait(1).to({regX:885.8,regY:181.9,scaleX:1.3207,scaleY:1.3207,x:975.4},0).wait(1).to({regX:886.2,scaleX:1.3141,scaleY:1.3141,x:975.35},0).wait(1).to({regX:886.8,regY:181.8,scaleX:1.3076,scaleY:1.3076,x:975.5},0).wait(1).to({regX:887.2,regY:181.7,scaleX:1.3013,scaleY:1.3013},0).wait(1).to({regX:887.6,scaleX:1.2952,scaleY:1.2952,x:975.55,y:170.05},0).wait(1).to({regX:888,regY:181.6,scaleX:1.2893,scaleY:1.2893,x:975.45},0).wait(1).to({regX:888.5,scaleX:1.2836,scaleY:1.2836,x:975.55,y:170.1},0).wait(1).to({regX:888.9,regY:181.5,scaleX:1.278,scaleY:1.278,x:975.5,y:170},0).wait(1).to({regX:889.2,scaleX:1.2726,scaleY:1.2726,x:975.4},0).wait(1).to({regX:889.6,regY:181.4,scaleX:1.2674,scaleY:1.2674,x:975.45},0).wait(1).to({regX:889.9,regY:181.3,scaleX:1.2623,scaleY:1.2623,x:975.4,y:169.9},0).wait(1).to({regX:890.4,scaleX:1.2574,scaleY:1.2574,x:975.55,y:170.05},0).wait(1).to({regX:890.7,scaleX:1.2528,scaleY:1.2528,x:975.45},0).wait(1).to({regX:891,regY:181.2,scaleX:1.2482,scaleY:1.2482},0).wait(1).to({regX:891.3,scaleX:1.2439,scaleY:1.2439,x:975.4},0).wait(1).to({regX:891.6,regY:181.1,scaleX:1.2397,scaleY:1.2397,x:975.35,y:170},0).wait(1).to({regX:892,scaleX:1.2357,scaleY:1.2357,x:975.5,y:170.05},0).wait(1).to({regX:892.3,scaleX:1.2318,scaleY:1.2318,x:975.45,y:170.1},0).wait(1).to({regX:892.6,regY:181,scaleX:1.2282,scaleY:1.2282,x:975.4,y:170.05},0).wait(1).to({regX:892.9,scaleX:1.2247,scaleY:1.2247,x:975.45},0).wait(1).to({regX:893.1,regY:180.9,scaleX:1.2214,scaleY:1.2214,x:975.4,y:170},0).wait(1).to({regX:893.4,regY:180.8,scaleX:1.2182,scaleY:1.2182,x:975.45,y:169.95},0).wait(1).to({regX:893.6,scaleX:1.2152,scaleY:1.2152,x:975.4,y:170},0).wait(1).to({regX:893.9,scaleX:1.2123,scaleY:1.2123,x:975.5},0).wait(1).to({regX:894.1,scaleX:1.2097,scaleY:1.2097,x:975.55,y:170.05},0).wait(1).to({regX:894.3,regY:180.7,scaleX:1.2072,scaleY:1.2072,x:975.45,y:170},0).wait(1).to({regX:894.5,scaleX:1.2048,scaleY:1.2048},0).wait(1).to({regX:894.6,scaleX:1.2026,scaleY:1.2026},0).wait(1).to({regX:894.8,scaleX:1.2006,scaleY:1.2006,y:170.05},0).wait(1).to({regX:895,regY:180.6,scaleX:1.1988,scaleY:1.1988,x:975.5,y:170},0).wait(1).to({regX:895.1,scaleX:1.1971,scaleY:1.1971},0).wait(1).to({regX:895.2,scaleX:1.1956,scaleY:1.1956,x:975.4},0).wait(1).to({regX:895.4,scaleX:1.1942,scaleY:1.1942,x:975.5,y:170.05},0).wait(1).to({regX:895.5,regY:180.5,scaleX:1.193,scaleY:1.193,x:975.55,y:170},0).wait(1).to({regX:895.6,regY:180.6,scaleX:1.192,scaleY:1.192,y:170.05},0).wait(1).to({regY:180.5,scaleX:1.1911,scaleY:1.1911,x:975.5,y:170},0).wait(1).to({scaleX:1.1903,scaleY:1.1903,x:975.35},0).wait(1).to({scaleX:1.1898,scaleY:1.1898,x:975.4},0).wait(1).to({regX:895.7,scaleX:1.1894,scaleY:1.1894,x:975.45},0).wait(1).to({regX:895.8,scaleX:1.1892,scaleY:1.1892,x:975.5},0).wait(1).to({regX:895.6,scaleX:1.1891,scaleY:1.1891,x:975.4,y:170.1},0).wait(1).to({regX:896.6,regY:180,scaleX:1.1851,scaleY:1.1851,x:975.45,y:170.05},0).wait(1).to({regX:897.6,regY:179.3,scaleX:1.1812,scaleY:1.1812,x:975.4,y:169.95},0).wait(1).to({regX:898.6,regY:178.9,scaleX:1.1773,scaleY:1.1773,x:975.5,y:170},0).wait(1).to({regX:899.5,regY:178.3,scaleX:1.1735,scaleY:1.1735},0).wait(1).to({regX:900.4,regY:177.8,scaleX:1.1696,scaleY:1.1696,x:975.45,y:169.95},0).wait(1).to({regX:901.2,regY:177.2,scaleX:1.1659,scaleY:1.1659,x:975.35},0).wait(1).to({regX:902.2,regY:176.8,scaleX:1.1622,scaleY:1.1622,x:975.4,y:170.05},0).wait(1).to({regX:903.1,regY:176.2,scaleX:1.1585,scaleY:1.1585,y:169.95},0).wait(1).to({regX:904.1,regY:175.8,scaleX:1.1548,scaleY:1.1548,x:975.5,y:170.05},0).wait(1).to({regX:905,regY:175.2,scaleX:1.1513,scaleY:1.1513,y:170},0).wait(1).to({regX:905.9,regY:174.7,scaleX:1.1477,scaleY:1.1477},0).wait(1).to({regX:906.8,regY:174.2,scaleX:1.1442,scaleY:1.1442,y:169.95},0).wait(1).to({regX:907.6,regY:173.7,scaleX:1.1408,scaleY:1.1408,x:975.4,y:170.05},0).wait(1).to({regX:908.6,regY:173.2,scaleX:1.1374,scaleY:1.1374,x:975.5,y:170},0).wait(1).to({regX:909.4,regY:172.8,scaleX:1.1341,scaleY:1.1341,x:975.45,y:170.1},0).wait(1).to({regX:910.2,regY:172.2,scaleX:1.1309,scaleY:1.1309,y:170},0).wait(1).to({regX:911.1,regY:171.7,scaleX:1.1277,scaleY:1.1277,x:975.5,y:169.95},0).wait(1).to({regX:911.9,regY:171.2,scaleX:1.1246,scaleY:1.1246},0).wait(1).to({regX:912.6,regY:170.8,scaleX:1.1216,scaleY:1.1216,x:975.35,y:170},0).wait(1).to({regX:913.5,regY:170.3,scaleX:1.1185,scaleY:1.1185,x:975.45,y:169.95},0).wait(1).to({regX:914.3,regY:169.9,scaleX:1.1156,scaleY:1.1156,y:170},0).wait(1).to({regX:915,regY:169.5,scaleX:1.1128,scaleY:1.1128},0).wait(1).to({regX:915.8,regY:169,scaleX:1.11,scaleY:1.11},0).wait(1).to({regX:916.6,regY:168.7,scaleX:1.1073,scaleY:1.1073,x:975.5,y:170.05},0).wait(1).to({regX:917.2,regY:168.2,scaleX:1.1047,scaleY:1.1047,x:975.45,y:169.95},0).wait(1).to({regX:917.9,regY:167.8,scaleX:1.1022,scaleY:1.1022,x:975.4,y:170},0).wait(1).to({regX:918.6,regY:167.4,scaleX:1.0997,scaleY:1.0997},0).wait(1).to({regX:919.3,regY:167.1,scaleX:1.0973,scaleY:1.0973,x:975.45,y:170.05},0).wait(1).to({regX:919.9,regY:166.7,scaleX:1.095,scaleY:1.095},0).wait(1).to({regX:920.5,regY:166.3,scaleX:1.0928,scaleY:1.0928,y:169.95},0).wait(1).to({regX:921.1,regY:166,scaleX:1.0906,scaleY:1.0906,x:975.35,y:170},0).wait(1).to({regX:921.7,regY:165.7,scaleX:1.0886,scaleY:1.0886,x:975.4,y:170.05},0).wait(1).to({regX:922.3,regY:165.3,scaleX:1.0865,scaleY:1.0865,y:169.95},0).wait(1).to({regX:922.9,regY:165.1,scaleX:1.0847,scaleY:1.0847,x:975.5,y:170},0).wait(1).to({regX:923.3,regY:164.7,scaleX:1.0828,scaleY:1.0828,x:975.45},0).wait(1).to({regX:923.9,regY:164.4,scaleX:1.0811,scaleY:1.0811},0).wait(1).to({regX:924.3,regY:164.2,scaleX:1.0795,scaleY:1.0795,x:975.4},0).wait(1).to({regX:924.8,regY:164,scaleX:1.0779,scaleY:1.0779,x:975.5,y:170.1},0).wait(1).to({regX:925.2,regY:163.7,scaleX:1.0764,scaleY:1.0764,x:975.45,y:170},0).wait(1).to({regX:925.6,regY:163.5,scaleX:1.075,scaleY:1.075,x:975.5},0).wait(1).to({regX:926,regY:163.2,scaleX:1.0737,scaleY:1.0737,y:169.95},0).wait(1).to({regX:926.3,regY:163.1,scaleX:1.0725,scaleY:1.0725,x:975.4,y:170.1},0).wait(1).to({regX:926.6,regY:162.8,scaleX:1.0714,scaleY:1.0714,y:169.95},0).wait(1).to({regX:927,regY:162.7,scaleX:1.0704,scaleY:1.0704,x:975.5,y:170},0).wait(1).to({regX:927.2,regY:162.5,scaleX:1.0694,scaleY:1.0694,x:975.45},0).wait(1).to({regX:927.5,regY:162.3,scaleX:1.0686,scaleY:1.0686,y:169.95},0).wait(1).to({regX:927.7,scaleX:1.0678,scaleY:1.0678,y:170},0).wait(1).to({regX:928,regY:162.1,scaleX:1.0671,scaleY:1.0671,x:975.5},0).wait(1).to({regX:928.1,scaleX:1.0665,scaleY:1.0665,x:975.45,y:170.05},0).wait(1).to({regX:928.2,regY:162,scaleX:1.066,scaleY:1.066,x:975.4},0).wait(1).to({regX:928.3,regY:161.9,scaleX:1.0656,scaleY:1.0656,x:975.45,y:170},0).wait(1).to({regX:928.4,scaleX:1.0653,scaleY:1.0653},0).wait(1).to({regX:928.5,regY:161.8,scaleX:1.0651,scaleY:1.0651,y:170.05},0).wait(1).to({regX:928.6,scaleX:1.0649,scaleY:1.0649,x:975.5},0).wait(1).to({regX:928.5,regY:161.7,x:975.45,y:170},0).wait(1).to({regX:919.8,regY:163.6,scaleX:1.075,scaleY:1.075},0).wait(1).to({regX:911,regY:165.3,scaleX:1.0854,scaleY:1.0854},0).wait(1).to({regX:902.1,regY:167.1,scaleX:1.0961,scaleY:1.0961},0).wait(1).to({regX:893.2,regY:168.9,scaleX:1.107,scaleY:1.107},0).wait(1).to({regX:884.2,regY:170.8,scaleX:1.1183,scaleY:1.1183,y:170.05},0).wait(1).to({regX:875.1,regY:172.7,scaleX:1.1299,scaleY:1.1299,x:975.4,y:170.1},0).wait(1).to({regX:866.1,regY:174.4,scaleX:1.1418,scaleY:1.1418,x:975.5,y:169.95},0).wait(1).to({regX:856.9,regY:176.2,scaleX:1.1539,scaleY:1.1539,x:975.45,y:169.9},0).wait(1).to({regX:847.8,regY:178.2,scaleX:1.1664,scaleY:1.1664,x:975.5,y:170},0).wait(1).to({regX:838.6,regY:180,scaleX:1.1792,scaleY:1.1792},0).wait(1).to({regX:829.4,regY:181.9,scaleX:1.1923,scaleY:1.1923,x:975.45},0).wait(1).to({regX:820.1,regY:183.7,scaleX:1.2057,scaleY:1.2057},0).wait(1).to({regX:811,regY:185.6,scaleX:1.2194,scaleY:1.2194,x:975.5},0).wait(47));

	// Stars_Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EiafgIqIAAgQME0/AAAIAAAQg");
	var mask_graphics_1 = new cjs.Graphics().p("EiafgIqIAAgQME0/AAAIAAAQg");
	var mask_graphics_2 = new cjs.Graphics().p("EiafgIqIAAgQME0/AAAIAAAQg");
	var mask_graphics_3 = new cjs.Graphics().p("EiafAAIIAAgPME0/AAAIAAAPg");
	var mask_graphics_4 = new cjs.Graphics().p("EiafAAIIAAgQME0/AAAIAAAQg");
	var mask_graphics_5 = new cjs.Graphics().p("EiafAAJIAAgRME0/AAAIAAARg");
	var mask_graphics_6 = new cjs.Graphics().p("EiafAALIAAgVME0/AAAIAAAVg");
	var mask_graphics_7 = new cjs.Graphics().p("EiafAAMIAAgXME0/AAAIAAAXg");
	var mask_graphics_8 = new cjs.Graphics().p("EiafAAOIAAgbME0/AAAIAAAbg");
	var mask_graphics_9 = new cjs.Graphics().p("EiafAAQIAAgfME0/AAAIAAAfg");
	var mask_graphics_10 = new cjs.Graphics().p("EiafAATIAAglME0/AAAIAAAlg");
	var mask_graphics_11 = new cjs.Graphics().p("EiafAAWIAAgrME0/AAAIAAArg");
	var mask_graphics_12 = new cjs.Graphics().p("EiafAAaIAAgzME0/AAAIAAAzg");
	var mask_graphics_13 = new cjs.Graphics().p("EiafAAdIAAg5ME0/AAAIAAA5g");
	var mask_graphics_14 = new cjs.Graphics().p("EiafAAhIAAhBME0/AAAIAABBg");
	var mask_graphics_15 = new cjs.Graphics().p("EiafAAmIAAhLME0/AAAIAABLg");
	var mask_graphics_16 = new cjs.Graphics().p("EiafAArIAAhVME0/AAAIAABVg");
	var mask_graphics_17 = new cjs.Graphics().p("EiafAAwIAAhfME0/AAAIAABfg");
	var mask_graphics_18 = new cjs.Graphics().p("EiafAA1IAAhpME0/AAAIAABpg");
	var mask_graphics_19 = new cjs.Graphics().p("EiafAA7IAAh1ME0/AAAIAAB1g");
	var mask_graphics_20 = new cjs.Graphics().p("EiafABBIAAiBME0/AAAIAACBg");
	var mask_graphics_21 = new cjs.Graphics().p("EiafABIIAAiPME0/AAAIAACPg");
	var mask_graphics_22 = new cjs.Graphics().p("EiafABPIAAidME0/AAAIAACdg");
	var mask_graphics_23 = new cjs.Graphics().p("EiafABWIAAirME0/AAAIAACrg");
	var mask_graphics_24 = new cjs.Graphics().p("EiafABdIAAi6ME0/AAAIAAC6g");
	var mask_graphics_25 = new cjs.Graphics().p("EiafABmIAAjLME0/AAAIAADLg");
	var mask_graphics_26 = new cjs.Graphics().p("EiafABuIAAjbME0/AAAIAADbg");
	var mask_graphics_27 = new cjs.Graphics().p("EiafAB3IAAjtME0/AAAIAADtg");
	var mask_graphics_28 = new cjs.Graphics().p("EiafACAIAAj/ME0/AAAIAAD/g");
	var mask_graphics_29 = new cjs.Graphics().p("EiafACJIAAkRME0/AAAIAAERg");
	var mask_graphics_30 = new cjs.Graphics().p("EiafACTIAAklME0/AAAIAAElg");
	var mask_graphics_31 = new cjs.Graphics().p("EiafACdIAAk5ME0/AAAIAAE5g");
	var mask_graphics_32 = new cjs.Graphics().p("EiafACnIAAlNME0/AAAIAAFNg");
	var mask_graphics_33 = new cjs.Graphics().p("EiafACyIAAljME0/AAAIAAFjg");
	var mask_graphics_34 = new cjs.Graphics().p("EiafAC9IAAl5ME0/AAAIAAF5g");
	var mask_graphics_35 = new cjs.Graphics().p("EiafADJIAAmRME0/AAAIAAGRg");
	var mask_graphics_36 = new cjs.Graphics().p("EiafADVIAAmpME0/AAAIAAGpg");
	var mask_graphics_37 = new cjs.Graphics().p("EiafADhIAAnBME0/AAAIAAHBg");
	var mask_graphics_38 = new cjs.Graphics().p("EiafADuIAAnbME0/AAAIAAHbg");
	var mask_graphics_39 = new cjs.Graphics().p("EiafAD7IAAn1ME0/AAAIAAH1g");
	var mask_graphics_40 = new cjs.Graphics().p("EiafAEIIAAoPME0/AAAIAAIPg");
	var mask_graphics_41 = new cjs.Graphics().p("EiafAEWIAAorME0/AAAIAAIrg");
	var mask_graphics_42 = new cjs.Graphics().p("EiafAEjIAApFME0/AAAIAAJFg");
	var mask_graphics_43 = new cjs.Graphics().p("EiafAEyIAApjME0/AAAIAAJjg");
	var mask_graphics_44 = new cjs.Graphics().p("EiafAFBIAAqBME0/AAAIAAKBg");
	var mask_graphics_45 = new cjs.Graphics().p("EiafAFQIAAqfME0/AAAIAAKfg");
	var mask_graphics_46 = new cjs.Graphics().p("EiafAFfIAAq9ME0/AAAIAAK9g");
	var mask_graphics_47 = new cjs.Graphics().p("EiafAFvIAArdME0/AAAIAALdg");
	var mask_graphics_48 = new cjs.Graphics().p("EiafAF/IAAr9ME0/AAAIAAL9g");
	var mask_graphics_49 = new cjs.Graphics().p("EiafAGPIAAseME0/AAAIAAMeg");
	var mask_graphics_50 = new cjs.Graphics().p("EiafAGhIAAtBME0/AAAIAANBg");
	var mask_graphics_51 = new cjs.Graphics().p("EiafAGyIAAtjME0/AAAIAANjg");
	var mask_graphics_52 = new cjs.Graphics().p("EiafAHDIAAuFME0/AAAIAAOFg");
	var mask_graphics_53 = new cjs.Graphics().p("EiafAHVIAAupME0/AAAIAAOpg");
	var mask_graphics_54 = new cjs.Graphics().p("EiafAHnIAAvNME0/AAAIAAPNg");
	var mask_graphics_55 = new cjs.Graphics().p("EiafAH6IAAvzME0/AAAIAAPzg");
	var mask_graphics_56 = new cjs.Graphics().p("EiafAINIAAwZME0/AAAIAAQZg");
	var mask_graphics_57 = new cjs.Graphics().p("EiafAIgIAAxAME0/AAAIAARAg");
	var mask_graphics_58 = new cjs.Graphics().p("EiafAI0IAAxnME0/AAAIAARng");
	var mask_graphics_59 = new cjs.Graphics().p("EiafAJIIAAyPME0/AAAIAASPg");
	var mask_graphics_60 = new cjs.Graphics().p("EiafAJcIAAy3ME0/AAAIAAS3g");
	var mask_graphics_61 = new cjs.Graphics().p("EiafAJxIAAzhME0/AAAIAAThg");
	var mask_graphics_62 = new cjs.Graphics().p("EiafAKHIAA0NME0/AAAIAAUNg");
	var mask_graphics_63 = new cjs.Graphics().p("EiafAKcIAA03ME0/AAAIAAU3g");
	var mask_graphics_64 = new cjs.Graphics().p("EiafAKyIAA1jME0/AAAIAAVjg");
	var mask_graphics_65 = new cjs.Graphics().p("Eh21AIkIAAxHMDtrAAAIAARHg");
	var mask_graphics_66 = new cjs.Graphics().p("Eh21AI1IAAxpMDtrAAAIAARpg");
	var mask_graphics_67 = new cjs.Graphics().p("Eh21AJHIAAyNMDtrAAAIAASNg");
	var mask_graphics_68 = new cjs.Graphics().p("Eh21AJYIAAywMDtrAAAIAASwg");
	var mask_graphics_69 = new cjs.Graphics().p("Eh21AJqIAAzUMDtrAAAIAATUg");
	var mask_graphics_70 = new cjs.Graphics().p("Eh21AJ9IAAz5MDtrAAAIAAT5g");
	var mask_graphics_71 = new cjs.Graphics().p("Eh21AKQIAA0fMDtrAAAIAAUfg");
	var mask_graphics_72 = new cjs.Graphics().p("Eh21AKjIAA1FMDtrAAAIAAVFg");
	var mask_graphics_73 = new cjs.Graphics().p("Eh21AK2IAA1rMDtrAAAIAAVrg");
	var mask_graphics_74 = new cjs.Graphics().p("Eh21ALKIAA2TMDtrAAAIAAWTg");
	var mask_graphics_75 = new cjs.Graphics().p("Eh21ALdIAA25MDtrAAAIAAW5g");
	var mask_graphics_76 = new cjs.Graphics().p("Eh21ALxIAA3hMDtrAAAIAAXhg");
	var mask_graphics_77 = new cjs.Graphics().p("Eh21AMGIAA4LMDtrAAAIAAYLg");
	var mask_graphics_78 = new cjs.Graphics().p("Eh21AMaIAA4zMDtrAAAIAAYzg");
	var mask_graphics_79 = new cjs.Graphics().p("Eh21AMvIAA5dMDtrAAAIAAZdg");
	var mask_graphics_80 = new cjs.Graphics().p("Eh21ANEIAA6HMDtrAAAIAAaHg");
	var mask_graphics_81 = new cjs.Graphics().p("Eh21ANaIAA6zMDtrAAAIAAazg");
	var mask_graphics_82 = new cjs.Graphics().p("Eh21ANvIAA7dMDtrAAAIAAbdg");
	var mask_graphics_83 = new cjs.Graphics().p("Eh21AOFIAA8JMDtrAAAIAAcJg");
	var mask_graphics_84 = new cjs.Graphics().p("Eh21AObIAA82MDtrAAAIAAc2g");
	var mask_graphics_85 = new cjs.Graphics().p("Eh21AOyIAA9jMDtrAAAIAAdjg");
	var mask_graphics_86 = new cjs.Graphics().p("Eh21APJIAA+RMDtrAAAIAAeRg");
	var mask_graphics_87 = new cjs.Graphics().p("Eh21APgIAA+/MDtrAAAIAAe/g");
	var mask_graphics_88 = new cjs.Graphics().p("Eh21AP3IAA/tMDtrAAAIAAftg");
	var mask_graphics_89 = new cjs.Graphics().p("Eh21AQPMAAAggdMDtrAAAMAAAAgdg");
	var mask_graphics_90 = new cjs.Graphics().p("Eh21AQnMAAAghNMDtrAAAMAAAAhNg");
	var mask_graphics_91 = new cjs.Graphics().p("Eh21AQ/MAAAgh9MDtrAAAMAAAAh9g");
	var mask_graphics_92 = new cjs.Graphics().p("Eh21ARYMAAAgivMDtrAAAMAAAAivg");
	var mask_graphics_93 = new cjs.Graphics().p("Eh21ARwMAAAgjfMDtrAAAMAAAAjfg");
	var mask_graphics_94 = new cjs.Graphics().p("Eh21ASJMAAAgkRMDtrAAAMAAAAkRg");
	var mask_graphics_95 = new cjs.Graphics().p("Eh21ASiMAAAglDMDtrAAAMAAAAlDg");
	var mask_graphics_96 = new cjs.Graphics().p("Eh21AS8MAAAgl3MDtrAAAMAAAAl3g");
	var mask_graphics_97 = new cjs.Graphics().p("Eh21ATVMAAAgmqMDtrAAAMAAAAmqg");
	var mask_graphics_98 = new cjs.Graphics().p("Eh21ATwMAAAgnfMDtrAAAMAAAAnfg");
	var mask_graphics_99 = new cjs.Graphics().p("Eh21AUKMAAAgoTMDtrAAAMAAAAoTg");
	var mask_graphics_100 = new cjs.Graphics().p("Eh21AUlMAAAgpJMDtrAAAMAAAApJg");
	var mask_graphics_101 = new cjs.Graphics().p("Eh21AVAMAAAgp/MDtrAAAMAAAAp/g");
	var mask_graphics_102 = new cjs.Graphics().p("Eh21AVbMAAAgq1MDtrAAAMAAAAq1g");
	var mask_graphics_103 = new cjs.Graphics().p("Eh21AV2MAAAgrrMDtrAAAMAAAArrg");
	var mask_graphics_104 = new cjs.Graphics().p("Eh21AWSMAAAgsjMDtrAAAMAAAAsjg");
	var mask_graphics_105 = new cjs.Graphics().p("Eh21AWtMAAAgtaMDtrAAAMAAAAtag");
	var mask_graphics_106 = new cjs.Graphics().p("Eh21AXKMAAAguTMDtrAAAMAAAAuTg");
	var mask_graphics_107 = new cjs.Graphics().p("Eh21AXnMAAAgvNMDtrAAAMAAAAvNg");
	var mask_graphics_108 = new cjs.Graphics().p("Eh21AYDMAAAgwFMDtrAAAMAAAAwFg");
	var mask_graphics_109 = new cjs.Graphics().p("Eh21AYgMAAAgw/MDtrAAAMAAAAw/g");
	var mask_graphics_110 = new cjs.Graphics().p("Eh21AY+MAAAgx7MDtrAAAMAAAAx7g");
	var mask_graphics_111 = new cjs.Graphics().p("Eh21AZbMAAAgy1MDtrAAAMAAAAy1g");
	var mask_graphics_112 = new cjs.Graphics().p("Eh21AZ5MAAAgzxMDtrAAAMAAAAzxg");
	var mask_graphics_113 = new cjs.Graphics().p("Eh21AaXMAAAg0tMDtrAAAMAAAA0tg");
	var mask_graphics_114 = new cjs.Graphics().p("Eh21Aa2MAAAg1rMDtrAAAMAAAA1rg");
	var mask_graphics_115 = new cjs.Graphics().p("Eh21AbVMAAAg2pMDtrAAAMAAAA2pg");
	var mask_graphics_116 = new cjs.Graphics().p("Eh21AbzMAAAg3mMDtrAAAMAAAA3mg");
	var mask_graphics_117 = new cjs.Graphics().p("Eh21AcSMAAAg4kMDtrAAAMAAAA4kg");
	var mask_graphics_118 = new cjs.Graphics().p("Eh21AcyMAAAg5kMDtrAAAMAAAA5kg");
	var mask_graphics_119 = new cjs.Graphics().p("Eh21AdSMAAAg6jMDtrAAAMAAAA6jg");
	var mask_graphics_120 = new cjs.Graphics().p("EhqbAarMAAAg1VMDU3AAAMAAAA1Vg");
	var mask_graphics_121 = new cjs.Graphics().p("EhqbAbIMAAAg2PMDU3AAAMAAAA2Pg");
	var mask_graphics_122 = new cjs.Graphics().p("EhqbAblMAAAg3JMDU3AAAMAAAA3Jg");
	var mask_graphics_123 = new cjs.Graphics().p("EhqbAcDMAAAg4FMDU3AAAMAAAA4Fg");
	var mask_graphics_124 = new cjs.Graphics().p("EhqbAcgMAAAg4/MDU3AAAMAAAA4/g");
	var mask_graphics_125 = new cjs.Graphics().p("EhqbAc+MAAAg57MDU3AAAMAAAA57g");
	var mask_graphics_126 = new cjs.Graphics().p("EhqbAddMAAAg65MDU3AAAMAAAA65g");
	var mask_graphics_127 = new cjs.Graphics().p("EhqbAd7MAAAg71MDU3AAAMAAAA71g");
	var mask_graphics_128 = new cjs.Graphics().p("EhqbAeaMAAAg8zMDU3AAAMAAAA8zg");
	var mask_graphics_129 = new cjs.Graphics().p("EhqbAe5MAAAg9xMDU3AAAMAAAA9xg");
	var mask_graphics_130 = new cjs.Graphics().p("EhqbAfYMAAAg+vMDU3AAAMAAAA+vg");
	var mask_graphics_131 = new cjs.Graphics().p("EhqbAf3MAAAg/tMDU3AAAMAAAA/tg");
	var mask_graphics_132 = new cjs.Graphics().p("EhqbAgXMAAAhAtMDU3AAAMAAABAtg");
	var mask_graphics_133 = new cjs.Graphics().p("EhqbAg2MAAAhBsMDU3AAAMAAABBsg");
	var mask_graphics_134 = new cjs.Graphics().p("EhqbAhXMAAAhCtMDU3AAAMAAABCtg");
	var mask_graphics_135 = new cjs.Graphics().p("EhqbAh3MAAAhDtMDU3AAAMAAABDtg");
	var mask_graphics_136 = new cjs.Graphics().p("EhqbAiYMAAAhEvMDU3AAAMAAABEvg");
	var mask_graphics_137 = new cjs.Graphics().p("EhqbAi5MAAAhFxMDU3AAAMAAABFxg");
	var mask_graphics_138 = new cjs.Graphics().p("EhqbAjaMAAAhGzMDU3AAAMAAABGzg");
	var mask_graphics_139 = new cjs.Graphics().p("EhqbAj7MAAAhH1MDU3AAAMAAABH1g");
	var mask_graphics_140 = new cjs.Graphics().p("EhqbAkdMAAAhI5MDU3AAAMAAABI5g");
	var mask_graphics_141 = new cjs.Graphics().p("EhqbAk/MAAAhJ9MDU3AAAMAAABJ9g");
	var mask_graphics_142 = new cjs.Graphics().p("EhqbAlhMAAAhLBMDU3AAAMAAABLBg");
	var mask_graphics_143 = new cjs.Graphics().p("EhqbAmDMAAAhMFMDU3AAAMAAABMFg");
	var mask_graphics_144 = new cjs.Graphics().p("EhqbAmmMAAAhNLMDU3AAAMAAABNLg");
	var mask_graphics_145 = new cjs.Graphics().p("EhqbAnJMAAAhORMDU3AAAMAAABORg");
	var mask_graphics_146 = new cjs.Graphics().p("EhqbAnsMAAAhPXMDU3AAAMAAABPXg");
	var mask_graphics_147 = new cjs.Graphics().p("EhqbAoPMAAAhQdMDU3AAAMAAABQdg");
	var mask_graphics_148 = new cjs.Graphics().p("EhqbAoyMAAAhRkMDU3AAAMAAABRkg");
	var mask_graphics_149 = new cjs.Graphics().p("EhqbApWMAAAhSsMDU3AAAMAAABSsg");
	var mask_graphics_150 = new cjs.Graphics().p("EhqbAp6MAAAhTzMDU3AAAMAAABTzg");
	var mask_graphics_151 = new cjs.Graphics().p("EhqbAqeMAAAhU8MDU3AAAMAAABU8g");
	var mask_graphics_152 = new cjs.Graphics().p("EhqbArDMAAAhWFMDU3AAAMAAABWFg");
	var mask_graphics_153 = new cjs.Graphics().p("EhqbAroMAAAhXPMDU3AAAMAAABXPg");
	var mask_graphics_154 = new cjs.Graphics().p("EhqbAsNMAAAhYZMDU3AAAMAAABYZg");
	var mask_graphics_155 = new cjs.Graphics().p("EhqbAsyMAAAhZjMDU3AAAMAAABZjg");
	var mask_graphics_156 = new cjs.Graphics().p("EhqbAtYMAAAhavMDU3AAAMAAABavg");
	var mask_graphics_157 = new cjs.Graphics().p("EhqbAt+MAAAhb7MDU3AAAMAAABb7g");
	var mask_graphics_158 = new cjs.Graphics().p("EhqbAujMAAAhdGMDU3AAAMAAABdGg");
	var mask_graphics_159 = new cjs.Graphics().p("EhqbAvKMAAAheTMDU3AAAMAAABeTg");
	var mask_graphics_160 = new cjs.Graphics().p("EhqbAvwMAAAhfgMDU3AAAMAAABfgg");
	var mask_graphics_161 = new cjs.Graphics().p("EhqbAwXMAAAhgtMDU3AAAMAAABgtg");
	var mask_graphics_162 = new cjs.Graphics().p("EhqbAw+MAAAhh7MDU3AAAMAAABh7g");
	var mask_graphics_163 = new cjs.Graphics().p("EhqbAxlMAAAhjJMDU3AAAMAAABjJg");
	var mask_graphics_164 = new cjs.Graphics().p("EhqbAyNMAAAhkZMDU3AAAMAAABkZg");
	var mask_graphics_165 = new cjs.Graphics().p("EhqbAy1MAAAhlpMDU3AAAMAAABlpg");
	var mask_graphics_166 = new cjs.Graphics().p("EhqbAzdMAAAhm5MDU3AAAMAAABm5g");
	var mask_graphics_167 = new cjs.Graphics().p("EhqbA0FMAAAhoJMDU3AAAMAAABoJg");
	var mask_graphics_168 = new cjs.Graphics().p("EhqbA0tMAAAhpZMDU3AAAMAAABpZg");
	var mask_graphics_169 = new cjs.Graphics().p("EhqbA1WMAAAhqrMDU3AAAMAAABqrg");
	var mask_graphics_170 = new cjs.Graphics().p("EhqbA1/MAAAhr9MDU3AAAMAAABr9g");
	var mask_graphics_171 = new cjs.Graphics().p("EhqbA2oMAAAhtPMDU3AAAMAAABtPg");
	var mask_graphics_172 = new cjs.Graphics().p("EhqbA3RMAAAhuiMDU3AAAMAAABuig");
	var mask_graphics_173 = new cjs.Graphics().p("EhqbA37MAAAhv1MDU3AAAMAAABv1g");
	var mask_graphics_174 = new cjs.Graphics().p("EhqbA4lMAAAhxJMDU3AAAMAAABxJg");
	var mask_graphics_175 = new cjs.Graphics().p("EhqbA5PMAAAhydMDU3AAAMAAABydg");
	var mask_graphics_176 = new cjs.Graphics().p("EhqbA56MAAAhzzMDU3AAAMAAABzzg");
	var mask_graphics_177 = new cjs.Graphics().p("EiojBcwMAAAi5fMFRHAAAMAAAC5fg");
	var mask_graphics_178 = new cjs.Graphics().p("Eh4HBC3MAAAiFtMDwPAAAMAAACFtg");
	var mask_graphics_179 = new cjs.Graphics().p("Eh4HBDnMAAAiHNMDwPAAAMAAACHNg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:615.302,y:-57.05}).wait(1).to({graphics:mask_graphics_1,x:615.302,y:-57.05}).wait(1).to({graphics:mask_graphics_2,x:615.302,y:-57.05}).wait(1).to({graphics:mask_graphics_3,x:615.275,y:-113.325}).wait(1).to({graphics:mask_graphics_4,x:615.275,y:-113.25}).wait(1).to({graphics:mask_graphics_5,x:615.275,y:-113.175}).wait(1).to({graphics:mask_graphics_6,x:615.275,y:-113.05}).wait(1).to({graphics:mask_graphics_7,x:615.275,y:-112.9}).wait(1).to({graphics:mask_graphics_8,x:615.275,y:-112.7}).wait(1).to({graphics:mask_graphics_9,x:615.275,y:-112.475}).wait(1).to({graphics:mask_graphics_10,x:615.275,y:-112.2}).wait(1).to({graphics:mask_graphics_11,x:615.275,y:-111.9}).wait(1).to({graphics:mask_graphics_12,x:615.275,y:-111.55}).wait(1).to({graphics:mask_graphics_13,x:615.275,y:-111.175}).wait(1).to({graphics:mask_graphics_14,x:615.275,y:-110.775}).wait(1).to({graphics:mask_graphics_15,x:615.275,y:-110.35}).wait(1).to({graphics:mask_graphics_16,x:615.275,y:-109.85}).wait(1).to({graphics:mask_graphics_17,x:615.275,y:-109.35}).wait(1).to({graphics:mask_graphics_18,x:615.275,y:-108.8}).wait(1).to({graphics:mask_graphics_19,x:615.275,y:-108.2}).wait(1).to({graphics:mask_graphics_20,x:615.275,y:-107.575}).wait(1).to({graphics:mask_graphics_21,x:615.275,y:-106.925}).wait(1).to({graphics:mask_graphics_22,x:615.275,y:-106.25}).wait(1).to({graphics:mask_graphics_23,x:615.275,y:-105.525}).wait(1).to({graphics:mask_graphics_24,x:615.275,y:-104.75}).wait(1).to({graphics:mask_graphics_25,x:615.275,y:-103.925}).wait(1).to({graphics:mask_graphics_26,x:615.275,y:-103.125}).wait(1).to({graphics:mask_graphics_27,x:615.275,y:-102.225}).wait(1).to({graphics:mask_graphics_28,x:615.275,y:-101.35}).wait(1).to({graphics:mask_graphics_29,x:615.275,y:-100.425}).wait(1).to({graphics:mask_graphics_30,x:615.275,y:-99.425}).wait(1).to({graphics:mask_graphics_31,x:615.275,y:-98.4}).wait(1).to({graphics:mask_graphics_32,x:615.275,y:-97.375}).wait(1).to({graphics:mask_graphics_33,x:615.275,y:-96.275}).wait(1).to({graphics:mask_graphics_34,x:615.275,y:-95.175}).wait(1).to({graphics:mask_graphics_35,x:615.275,y:-94}).wait(1).to({graphics:mask_graphics_36,x:615.275,y:-92.8}).wait(1).to({graphics:mask_graphics_37,x:615.275,y:-91.6}).wait(1).to({graphics:mask_graphics_38,x:615.275,y:-90.325}).wait(1).to({graphics:mask_graphics_39,x:615.275,y:-89.05}).wait(1).to({graphics:mask_graphics_40,x:615.275,y:-87.7}).wait(1).to({graphics:mask_graphics_41,x:615.275,y:-86.35}).wait(1).to({graphics:mask_graphics_42,x:615.275,y:-84.975}).wait(1).to({graphics:mask_graphics_43,x:615.275,y:-83.5}).wait(1).to({graphics:mask_graphics_44,x:615.275,y:-82.025}).wait(1).to({graphics:mask_graphics_45,x:615.275,y:-80.525}).wait(1).to({graphics:mask_graphics_46,x:615.275,y:-78.975}).wait(1).to({graphics:mask_graphics_47,x:615.275,y:-77.4}).wait(1).to({graphics:mask_graphics_48,x:615.275,y:-75.8}).wait(1).to({graphics:mask_graphics_49,x:615.275,y:-74.15}).wait(1).to({graphics:mask_graphics_50,x:615.275,y:-72.45}).wait(1).to({graphics:mask_graphics_51,x:615.275,y:-70.75}).wait(1).to({graphics:mask_graphics_52,x:615.275,y:-68.975}).wait(1).to({graphics:mask_graphics_53,x:615.275,y:-67.2}).wait(1).to({graphics:mask_graphics_54,x:615.275,y:-65.375}).wait(1).to({graphics:mask_graphics_55,x:615.275,y:-63.475}).wait(1).to({graphics:mask_graphics_56,x:615.275,y:-61.575}).wait(1).to({graphics:mask_graphics_57,x:615.275,y:-59.65}).wait(1).to({graphics:mask_graphics_58,x:615.275,y:-57.675}).wait(1).to({graphics:mask_graphics_59,x:615.275,y:-55.7}).wait(1).to({graphics:mask_graphics_60,x:615.275,y:-53.675}).wait(1).to({graphics:mask_graphics_61,x:615.275,y:-51.575}).wait(1).to({graphics:mask_graphics_62,x:615.275,y:-49.45}).wait(1).to({graphics:mask_graphics_63,x:615.275,y:-47.325}).wait(1).to({graphics:mask_graphics_64,x:615.275,y:-45.125}).wait(1).to({graphics:mask_graphics_65,x:670.975,y:10.2}).wait(1).to({graphics:mask_graphics_66,x:670.975,y:11.925}).wait(1).to({graphics:mask_graphics_67,x:670.975,y:13.725}).wait(1).to({graphics:mask_graphics_68,x:670.975,y:15.5}).wait(1).to({graphics:mask_graphics_69,x:670.975,y:17.3}).wait(1).to({graphics:mask_graphics_70,x:670.975,y:19.15}).wait(1).to({graphics:mask_graphics_71,x:670.975,y:21.025}).wait(1).to({graphics:mask_graphics_72,x:670.975,y:22.925}).wait(1).to({graphics:mask_graphics_73,x:670.975,y:24.825}).wait(1).to({graphics:mask_graphics_74,x:670.975,y:26.8}).wait(1).to({graphics:mask_graphics_75,x:670.975,y:28.75}).wait(1).to({graphics:mask_graphics_76,x:670.975,y:30.775}).wait(1).to({graphics:mask_graphics_77,x:670.975,y:32.8}).wait(1).to({graphics:mask_graphics_78,x:670.975,y:34.875}).wait(1).to({graphics:mask_graphics_79,x:670.975,y:36.95}).wait(1).to({graphics:mask_graphics_80,x:670.975,y:39.075}).wait(1).to({graphics:mask_graphics_81,x:670.975,y:41.2}).wait(1).to({graphics:mask_graphics_82,x:670.975,y:43.375}).wait(1).to({graphics:mask_graphics_83,x:670.975,y:45.575}).wait(1).to({graphics:mask_graphics_84,x:670.975,y:47.8}).wait(1).to({graphics:mask_graphics_85,x:670.975,y:50.075}).wait(1).to({graphics:mask_graphics_86,x:670.975,y:52.325}).wait(1).to({graphics:mask_graphics_87,x:670.975,y:54.65}).wait(1).to({graphics:mask_graphics_88,x:670.975,y:56.975}).wait(1).to({graphics:mask_graphics_89,x:670.975,y:59.35}).wait(1).to({graphics:mask_graphics_90,x:670.975,y:61.725}).wait(1).to({graphics:mask_graphics_91,x:670.975,y:64.125}).wait(1).to({graphics:mask_graphics_92,x:670.975,y:66.6}).wait(1).to({graphics:mask_graphics_93,x:670.975,y:69.075}).wait(1).to({graphics:mask_graphics_94,x:670.975,y:71.55}).wait(1).to({graphics:mask_graphics_95,x:670.975,y:74.075}).wait(1).to({graphics:mask_graphics_96,x:670.975,y:76.625}).wait(1).to({graphics:mask_graphics_97,x:670.975,y:79.2}).wait(1).to({graphics:mask_graphics_98,x:670.975,y:81.825}).wait(1).to({graphics:mask_graphics_99,x:670.975,y:84.45}).wait(1).to({graphics:mask_graphics_100,x:670.975,y:87.1}).wait(1).to({graphics:mask_graphics_101,x:670.975,y:89.8}).wait(1).to({graphics:mask_graphics_102,x:670.975,y:92.525}).wait(1).to({graphics:mask_graphics_103,x:670.975,y:95.25}).wait(1).to({graphics:mask_graphics_104,x:670.975,y:98.025}).wait(1).to({graphics:mask_graphics_105,x:670.975,y:100.8}).wait(1).to({graphics:mask_graphics_106,x:670.975,y:103.625}).wait(1).to({graphics:mask_graphics_107,x:670.975,y:106.5}).wait(1).to({graphics:mask_graphics_108,x:670.975,y:109.375}).wait(1).to({graphics:mask_graphics_109,x:670.975,y:112.275}).wait(1).to({graphics:mask_graphics_110,x:670.975,y:115.225}).wait(1).to({graphics:mask_graphics_111,x:670.975,y:118.175}).wait(1).to({graphics:mask_graphics_112,x:670.975,y:121.175}).wait(1).to({graphics:mask_graphics_113,x:670.975,y:124.175}).wait(1).to({graphics:mask_graphics_114,x:670.975,y:127.225}).wait(1).to({graphics:mask_graphics_115,x:670.975,y:130.3}).wait(1).to({graphics:mask_graphics_116,x:670.975,y:133.4}).wait(1).to({graphics:mask_graphics_117,x:670.975,y:136.5}).wait(1).to({graphics:mask_graphics_118,x:670.975,y:139.7}).wait(1).to({graphics:mask_graphics_119,x:670.975,y:142.85}).wait(1).to({graphics:mask_graphics_120,x:667.875,y:168.45}).wait(1).to({graphics:mask_graphics_121,x:667.875,y:171.35}).wait(1).to({graphics:mask_graphics_122,x:667.875,y:174.275}).wait(1).to({graphics:mask_graphics_123,x:667.875,y:177.2}).wait(1).to({graphics:mask_graphics_124,x:667.875,y:180.175}).wait(1).to({graphics:mask_graphics_125,x:667.875,y:183.175}).wait(1).to({graphics:mask_graphics_126,x:667.875,y:186.2}).wait(1).to({graphics:mask_graphics_127,x:667.875,y:189.225}).wait(1).to({graphics:mask_graphics_128,x:667.875,y:192.325}).wait(1).to({graphics:mask_graphics_129,x:667.875,y:195.425}).wait(1).to({graphics:mask_graphics_130,x:667.875,y:198.525}).wait(1).to({graphics:mask_graphics_131,x:667.875,y:201.675}).wait(1).to({graphics:mask_graphics_132,x:667.875,y:204.825}).wait(1).to({graphics:mask_graphics_133,x:667.875,y:208}).wait(1).to({graphics:mask_graphics_134,x:667.875,y:211.225}).wait(1).to({graphics:mask_graphics_135,x:667.875,y:214.475}).wait(1).to({graphics:mask_graphics_136,x:667.875,y:217.725}).wait(1).to({graphics:mask_graphics_137,x:667.875,y:221.025}).wait(1).to({graphics:mask_graphics_138,x:667.875,y:224.325}).wait(1).to({graphics:mask_graphics_139,x:667.875,y:227.675}).wait(1).to({graphics:mask_graphics_140,x:667.875,y:231.025}).wait(1).to({graphics:mask_graphics_141,x:667.875,y:234.425}).wait(1).to({graphics:mask_graphics_142,x:667.875,y:237.825}).wait(1).to({graphics:mask_graphics_143,x:667.875,y:241.25}).wait(1).to({graphics:mask_graphics_144,x:667.875,y:244.725}).wait(1).to({graphics:mask_graphics_145,x:667.875,y:248.2}).wait(1).to({graphics:mask_graphics_146,x:667.875,y:251.725}).wait(1).to({graphics:mask_graphics_147,x:667.875,y:255.225}).wait(1).to({graphics:mask_graphics_148,x:667.875,y:258.8}).wait(1).to({graphics:mask_graphics_149,x:667.875,y:262.4}).wait(1).to({graphics:mask_graphics_150,x:667.875,y:265.975}).wait(1).to({graphics:mask_graphics_151,x:667.875,y:269.6}).wait(1).to({graphics:mask_graphics_152,x:667.875,y:273.25}).wait(1).to({graphics:mask_graphics_153,x:667.875,y:276.95}).wait(1).to({graphics:mask_graphics_154,x:667.875,y:280.65}).wait(1).to({graphics:mask_graphics_155,x:667.875,y:284.375}).wait(1).to({graphics:mask_graphics_156,x:667.875,y:288.125}).wait(1).to({graphics:mask_graphics_157,x:667.875,y:291.925}).wait(1).to({graphics:mask_graphics_158,x:667.875,y:295.7}).wait(1).to({graphics:mask_graphics_159,x:667.875,y:299.525}).wait(1).to({graphics:mask_graphics_160,x:667.875,y:303.4}).wait(1).to({graphics:mask_graphics_161,x:667.875,y:307.25}).wait(1).to({graphics:mask_graphics_162,x:667.875,y:311.15}).wait(1).to({graphics:mask_graphics_163,x:667.875,y:315.075}).wait(1).to({graphics:mask_graphics_164,x:667.875,y:319.025}).wait(1).to({graphics:mask_graphics_165,x:667.875,y:323}).wait(1).to({graphics:mask_graphics_166,x:667.875,y:327}).wait(1).to({graphics:mask_graphics_167,x:667.875,y:331.025}).wait(1).to({graphics:mask_graphics_168,x:667.875,y:335.075}).wait(1).to({graphics:mask_graphics_169,x:667.875,y:339.125}).wait(1).to({graphics:mask_graphics_170,x:667.875,y:343.225}).wait(1).to({graphics:mask_graphics_171,x:667.875,y:347.35}).wait(1).to({graphics:mask_graphics_172,x:667.875,y:351.5}).wait(1).to({graphics:mask_graphics_173,x:667.875,y:355.65}).wait(1).to({graphics:mask_graphics_174,x:667.875,y:359.85}).wait(1).to({graphics:mask_graphics_175,x:667.875,y:364.05}).wait(1).to({graphics:mask_graphics_176,x:667.875,y:368.325}).wait(1).to({graphics:mask_graphics_177,x:1065.625,y:374.575}).wait(1).to({graphics:mask_graphics_178,x:671.475,y:378.975}).wait(1).to({graphics:mask_graphics_179,x:671.5012,y:383.8338}).wait(1));

	// Stars_obj_
	this.Stars = new lib.Scene_1_Stars();
	this.Stars.name = "Stars";
	this.Stars.setTransform(634.3,196.4,1.5457,1.5457,0,0,0,652,200.9);
	this.Stars.depth = 0;
	this.Stars.isAttachedToCamera = 0
	this.Stars.isAttachedToMask = 0
	this.Stars.layerDepth = 0
	this.Stars.layerIndex = 7
	this.Stars.maskLayerName = 0

	var maskedShapeInstanceList = [this.Stars];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.Stars).wait(55).to({regX:610.1,regY:202.7,scaleX:1.1971,scaleY:1.1971,y:196.45},0).wait(125));

	// Sky_obj_
	this.Sky = new lib.Scene_1_Sky();
	this.Sky.name = "Sky";
	this.Sky.setTransform(640.05,360.1,1.5457,1.5457,0,0,0,655.7,306.8);
	this.Sky.depth = 0;
	this.Sky.isAttachedToCamera = 0
	this.Sky.isAttachedToMask = 0
	this.Sky.layerDepth = 0
	this.Sky.layerIndex = 8
	this.Sky.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Sky).wait(5).to({regX:650.6,regY:310.8,scaleX:1.4918,scaleY:1.4918,x:640,y:360},0).wait(9).to({regX:641.8,regY:317.9,scaleX:1.4058,scaleY:1.4058,x:640.05,y:360.05},0).wait(166));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-237.3,272.2,1676.3,447.8);
// library properties:
lib.properties = {
	id: '2D93A26E9FA86D49A63063E048B2325D',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#999999",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_61.png?1652028967889", id:"CachedBmp_61"},
		{src:"images/CachedBmp_60.png?1652028967889", id:"CachedBmp_60"},
		{src:"images/CachedBmp_59.png?1652028967889", id:"CachedBmp_59"},
		{src:"images/CachedBmp_58.png?1652028967889", id:"CachedBmp_58"},
		{src:"images/CachedBmp_57.png?1652028967889", id:"CachedBmp_57"},
		{src:"images/CachedBmp_56.png?1652028967889", id:"CachedBmp_56"},
		{src:"images/CachedBmp_55.png?1652028967889", id:"CachedBmp_55"},
		{src:"images/CachedBmp_54.png?1652028967889", id:"CachedBmp_54"},
		{src:"images/CachedBmp_53.png?1652028967889", id:"CachedBmp_53"},
		{src:"images/CachedBmp_52.png?1652028967889", id:"CachedBmp_52"},
		{src:"images/CachedBmp_51.png?1652028967889", id:"CachedBmp_51"},
		{src:"images/CachedBmp_50.png?1652028967889", id:"CachedBmp_50"},
		{src:"images/CachedBmp_49.png?1652028967889", id:"CachedBmp_49"},
		{src:"images/CachedBmp_48.png?1652028967889", id:"CachedBmp_48"},
		{src:"images/CachedBmp_47.png?1652028967889", id:"CachedBmp_47"},
		{src:"images/CachedBmp_46.png?1652028967889", id:"CachedBmp_46"},
		{src:"images/CachedBmp_45.png?1652028967889", id:"CachedBmp_45"},
		{src:"images/CachedBmp_44.png?1652028967889", id:"CachedBmp_44"},
		{src:"images/CachedBmp_43.png?1652028967889", id:"CachedBmp_43"},
		{src:"images/CachedBmp_42.png?1652028967889", id:"CachedBmp_42"},
		{src:"images/CachedBmp_41.png?1652028967889", id:"CachedBmp_41"},
		{src:"images/CachedBmp_40.png?1652028967889", id:"CachedBmp_40"},
		{src:"images/CachedBmp_39.png?1652028967889", id:"CachedBmp_39"},
		{src:"images/CachedBmp_38.png?1652028967889", id:"CachedBmp_38"},
		{src:"images/CachedBmp_37.png?1652028967889", id:"CachedBmp_37"},
		{src:"images/CachedBmp_36.png?1652028967889", id:"CachedBmp_36"},
		{src:"images/CachedBmp_35.png?1652028967889", id:"CachedBmp_35"},
		{src:"images/CachedBmp_34.png?1652028967889", id:"CachedBmp_34"},
		{src:"images/CachedBmp_33.png?1652028967889", id:"CachedBmp_33"},
		{src:"images/CachedBmp_32.png?1652028967889", id:"CachedBmp_32"},
		{src:"images/CachedBmp_31.png?1652028967889", id:"CachedBmp_31"},
		{src:"images/CachedBmp_30.png?1652028967889", id:"CachedBmp_30"},
		{src:"images/CachedBmp_29.png?1652028967889", id:"CachedBmp_29"},
		{src:"images/CachedBmp_28.png?1652028967889", id:"CachedBmp_28"},
		{src:"images/CachedBmp_27.png?1652028967889", id:"CachedBmp_27"},
		{src:"images/CachedBmp_26.png?1652028967889", id:"CachedBmp_26"},
		{src:"images/CachedBmp_25.png?1652028967889", id:"CachedBmp_25"},
		{src:"images/CachedBmp_24.png?1652028967889", id:"CachedBmp_24"},
		{src:"images/CachedBmp_23.png?1652028967889", id:"CachedBmp_23"},
		{src:"images/CachedBmp_22.png?1652028967889", id:"CachedBmp_22"},
		{src:"images/CachedBmp_21.png?1652028967889", id:"CachedBmp_21"},
		{src:"images/CachedBmp_20.png?1652028967889", id:"CachedBmp_20"},
		{src:"images/CachedBmp_19.png?1652028967889", id:"CachedBmp_19"},
		{src:"images/CachedBmp_18.png?1652028967889", id:"CachedBmp_18"},
		{src:"images/CachedBmp_17.png?1652028967889", id:"CachedBmp_17"},
		{src:"images/CachedBmp_16.png?1652028967889", id:"CachedBmp_16"},
		{src:"images/CachedBmp_15.png?1652028967889", id:"CachedBmp_15"},
		{src:"images/CachedBmp_14.png?1652028967889", id:"CachedBmp_14"},
		{src:"images/CachedBmp_13.png?1652028967889", id:"CachedBmp_13"},
		{src:"images/CachedBmp_12.png?1652028967889", id:"CachedBmp_12"},
		{src:"images/CachedBmp_11.png?1652028967889", id:"CachedBmp_11"},
		{src:"images/CachedBmp_10.png?1652028967889", id:"CachedBmp_10"},
		{src:"images/CachedBmp_9.png?1652028967889", id:"CachedBmp_9"},
		{src:"images/CachedBmp_8.png?1652028967889", id:"CachedBmp_8"},
		{src:"images/CachedBmp_7.png?1652028967889", id:"CachedBmp_7"},
		{src:"images/CachedBmp_6.png?1652028967889", id:"CachedBmp_6"},
		{src:"images/CachedBmp_5.png?1652028967889", id:"CachedBmp_5"},
		{src:"images/CachedBmp_4.png?1652028967889", id:"CachedBmp_4"},
		{src:"images/CachedBmp_3.png?1652028967889", id:"CachedBmp_3"},
		{src:"images/CachedBmp_2.png?1652028967889", id:"CachedBmp_2"},
		{src:"images/CachedBmp_1.png?1652028967889", id:"CachedBmp_1"},
		{src:"images/interactive_atlas_1.png?1652028967698", id:"interactive_atlas_1"},
		{src:"images/interactive_atlas_2.png?1652028967698", id:"interactive_atlas_2"},
		{src:"sounds/Gothic.mp3?1652028967889", id:"Gothic"},
		{src:"sounds/hover.mp3?1652028967889", id:"hover"},
		{src:"sounds/press.mp3?1652028967889", id:"press"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2D93A26E9FA86D49A63063E048B2325D'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;