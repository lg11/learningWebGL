var image
var vsrc
var fsrc

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
	var vs = createShader(gl, vsrc, gl.VERTEX_SHADER)
	var fs = createShader(gl, fsrc, gl.FRAGMENT_SHADER)

	var p = createProgram(gl, vs, fs)

	gl.useProgram(p)

	var tranMatArray = new Float32Array([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	])
	var tranMatUni = gl.getUniformLocation(p, 'tran')
	gl.uniformMatrix4fv(tranMatUni, false, tranMatArray)
	
	var vertPosArray = new Float32Array([
		-0.5, 0.5,
		0.5, 0.5,
		-0.5, -0.5,
		0.5, -0.5
	])
	var vertPosBuf = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertPosBuf)
	gl.bufferData(gl.ARRAY_BUFFER, vertPosArray, gl.STREAM_DRAW)
	
	var vertPosAttr = gl.getAttribLocation(p, 'pos')
	gl.enableVertexAttribArray(vertPosAttr)
	gl.vertexAttribPointer(vertPosAttr, 2, gl.FLOAT, false, 0, 0)

	var vertTexCoordArray = new Float32Array([
		0, 0,
		1, 0,
		0, 1,
		1, 1
	])
	var vertTexCoordBuf = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertTexCoordBuf)
	gl.bufferData(gl.ARRAY_BUFFER, vertTexCoordArray, gl.STREAM_DRAW)

	var vertTexCoordAttr = gl.getAttribLocation(p, 'texCoord')
	gl.enableVertexAttribArray(vertTexCoordAttr)
	gl.vertexAttribPointer(vertTexCoordAttr, 2, gl.FLOAT, false, 0, 0)

	var vertIndexArray = new Uint8Array([
		0, 1, 2, 3
	])
	var vertIndexBuf = gl.createBuffer()
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertIndexBuf)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vertIndexArray, gl.STREAM_DRAW)

	var texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_BYTE, 0)
	console.log("draw")
}

function load(gl) {
	var req

	req = new XMLHttpRequest()
	req.open("GET", "vext.shader", false)
	req.send()
	vsrc = req.responseText

	req = new XMLHttpRequest()
	req.open("GET", "frag.shader", false)
	req.send()
	fsrc = req.responseText

	image = new Image()
	image.onload = function() { draw(gl) }
	image.src = "texture.png"
}

function init() {
	var canvas = document.getElementById("canvas")
	var gl = canvas.getContext("experimental-webgl")
	
	load(gl)
}
