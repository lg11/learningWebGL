function createShader(gl, src, type) {
	var shader = gl.createShader(type)
	gl.shaderSource(shader, src)
	gl.compileShader(shader)

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(shader))
	}

	return shader
}

function createProgram(gl, vs, fs) {
	var p = gl.createProgram()
	gl.attachShader(p, vs)
	gl.attachShader(p, fs)
	gl.linkProgram(p)

	if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
		console.log(gl.getProgramInfoLog(p))
	}

	return p
}

function draw(gl) {
	var vsrc = 'attribute vec2 pos; attribute vec3 color; varying vec4 vColor; void main() { gl_Position = vec4(pos, 0, 1); vColor = vec4(color, 1); }'
	var vs = createShader(gl, vsrc, gl.VERTEX_SHADER)

	var fsrc = 'precision mediump float; varying vec4 vColor; void main() { gl_FragColor = vColor; }'
	var fs = createShader(gl, fsrc, gl.FRAGMENT_SHADER)

	var p = createProgram(gl, vs, fs)

	gl.useProgram(p)

	var vertPosArray = new Float32Array([
		0, 0.5,
		0.5, -0.5,
		-0.5, -0.5
	])
	var vertPosBuf = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertPosBuf)
	gl.bufferData(gl.ARRAY_BUFFER, vertPosArray, gl.STATIC_DRAW)
	
	var vertPosAttr = gl.getAttribLocation(p, 'pos')
	gl.enableVertexAttribArray(vertPosAttr)
	gl.vertexAttribPointer(vertPosAttr, 2, gl.FLOAT, false, 0, 0)

	var vertColorArray = new Float32Array([
		1, 0, 0,
		0, 1, 0,
		0, 0, 1
	])
	var vertColorBuf = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertColorBuf)
	gl.bufferData(gl.ARRAY_BUFFER, vertColorArray, gl.STATIC_DRAW)

	var vertColorAttr = gl.getAttribLocation(p, 'color')
	gl.enableVertexAttribArray(vertColorAttr)
	gl.vertexAttribPointer(vertColorAttr, 3, gl.FLOAT, false, 0, 0)

	var vertIndexArray = new Uint8Array([
		0, 1, 2
	])
	var vertIndexBuf = gl.createBuffer()
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertIndexBuf)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vertIndexArray, gl.STATIC_DRAW)

	gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_BYTE, 0)
}

function init() {
	var canvas = document.getElementById("canvas")
	var gl = canvas.getContext("experimental-webgl")
	
	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)

	draw(gl)
}
