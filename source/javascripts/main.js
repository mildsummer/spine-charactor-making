let getSkeltonJSON = new Promise(function(resolve, reject) {
  $.ajax({
    url: './data/skelton.json',
    dataType: 'json',
    success: function(json) {
      resolve(json);
    },
    error: function() {
      reject();
    }
  });
});

let getSpriteJSON = new Promise(function(resolve, reject) {
  $.ajax({
    url: './data/parts.json',
    dataType: 'json',
    success: function(json) {
      resolve(json);
    },
    error: function() {
      reject();
    }
  });
});

let getSpriteImage = new Promise(function(resolve, reject) {
  let image = new Image();
  image.onload = function() {
    resolve(image);
  };
  image.src = './images/parts.png';
});

Promise.all([getSkeltonJSON, getSpriteJSON, getSpriteImage])
  .then(function(data) {
    let skeltonJSON = data[0];
    let spriteJSON = data[1];
    let sprite = data[2];
    let renderer = new spine.SkeletonRenderer(sprite, spriteJSON);
    renderer.scale = 0.6;
    console.log(skeltonJSON);
    renderer.load(skeltonJSON);
    renderer.state.data.defaultMix = 0.4;
    renderer.state.setAnimationByName(0, "walk", true);
    renderer.state.addAnimationByName(0, "jump", false, 3);
    renderer.state.addAnimationByName(0, "run", true, 0);
    renderer.skeleton.x = 320;
    renderer.skeleton.y = 450;
    renderer.animate(document.querySelector('canvas'));
  });