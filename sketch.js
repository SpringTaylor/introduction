let img1B, bgImg51;
let offsetY = 0;
let maxOffset;
let vid55;
let videoVisible = false;

function preload() {
  img1B = loadImage("1B.png");    // 跟随鼠标
  bgImg51 = loadImage("51.png");  // 滚动背景
}

function setup() {
  createCanvas(1920, 1080);
  maxOffset = bgImg51.height - height;

  // ✅ 加载并设置视频
  vid55 = createVideo("55.mp4");
  vid55.size(1920, 1080);
  vid55.hide(); // 不自动显示，让我们用 image 显示
  vid55.volume(0); // 可选：静音
}

function draw() {
  background(250);

  // ✅ 1B.png 最底层，跟随鼠标
  imageMode(CENTER);
  image(img1B, mouseX, mouseY, 1920, 1920);
  imageMode(CORNER);

  // ✅ 51.png 滚动背景
  image(bgImg51, 0, -offsetY, width, bgImg51.height);

  // ✅ 视频位置：始终在 51.png 的下半部分
  let videoYinCanvas = (bgImg51.height - 1080) - offsetY; // 51.png 最底部贴地时，视频刚好在画布底部
  let isFullyVisible = videoYinCanvas >= 0 && videoYinCanvas + 1080 <= height;

  // ✅ 条件播放视频（只播放一次）
  if (isFullyVisible && !videoVisible) {
    vid55.loop(); // 或使用 vid55.play(); 根据需要
    videoVisible = true;
  }

  // ✅ 在画布最上层绘制视频（始终）
  image(vid55, 0, videoYinCanvas, 1920, 1080);
}

function mouseWheel(event) {
  offsetY = constrain(offsetY + event.delta, 0, maxOffset);
  return false;
}
