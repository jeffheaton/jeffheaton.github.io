/***********
 * flocking.js
 * Jeff Heaton
 * Feb 2015
 ***********/


var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();

var squares;
var projector = new THREE.Projector();
var theSelectedSquare = null;
var theObjects = [];
var canvasWidth, canvasHeight;

var m = 60, n = 60;
var offset = 2.4;
var waveRate = 8.0;
var curWave = null;
var waveLimit = 30;

var plainColor = null;
var nbrColors = 201;
var colors;


var agents = [];
/**
  * The degree to which cohesion is applied to steering the agent.
  * Cohesion is the desire to move towards groups of other agents.
  */
var constCohesion = 0.5;//0.01;

/**
  * The degree to which alignment is applied to steering the agent.
  * Alignment is the desire to keep all particles moving in the same direction.
  */
var constAlignment = 0.5;//0.5;

/**
  * The degree to which separation is applied to steering the agent.
  * Separation is the desire to not be too close to another particle.
  */
var constSeparation = 0.5;//0.25;

var constSpeed = 0.75;

var constWorldMax = 50;

var constMaxTurn = Math.PI/100;


var controls = new function() {
    this.cohesion = 0.5;
    this.alignment = 0.5;
    this.separation = 0.5;
    this.boidCount = 100;
    this.boundaries = 'Wrap';
    this.view = 'Global';
}

/**
 * Calculate the euclidean distance between a1 and a2.  Use the specified starting index and length.
 * @param a1 The first array to consider.
 * @param a2 The second array to consider.
 * @param startIndex The starting index.
 * @param len The length.
 * @method euclideanDistance
 * @return {Number}
 */
function euclideanDistance(a1, a2) {
    'use strict';

    var result = 0, i, diff;
    for (i = 0; i < a1.length; i += 1) {
        diff = a1[i] - a2[i];
        result += diff * diff;
    }
    return Math.sqrt(result);
};

/**
 * Determine the index of the maximum value in an array.
 * @method arrayMinIndex
 * @param a1 A 1D array.
 * @return {Number} Index of the maximum value in the array.
 */
function arrayMaxIndex(a1) {
    'use strict';
    var result, resultIndex, i;

    result = Number.MIN_VALUE;
    resultIndex = -1;

    for (i = 0; i < a1.length; i += 1) {
        if (a1[i] > result) {
            result = a1[i];
            resultIndex = i;
        }
    }
    return resultIndex;
};


/**
 * Calculate the mean of one dimension in the 2D array a1.
 * @method arrayMean
 * @param a1 A 2D array.
 * @param idx The second dimension in a1 to calculate the mean of.
 * @return {Number} The mean of each idx element of a1.
 */
function arrayMean(a1, idx) {
    'use strict';
    var result, i;

    result = 0;
    for (i = 0; i < a1.length; i += 1) {
        result += a1[i].position[idx];
    }
    result /= a1.length;
    return result;
}

function headingMean(a1, idx) {
    'use strict';
    var result, i;

    result = 0;
    for (i = 0; i < a1.length; i += 1) {
        result += a1[i].heading[idx];
    }
    result /= a1.length;
    return result;
}

/**
 * Determine which multi-dimensional array element, from lst, is the nearest to a1.
 * @param a1 A single-dimension array that is searched for in lst.
 * @param lst A 2d array that contains arrays with the same length of a1.
 * @param k The number of neighbors to find.
 * @param maxDist The maximum distance to consider.
 * @return {Array} The k elements from lst that were the closest to a1.
 */
function kNearest(a1, lst, k, maxDist) {
    'use strict';
    var result = [], tempDist = [], idx = 0, worstIdx = -1, dist, agent;

    while (idx < lst.length) {
        agent = lst[idx];
        if (a1 !== agent) {
            dist = euclideanDistance(a1.position, agent.position);

            if (dist < maxDist) {
                if (result.length < k) {
                    result.push(agent);
                    tempDist.push(dist);
                    worstIdx = arrayMaxIndex(tempDist);
                } else {
                    if (dist < tempDist[worstIdx]) {
                        tempDist[worstIdx] = dist;
                        result[worstIdx] = agent;
                        worstIdx = arrayMaxIndex(tempDist);
                    }
                }
            }
        }

        idx += 1;
    }

    return result;
}

function moveAgents() {
	'use strict';

	var targetAngle = [];
	var separation = [];
	var alignment = [];
	var cohesion = [];
	var turnAmount = [];

	// loop over all particles.
	for (var i = 0; i < agents.length; i += 1) {
		///////////////////////////////////////////////////////////////
		// Begin implementation of three very basic laws of flocking.
		///////////////////////////////////////////////////////////////
		var neighbors = kNearest(agents[i], agents, 5, 100);
		var nearest = kNearest(agents[i], agents, 5, 0.1);

		// 1. Separation - avoid crowding neighbors (short range repulsion)
		separation = [0,0];
		if (nearest.length > 0) {
			var meanX = arrayMean(nearest, 0);
			var meanY = arrayMean(nearest, 1);
			var meanZ = arrayMean(nearest, 2);
			var dx = meanX - agents[i].position[0];
			var dy = meanY - agents[i].position[1];
			var dz = meanZ - agents[i].position[2];

			var rotx = Math.atan2( dy, dz )
			var roty = Math.atan2( dx * Math.cos(rotx), dz )

			separation[0] = rotx - agents[i].heading[0];
			separation[0] += Math.PI;

			separation[1] = roty - agents[i].heading[1];
			separation[1] += Math.PI;
		}

		// 2. Alignment - steer towards average heading of neighbors
		alignment = [0,0];

		if (neighbors.length > 0) {
			alignment[0] = headingMean(agents, 0) - agents[i].heading[0];
			alignment[1] = headingMean(agents, 1) - agents[i].heading[1];
		}

		// 3. Cohesion - steer towards average position of neighbors (long range attraction)
		cohesion = [0,0];

		if (neighbors.length > 0) {
			var meanX = arrayMean(agents, 0);
			var meanY = arrayMean(agents, 1);
			var meanZ = arrayMean(agents, 2);
			var dx = meanX - agents[i].position[0];
			var dy = meanY - agents[i].position[1];
			var dz = meanZ - agents[i].position[2];


			var rotx = Math.atan2( dy, dz )
			var roty = Math.atan2( dx * Math.cos(rotx), dz )
			//rotz = Math.atan2( Math.cos(rotx), Math.sin(rotx) * Math.sin(roty) )

			cohesion[0] = rotx - agents[i].heading[0];
			cohesion[1] = roty - agents[i].heading[1];
		}

		// perform the turn
		// The degree to which each of the three laws is applied is configurable.
		// The three default ratios that I provide work well.

		for(var j=0;j<2;j++) {
			turnAmount[j] = (cohesion[j] * controls.cohesion) + (alignment[j] * controls.alignment) + (separation[j] * controls.separation);

			if( turnAmount[j]<-constMaxTurn ) {
				turnAmount[j] = -constMaxTurn;
			} else if( turnAmount[j]>constMaxTurn ) {
				turnAmount[j] = constMaxTurn;
			}

			agents[i].heading[j] += turnAmount[j];
		}

		///////////////////////////////////////////////////////////////
		// End implementation of three very basic laws of flocking.
		///////////////////////////////////////////////////////////////
    }
}


function updateBOID(boid) {
	// adjust position
	var yaw = boid.heading[0];
	var pitch = boid.heading[1];

	var dx = constSpeed * Math.cos(yaw) * Math.cos(pitch);
	var dy = constSpeed * Math.sin(yaw) * Math.cos(pitch);
	var dz = constSpeed * Math.sin(pitch);

    boid.position[0] += (dx * constSpeed);
    boid.position[1] += (dy * constSpeed);
    boid.position[2] += (dz * constSpeed);


    if(controls.boundaries=='Wrap') {
    	// handle wrap
    	for(var i=0;i<boid.position.length;i++) {
    		if( boid.position[i]<-constWorldMax ) {
    			boid.position[i] += constWorldMax*2;
    		} else if( boid.position[i]>constWorldMax ) {
    			boid.position[i] -= constWorldMax*2;
    		}
    	}
    } else if(controls.boundaries=='Hard') {
    	// handle wrap
    	for(var i=0;i<boid.position.length;i++) {
    		if( boid.position[i]<-constWorldMax ) {
    			boid.position[i] = -constWorldMax;
    			boid.heading[i] += Math.PI;
    		} else if( boid.position[i]>constWorldMax ) {
    			boid.position[i] = constWorldMax;
    			boid.heading[i] += -Math.PI;
    		}
    	}
    }

	// update the mesh
	boid.mesh.position.x = boid.position[0];
	boid.mesh.position.y = boid.position[1];
	boid.mesh.position.z = boid.position[2];

	boid.mesh.rotation.x = pitch;
	boid.mesh.rotation.z = yaw-(Math.PI/2);
}

function createBoids() {
	for (var i = 0; i < agents.length; i++) {
		scene.remove(agents[i].mesh);
	}


    agents = [];
    for (var i = 0; i < controls.boidCount; i++) {
    	var boid = {
    		position : [
    			Math.floor(Math.random() * constWorldMax*2)-constWorldMax,
    			Math.floor(Math.random() * constWorldMax*2)-constWorldMax,
    			Math.floor(Math.random() * constWorldMax*2)-constWorldMax],

            heading : [ 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random() ],
            boid : null
            };

        var mesh = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.5, 2, 8, 1, false), new THREE.MeshNormalMaterial());
    	mesh.rotation.order  = "ZXY";

    	mesh.overdraw = true;
		boid.mesh = mesh;
		updateBOID(boid);
    	scene.add(boid.mesh);
    	agents.push(boid);
    }
}


function createScene() {
	createBoids();

    var geom = new THREE.Geometry();
    geom.vertices.push(new THREE.Vector3(-constWorldMax,-constWorldMax,-constWorldMax));
    geom.vertices.push(new THREE.Vector3(-constWorldMax,constWorldMax,-constWorldMax));
    geom.vertices.push(new THREE.Vector3(constWorldMax,constWorldMax,-constWorldMax));
    geom.vertices.push(new THREE.Vector3(constWorldMax,-constWorldMax,-constWorldMax));
    geom.vertices.push(new THREE.Vector3(-constWorldMax,-constWorldMax,-constWorldMax));

    geom.vertices.push(new THREE.Vector3(-constWorldMax,-constWorldMax,constWorldMax));
    geom.vertices.push(new THREE.Vector3(constWorldMax,-constWorldMax,constWorldMax));
    geom.vertices.push(new THREE.Vector3(constWorldMax,-constWorldMax,-constWorldMax));

    geom.vertices.push(new THREE.Vector3(constWorldMax,constWorldMax,-constWorldMax));
    geom.vertices.push(new THREE.Vector3(constWorldMax,constWorldMax,constWorldMax));
    geom.vertices.push(new THREE.Vector3(-constWorldMax,constWorldMax,constWorldMax));
    geom.vertices.push(new THREE.Vector3(-constWorldMax,constWorldMax,-constWorldMax));
    geom.vertices.push(new THREE.Vector3(-constWorldMax,constWorldMax,constWorldMax));

    geom.vertices.push(new THREE.Vector3(-constWorldMax,-constWorldMax,constWorldMax));
    geom.vertices.push(new THREE.Vector3(constWorldMax,-constWorldMax,constWorldMax));
    geom.vertices.push(new THREE.Vector3(constWorldMax,constWorldMax,constWorldMax));

	geom.computeFaceNormals();
	geom.computeVertexNormals();

	// material
	var mat = new THREE.LineBasicMaterial({color: 0xff0000});
	var mesh = new THREE.Line(geom, mat, THREE.LineStrip);

	scene.add(mesh);

}




function animate() {
    window.requestAnimationFrame(animate);
    render();
}


function render() {
    var delta = clock.getDelta();

	for(var i=0;i<agents.length;i++) {
    	updateBOID(agents[i]);
    }
    moveAgents();


    // move camera, if requested
	if( controls.view == 'Boid' ) {
		camera.position.x = agents[0].position[0];
		camera.position.y = agents[0].position[1];
		camera.position.z = agents[0].position[2];

		var yaw = agents[0].heading[0];
		var pitch = agents[0].heading[1];

		var dx = constSpeed * Math.cos(yaw) * Math.cos(pitch);
		var dy = constSpeed * Math.sin(yaw) * Math.cos(pitch);
		var dz = constSpeed * Math.sin(pitch);

		camera.lookAt(new THREE.Vector3(
    		agents[0].position[0] + dx*3,
    		agents[0].position[1] + dy*3,
    		agents[0].position[2] + dz*3));
	} else {
		cameraControls.update(delta);
	}


    renderer.render(scene, camera);
}


function init() {
    canvasWidth = 800;
    canvasHeight = 500;//window.innerHeight;
    var canvasRatio = 1;// canvasWidth / canvasHeight;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, -200, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);

    var gui = new dat.GUI();
    gui.add(controls, 'cohesion', 0.0, 1.0).step(0.01);
    gui.add(controls, 'alignment', 0.0, 1.0).step(0.01);
    gui.add(controls, 'separation', 0.0, 1.0).step(0.01);
    var boidCountControl = gui.add(controls, 'boidCount', 1, 1000).step(10);
    boidCountControl.onChange(createBoids);
    var boundaryTypes =  ['Wrap', 'Hard'];
    gui.add(controls, 'boundaries', boundaryTypes);
    var viewTypes =  ['Global', 'Boid'];
    gui.add(controls, 'view', viewTypes);

}


function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}


// try {
    init();
    createScene();
    addToDOM();
    render();
    animate();
/**
} catch(e) {
    var errorMsg = "Error: " + e;
    document.getElementById("msg").innerHTML = errorMsg;
}
**/
