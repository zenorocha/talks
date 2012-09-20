			var count = 0;
		
			function init() {
				if (window.DeviceOrientationEvent) {
					console.log("DeviceOrientation is supported on this device");
				} else if (window.OrientationEvent) {
					console.log("DeviceOrientation is supported on this device via MozOrientation");
				}
			}
			
			function init2() {
				if (window.DeviceOrientationEvent) {
					// Listen for the deviceorientation event and handle DeviceOrientationEvent object
					window.addEventListener('deviceorientation', devOrientHandler, false);
				} else if (window.OrientationEvent) {
					// Listen for the MozOrientation event and handle OrientationData object
					window.addEventListener('MozOrientation', mozDevOrientHandler, false);
				}
			}
			
			function init3() {
				if (window.DeviceOrientationEvent) {
					document.getElementById("doEvent").innerHTML = "DeviceOrientation";
					// Listen for the deviceorientation event and handle the raw data
					window.addEventListener('deviceorientation', function(eventData) {
						// gamma is the left-to-right tilt in degrees, where right is positive
						var tiltLR = eventData.gamma;
						
						// beta is the front-to-back tilt in degrees, where front is positive
						var tiltFB = eventData.beta;
						
						// alpha is the compass direction the device is facing in degrees
						var dir = eventData.alpha
						
						// deviceorientation does not provide this data
						var motUD = null;
						
						// call our orientation event handler
						deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
						}, false);
				} else if (window.OrientationEvent) {
					document.getElementById("doEvent").innerHTML = "MozOrientation";
					window.addEventListener('MozOrientation', function(eventData) {
						// x is the left-to-right tilt from -1 to +1, so we need to convert to degress
						var tiltLR = eventData.x * 90;
						
						// y is the front-to-back tilt from -1 to +1, so we need to convert to degress
						// We also need to invert the value so tilting the device towards us (forward) 
						// results in a positive value. 
						var tiltFB = eventData.y * -90;
						
						// MozOrientation does not provide this data
						var dir = null;
						
						// z is the vertical acceleration of the device
						var motUD = eventData.z;
						
						deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
						}, false);
				} else {
					document.getElementById("doEvent").innerHTML = "Not supported on your device or browser.  Sorry."
				}
			}
		
			function deviceOrientationHandler(tiltLR, tiltFB, dir, motionUD) {
				document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
				document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
				document.getElementById("doDirection").innerHTML = Math.round(dir);
				document.getElementById("doMotionUD").innerHTML = motionUD;
				
				// Apply the transform to the image
				document.getElementById("imgLogo").style.webkitTransform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
				document.getElementById("imgLogo").style.MozTransform = "rotate("+ tiltLR +"deg)";
				document.getElementById("imgLogo").style.transform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
			}
			
			
			// Some other fun rotations to try...
			//var rotation = "rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
			//var rotation = "rotate("+ tiltLR +"deg) rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";