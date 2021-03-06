
import Body from './CarBody'
import Skybox from './Skybox'
import {CardProps} from './Props'
const THREE = (window as any).THREE
const TweenLite = (window as any).TweenLite

// var Card_1 = require('./30');
// var CardProps = require('./2');
// var Props_1 = require('./1');
// var Body_1 = require('./26');
// var Floor_1 = require('./33');
// var Skybox_1 = require('./35');

export default class ViewTour{
    sceneWGL: any;
    rendererWGL: any;
    sceneCSS: any;
    rendererCSS: any;
    cam: any;
    mobileView: boolean;
    sectionPrev: number;
    sectionActive: number;
    card: any;
    carProps: any;
    dirLight: any;
    ambLight: any;
    skybox: any;
    car: any;
    floor: any;
    continer: any

  constructor(_scene: any, _renderer: any, _cam: any, _vp: { x: number; y: number; }) {
    this.sceneWGL = _scene;
    this.rendererWGL = _renderer;
    this.sceneCSS = new THREE.Scene();
    this.rendererCSS = new THREE.CSS3DRenderer();
    this.rendererCSS.setSize(_vp.x, _vp.y);
    this.continer = document.getElementById('CSSCanvas')
    this.continer.appendChild(this.rendererCSS.domElement)
    var camOptions = {
      distance: 6,
      focusPos: {
        x: 0,
        y: 1,
        z: 0
      },
      rotation: {
        x: -90,
        y: 0
      },
      distRange: {
        max: 7,
        min: 5
      },
      rotRange: {
        xMax: Number.POSITIVE_INFINITY,
        xMin: Number.NEGATIVE_INFINITY,
        yMax: 90,
        yMin: 0
      },
      smartUpdates: true
    }
    this.cam = _cam;
    this.cam.readOptions(camOptions);
    this.mobileView = _vp.x <= _vp.y * 1.2 ? true : false;
    this.sectionPrev = this.sectionActive = -1;
    // this.card = new Card_1.default(this.sceneCSS);
    this.carProps = new CardProps()
    this.dirLight = new THREE.DirectionalLight(0, 0.7);
    this.dirLight.name = 'dirLight'
    this.dirLight.position.set(0, 1, 1);
    this.sceneWGL.add(this.dirLight);
    this.ambLight = new THREE.AmbientLight(0, 0.5);
    this.ambLight.name = 'ambLight'
    this.sceneWGL.add(this.ambLight);
    this.skybox = new Skybox(this.sceneWGL, this.dirLight.color);
  }

  moveCamera(_cardProps: any) {
    if (this.sectionActive === -1)
      return;
    var targetAX = this.cam.rotActual.x;
    var targetAY = Math.max(this.cam.rotActual.y, 0);
    var minY = 0;
    if (_cardProps.camRot !== undefined) {
      targetAY = _cardProps.camRot.y;
      minY = targetAY < 0 ? targetAY : 0;
      var angleXDist = THREE.Math.euclideanModulo(_cardProps.camRot.x - this.cam.rotActual.x + 180, 360) - 180;
      targetAX += angleXDist < -180 ? angleXDist + 360 : angleXDist;
    }
    if (targetAX !== this.cam.rotActual.x || targetAY !== this.cam.rotActual.y) {
      TweenLite.to(this.cam.rotTarget, 2, {
        x: targetAX,
        y: targetAY
      });
    }
    var range = _cardProps.camRotRange;
    if (range !== undefined) {
      this.cam.setRotRange(targetAX + range.x, targetAX - range.x, Math.min(targetAY + range.y, 90), Math.max(targetAY - range.y, minY));
    } else {
      this.cam.setRotRange(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 90, 0);
    }
    TweenLite.to(this.cam.focusTarget, 2, _cardProps.camPos);
    TweenLite.to(this.cam, 2, {
      distTarget: _cardProps.camDist,
      onComplete: () => {
        this.cam.setDistRange(_cardProps.camDist + 1, _cardProps.camDist - 1);
      }
    });
  };
  initMeshes(_cargo:any){
    var xrayMesh = _cargo.getMesh('xrays');
    this.car = new Body(this.sceneWGL, _cargo);
    // this.floor = new Floor_1.default(this.sceneWGL, this.carProps.pos, _cargo);
    this.skybox.setCubeTexture(_cargo.getCubeTexture('envSkybox'));
    var freeProps = this.mobileView ? CardProps.Mobile[7] : CardProps.Desktop[7];
    TweenLite.to(this.dirLight.color, 3, {
      r: 1,
      g: 1,
      b: 1
    });
    TweenLite.to(this.ambLight.color, 3, {
      r: 1,
      g: 1,
      b: 1
    });


    TweenLite.to(this.cam.rotTarget, 3, {
      x: -125,
      y: 5
    });
    TweenLite.to(this.cam.focusTarget, 3, { y: freeProps.camPos.y }); // (0, 1, 0)
    TweenLite.to(this.cam, 3, { distTarget: freeProps.camDist }); // 8
    this.cam.setDistRange(freeProps.camDist + 1, freeProps.camDist - 1);
  }

  goToSection(index: string | number) {
    // var sectProps = this.mobileView ? CardProps.Mobile[index] : CardProps.Desktop[index];
    // this.sectionPrev = this.sectionActive;
    // this.sectionActive = index;
    // if (sectProps.inverted === true) {
    //   TweenLite.to(this.dirLight.color, 1, {
    //     r: 0.063,
    //     g: 0.075,
    //     b: 0.094
    //   });
    //   TweenLite.to(this.ambLight.color, 1, {
    //     r: 0.063,
    //     g: 0.075,
    //     b: 0.094
    //   });
    // } else {
    //   TweenLite.to(this.dirLight.color, 1, {
    //     r: 1,
    //     g: 1,
    //     b: 1
    //   });
    //   TweenLite.to(this.ambLight.color, 1, {
    //     r: 1,
    //     g: 1,
    //     b: 1
    //   });
    // }
    // if (this.sectionPrev === 1) {
    //   this.car.carBatts.hide();
    // } else if (this.sectionPrev === 2) {
    //   this.car.carMotors.hide();
    // }
    // switch (index) {
    // case 0:
    //   break;
    // case 1:
    //   this.car.carBatts.show();
    //   break;
    // case 2:
    //   this.car.carMotors.show();
    //   break;
    // case 3:
    // case 4:
    // case 5:
    //   TweenLite.to(this.carProps, 3, {
    //     speed: 0,
    //     ease: Power2.easeOut
    //   });
    //   break;
    // case 6:
    //   break;
    // case 7:
    //   this.card.hide();
    //   break;
    // }
    // this.card.show(index, sectProps);
    // this.moveCamera(sectProps);
  }

  enterFreeDriving(sectProps: { camPos: any; }) {
    TweenLite.to(this.cam.focusTarget, 1, sectProps.camPos);
    this.cam.setRotRange(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 90, 0);
  }

  knobMoved(_knobPos: any) {
    this.cam.forceUpdate = true;
    this.carProps.onKnobMove(_knobPos, this.sectionActive);
  }

  frontLightsClicked(_index: any) {
    this.cam.forceUpdate = true;
    this.carProps.changeHeadlights(_index);
  }

  onWindowResize(_vp: { x: number; y: number; }) {
    // this.rendererCSS.setSize(_vp.x, _vp.y);
    // if (this.sectionActive === -1)
    //   return;
    if (_vp.x <= _vp.y * 1.2 && this.mobileView !== true) {
      this.mobileView = true;
      this.moveCamera(CardProps.Mobile[this.sectionActive]);
      this.card.setPosition(CardProps.Mobile[this.sectionActive].position);
    } else if (_vp.x > _vp.y * 1.2 && this.mobileView !== false) {
      this.mobileView = false;
      this.moveCamera(CardProps.Desktop[this.sectionActive]);
      this.card.setPosition(CardProps.Desktop[this.sectionActive].position);
    }
  }

  update(t: any) {
    if (this.carProps.speed > 0 || this.carProps.wAngleInner !== 0 || this.carProps.longitMomentum !== 0) {
      this.cam.forceUpdate = true;
    }
    if (this.cam.update() === false) {
      return false;
    }
    this.carProps.update(t);
    this.car.update(this.carProps);

    // 直线光与镜头方向一致
    this.dirLight.position.copy(this.cam.camera.position);
    // this.dirLight.position.y += 1;

    this.rendererWGL.render(this.sceneWGL, this.cam.camera);
    // this.cam.camera.position.multiplyScalar(this.carProps.GOLDEN_RATIO);
    // this.rendererCSS.render(this.sceneCSS, this.cam.camera);
    return true;
  }
}