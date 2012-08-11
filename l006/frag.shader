precision mediump float;
uniform sampler2D sampler2d;
varying vec2 vTexCoord;

void main() {
	gl_FragColor = texture2D(sampler2d, vec2(vTexCoord.s, vTexCoord.t));
}
