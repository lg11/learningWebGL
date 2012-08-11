uniform mat4 tran;
attribute vec2 pos;
attribute vec2 texCoord;
varying vec2 vTexCoord;

void main() {
	gl_Position = tran * vec4(pos, 0, 1);
	vTexCoord = texCoord;
}
