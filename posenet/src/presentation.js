// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  Image,
  Notes
} from 'spectacle';

import InstagramEmbed from 'react-instagram-embed';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');
require('./style.css');

const theme = createTheme(
  {
    primary: '#FDFFFC',
    secondary: '#E71D36',
    tertiary: '#FDFFFC',
    quartenary: '#011627',
  },
  {
    primary: 'Helvetica',
    secondary: 'Helvetica',
  }
);

const Caption = ({text}) => (
 <Text textSize={16}>{text}</Text>
)

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['fade']}
        transitionDuration={500}
        theme={theme}
        progress='none'
      >
        <Slide bgColor="quartenary">
          <Heading size={1} fit lineHeight={1} textColor="primary">
            PoseNet in Tensorflow.js
          </Heading>
          <Image src={require('./images/awesomemultipose.gif')} />
          <Text textColor="primary">by Dan Oved <img src={require('./images/twitter.svg')} height='30px' />@oveddan</Text>
        </Slide>
        <Slide transition={['fade']} bgColor="quartenary">
          <Heading size={2} textColor="primary">
            <a href="https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html">Live Demo</a>
          </Heading>
        </Slide>
       <Slide bgColor="quartenary">
          <Heading size={1} >
            How has Pose Estimation been <strong>Used?</strong>
          </Heading>
        </Slide>
        <Slide bgColor="quartenary">
          <Text textColor="primary">Chris Milk - The Treachery of Sanctuary (2012)</Text>
          <Image src={require('./images/chris_milk_treachery.gif')} />
        </Slide>
        <Slide>
          <Text>Fitness</Text>
          <Image src={require('./images/gait.jpg')} />
          <Caption text='runnerseed.com - Gait Analysis' />
        </Slide>
        <Slide bgColor="quartenary">
          <Text textColor="primary">Daniel Rozin - Pom Pom Mirror (2015)</Text>
          <Image src={require('./images/pom_pom.gif')} />
        </Slide>
        <Slide bgColor="quartenary">
          <Text textColor="primary">Golan Levin - Ghost Pole Propagator II (2016)</Text>
          <Image src={require('./images/ghost_pole.gif')} />
        </Slide>
        <Slide bgColor="quartenary">
          <InstagramEmbed url='https://www.instagram.com/p/BbkKLiegrTR/'
          maxWidth={380}
          containerTagName='div'
          />
        </Slide>
        <Slide bgColor="quartenary">
          <InstagramEmbed url='https://www.instagram.com/p/BOwc--TBL7Z/'
          maxWidth={380}
          containerTagName='div'
          />
       </Slide>
        <Slide bgColor="quartenary">
          <InstagramEmbed url='https://www.instagram.com/p/BOz--Odh_AR/'
          maxWidth={380}
          containerTagName='div'
          />
       </Slide>
       <Slide bgColor="primary">
          <Heading size={3}>How has Pose Estimation been done before?</Heading>
       </Slide>
       <Slide>
        <Image src={require('./images/kinect_pose.png')} />
       </Slide>
       <Slide>
         <Heading size={3}>Kinect (2010-2013) (contd.)</Heading>
         <List>
          <ListItem>25-point skeleton for up to 6 people</ListItem>
          <ListItem>Difficult to hide hardware</ListItem>
          <ListItem><strong>Requires Windows</strong></ListItem>
          <ListItem>Relies on depth sensing camera</ListItem>
          <ListItem>Must be done live</ListItem>
        </List>
        <Notes>
          <h4>Must be done live</h4>
          <p>Since relies on depth sensing camera, cannot use on existing videos.</p>
        </Notes>
       </Slide>
       <Slide>
         <Heading size={4}>OpenPose (April 2017)</Heading>
         <Image src='https://github.com/CMU-Perceptual-Computing-Lab/openpose/raw/master/doc/media/dance.gif' />
       </Slide>
       <Slide>
         <Heading size={4}>OpenPose (April 2017)</Heading>
         <List>
           <ListItem>17-point skeleton for many people (19)</ListItem>
           <ListItem>RGB Images</ListItem>
           <ListItem>Works with occluded figures</ListItem>
           <ListItem>Up to 8 fps on powerful GPU with CUDA installed (more on that later)</ListItem>
           <ListItem>License: Academic (non-commercial)</ListItem>
         </List>
       </Slide>
       <Slide bgImage={require('./images/openpose.png')} />
       <Slide>
         <Heading size={4}>How can OpenPose do this with just an RGB image?</Heading>
         <Text>A <strong>machine learning model</strong> trained on the <strong>COCO human pose</strong> dataset</Text>
       </Slide>
       <Slide>
         <Heading size={6}>What is Machine Learning?</Heading>
         <Image src={require('./images/whatismachine.png')} />
         <Caption text='Slide: Yann Lecunn' />
       </Slide>
       <Slide>
         <Heading size={6}>Classification</Heading>
         <Text><strong>What</strong> is in this image?</Text>
         <Image src={require('./images/images_to_caption.png')} />
         <Caption text="Krizhevsky et al."/>
       </Slide>
       <Slide>
         <Heading size={6}>Detection</Heading>
         <Text><strong>Where</strong> are the objects in this image?</Text>
         <Text><strong>What</strong> are those objects?</Text>
         <Image src={require('./images/detection.png')} style='width: 70%' />
         <Caption text="Mask RCNN"/>
       </Slide>       
       <Slide>
         <Heading size={6}>Segmentation</Heading>
         <Text><strong>Which pixels</strong> are part of different objects?</Text>
         <Text><strong>What</strong> are those objects?</Text>
         <Image src={require('./images/segmentation.png')} style='width: 65%' />
         <Caption text="Mask RCNN"/>
       </Slide>         
       <Slide>
         <Heading size={6}>Human Pose (Keypoints)</Heading>
         <Text><strong>Where</strong> are the person <strong>keypoints?</strong></Text>
         <Text><strong>Which person</strong> does a keypoint belong to?</Text>
         <Image src={require('./images/what_is_pose_estimation.png')} style='height: 400px' />
       </Slide>         
       <Slide>
         <Heading size={6}>Machine Learning Typically Done by training a (Convolutional) Neural Network</Heading>
         <Image src={require('./images/neuralnetwork.jpeg')} />
         <Notes>
           <h4>Explaining how you get labeled data</h4>
           <p>Feed image through network</p>
           <p>Get prediction</p>
           <p>Go back and train neurons based on error of prediction</p>
           <p>Feed another image forward</p>
         </Notes>
       </Slide>
       <Slide>
         <Heading size={6}>Supervised Learning requires Large Amounts of Labeled Data</Heading>
         <Image src={require('./images/imagenet.jpg')} />
         <Caption text="ImageNet - 14 million images with over 20 thousand categories" />
       </Slide>
       <Slide>
         <Heading size={4}>COCO keypoints dataset</Heading>
         <Text>Currently contains <strong>200,000</strong> images, <strong>250,000</strong> labeled person instances with 17 keypoints</Text>
         <Image src={require('./images/coco.png')} />
       </Slide>
       <Slide>
         <Heading size={6}>After training, <strong>pre-trained model</strong> can be used for <strong>inference</strong></Heading>
         <Image src={require('./images/inference.svg')} style='width: 25%'/>
       </Slide>
       <Slide>
          <Heading size={6}>General goal of researchers - <strong>Highest AP Accuracy</strong></Heading>
          <Image src={require('./images/accuracy.png')} /> 
       </Slide>
       <Slide>
         <Heading size={6}>Environment needed to run models are not accessable to most people</Heading>
         <Image src={require('./images/tesla.png')} />
       </Slide>
       <Slide>
         <Image src='http://www.danioved.com/images/presence.gif' />
       </Slide>
       <Slide>
         <Heading size={6}>RunwayML - "Machine Learning for Everyone"</Heading>
         <Image src={require('./images/runwayml.png')} />
       </Slide>
       <Slide>
         <Heading size={6}>To get decent performance, need powerful NVidia GPU with CUDA installed</Heading>
         <Image src={require('./images/openpose_benchmark.png')} />
         <Image src={require('./images/openposecpu.png')} />
       </Slide>
       <Slide>
         <Heading size={6}>Can set this up in the cloud...</Heading>
         <Image src={require('./images/exportToCloud.svg')} style={{width: '25%'}} />
       </Slide>
       <Slide>
         <Heading size={6}>...or download and run it on "the Edge"</Heading>
         <Image src={require('./images/EdgeComputing.svg')} />
       </Slide>
        <Slide>
        <Heading size={6}>PoseNet in Tensorflow.js</Heading>
        <text>in the <strong>browser,</strong> using the <strong>GPU,</strong> with a <strong>few lines of code. </strong></text>
        <text>6 fps on IPhone 8, 15 fps on Macbook Pro, 30 fps on powerful gpu.</text>
      </Slide>
      <Slide>
        <Heading size={6}>To install/use PoseNet:</Heading>
        <Text>script tag:</Text>
        <CodePane
            lang="html"
            source={`
            <script src="https://unpkg.com/@tensorflow/tfjs"></script>
            <script src="https://unpkg.com/@tensorflow-models/posenet"></script>

            <!--or with ml5:-->

            <script src="https://unpkg.com/ml5" type="text/javascript"></script>
            `}
            padding="0px"
            overflow="overflow"
          />
       <Text>with npm install:</Text>
        <CodePane
            lang="js"
            source={`
              npm install @tensorflow-models/posenet 
            `}
            padding="0px"
            overflow="overflow"
          />
      </Slide>
      <Slide>
        <Heading size={6}>How is this possible?</Heading>
        <Image src={require('./images/tensorflowjs.png')} />
        <List>
          <ListItem><strong>GPU</strong>-Accelerated via WebGL</ListItem>
          <ListItem>Access to <strong>sensors</strong> in the browser (camera, microphone, accelerometer, location)</ListItem>
          <ListItem>Data stays <strong>private</strong></ListItem>
        </List>
      </Slide>
      <Slide>
        <Image src={require('./images/InBrowserML.png')} />
        <Notes>
          Talk about all the sensors that are available.

          WebGl is a standard and available everywhere, not matter what graphics card.  so It can run on that.
        </Notes>
      </Slide>
      <Slide>
        <Heading size={6}>Data Privacy</Heading>
        <Image src={require('./images/EdgeComputing.svg')} />
      </Slide>
      <Slide>
        <Text>PoseNet gets 6 fps on IPhone 8, 15 fps on Macbook Pro, 30 fps on powerful gpu - <strong>how?</strong></Text>
        <Image src={require('./images/awesomemultipose.gif')} />
      </Slide>
      <Slide>
        <Heading size={6}>Models used in research not meant to run on mobile</Heading>
        <Image src={require('./images/alexnet.png') }/>
        <Caption text='AlexNet - 60 million parameters' />
      </Slide>
      <Slide>
        <Heading size={6}>OpenPose uses VGG architecture</Heading>
        <Image src={require('./images/vgg16.png') }/>
        <Caption text='VGG - 138 million parameters.  200-500 MB' />
      </Slide>
      <Slide>
        <Heading size={6}>MobileNets (April 2017)</Heading>
        <Image src={require('./images/mobilenets.png')} />
      </Slide>
      <Slide>
        <Image src={require('./images/mobilenets_accuracy.png')} />
        <Text>
          MobileNets - between 8 to 9 times less computation at only a small reduction in accuracy
        </Text>
        <Notes>This was implemented in tf.js, and paved the way for us to do it in PoseNet.</Notes>
      </Slide>
      <Slide>
        <Heading size={6}>PoseNet models</Heading>
        <Image src={require('./images/mobilenet_architectures.jpg')} />
        <Text>Loading a model:</Text>
        <CodePane
            lang="js"
            source={`
              var model = await posenet.load(0.75);
            `}
            padding="0px"
            overflow="overflow"
          />
        <Notes><strong>Ask who has seen await syntax before?</strong>
        Say will not go into details, but it means that you have a function that will take some time to execute.
        Here it is going to the cloud, and downloading the model
        </Notes>
      </Slide>
     <Slide>
        <Heading size={6}>Model Outputs -> single pose</Heading>
        <Image src={require('./images/singlepose_desc.png')} />
      </Slide>
      <Slide>
        <Heading size={6}>Keypoints</Heading>
        <Image src={require('./images/keypoints.png')} style='height: 500px'/>
        <Caption text='illustration: Allexis Gallo' />
      </Slide>
      <Slide>
        <Heading size={6}>Estimating a single pose</Heading>
        <Image src={require('./images/singlevis.png')} />
        <Text><a href='https://posenet-demos.netlify.com/abaeeeba114a54784c11cb49f1149e65.html'>Estimation Demo</a></Text>
      </Slide>
      <Slide>
        <Heading size={6}>Estimating a single pose</Heading>
        <CodePane
            lang="js"
            source={`
              // load the model
              var model = await posenet.load(0.75);
              // get an image element
              var image = document.getElementById('people');
              // estimate a pose
              var pose = await model.estimateSinglePose(image);
              // print the outputs
              console.log(pose);
            `}
            padding="0px"
            overflow="overflow"
          />
        <CodePane
           language="json"
           source={`
           {
            "score": 0.32371445304906,
            "keypoints": [
              {
                "position": {
                  "y": 76.291801452637,
                  "x": 253.36747741699
                },
                "part": "nose",
                "score": 0.99539834260941
              },
              {
                "position": {
                  "y": 71.10383605957,
                  "x": 253.54365539551
                },
                "part": "leftEye",
                "score": 0.98781454563141
              }
              ...
           }
           `
          } 
          />
      </Slide>
      <Slide>
        <Heading size={6}>How can keypoints be grouped into person instances?</Heading>
        <Image src={require('./images/singleposeissues.png')} />
      </Slide>
      <Slide>
        <Heading size={6} >Two-State with Bounding Boxes (April 2017)</Heading>
        <Image src={require('./images/two_stage.png')} />
        <Text fit><a href='https://arxiv.org/pdf/1701.01779'>Towards Accurate Multi-person Pose Estimation in the Wild</a></Text>
      </Slide>
 
      <Slide>
        <Heading size={6} >Part Displacement Graph (March 2018)</Heading>
        <Image src={require('./images/midrange.png')} />
        <Text fit><a href='https://arxiv.org/pdf/1803.08225.pdf'>PersonLab: Person Pose Estimation and Instance Segmentation with a Bottom-Up, Part-Based, Geometric Embedding Model</a></Text>
      </Slide>
      <Slide>
        <Heading size={6} >Multiple Pose Estimation</Heading>
        <Image src={require('./images/multivis.png')} />
        <Text><a href='https://posenet-demos.netlify.com/abaeeeba114a54784c11cb49f1149e65.html'>Estimation Demo</a></Text>
       </Slide>
       <Slide>
         <Image src={require('./images/ml5.png')} />
       </Slide>
       <Slide>
         <Heading size={4}>Workshop: get up and running with PoseNet in P5 with ml5.js</Heading>

         <List>
           <ListItem>Follow me on twitter: <a href='https://twitter.com/oveddan'>@oveddan</a></ListItem>
           <ListItem><a href='https://ml5js.org'>https://ml5js.org</a></ListItem>
           <ListItem><a href='https://github.com/tensorflow/tfjs-models/tree/master/posenet'>https://github.com/tensorflow/tfjs-models/tree/master/posenet</a></ListItem>
         </List>
       </Slide>
      </Deck>

    );
  }
}
