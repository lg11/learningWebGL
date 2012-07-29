function draw(gl) {
	var vsrc = 'attribute vec2 pos; void main() { gl_Position = vec4(pos[0], pos[1], 0, 1); }'
	var vs = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vs, vsrc)
	gl.compileShader(vs)

	var fsrc = 'precision mediump float; void main() { gl_FragColor = vec4(1, 0, 0, 1); }'
	var fs = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fs, fsrc)
	gl.compileShader(fs)

	var p = gl.createProgram()
	gl.attachShader(p, vs)
	gl.attachShader(p, fs)
	gl.linkProgram(p)

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

	gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function init() {
	var canvas = document.getElementById("canvas")
	var gl = canvas.getContext("experimental-webgl")
	
	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)

	draw(gl)
}
