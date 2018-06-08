// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
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
    tertiary: '#2EC4B6',
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
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['zoom']} bgColor="quartenary">
          <Heading size={1} fit lineHeight={1} textColor="primary">
            PoseNet in Tensorflow.js
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1}>
             A <strong>machine learning</strong> model which allows for <strong>real-time</strong> human pose estimation in the <strong>browser.</strong>
          </Text>
          <Image src='http://www.danioved.com/images/posenet.gif' />
        </Slide>
        <Slide transition={['fade']} bgColor="tertiary">
          <Heading size={2} textColor="primary">
            <a href="https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html">Live Demo</a>
          </Heading>
        </Slide>
        <Slide bgColor="quarternary">
          <Heading size={2} fit>
            What is Pose Estimation?
          </Heading>
          <Image src={require('./images/what_is_pose_estimation.png')} />
          <Notes>
            <h4>Computer Vision Technique</h4>
            <h5>Detect human figures in <b>image</b></h5>
            <h5>Detect where <b>body parts</b> are</h5>
          </Notes>
        </Slide>
        <Slide bgColor="quartenary">
          <Heading size={1} >
            What has it used for?
          </Heading>
        </Slide>
        <Slide bgColor="quartenary">
          <Text textColor="primary">Chris Milk - The Treachery of Sanctuary (2012)</Text>
          <Image src={require('./images/chris_milk_treachery.gif')} />
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
         <Image src={require('./images/detection.png')} />
         <Caption text="Mask RCNN"/>
       </Slide>       
       <Slide>
         <Heading size={6}>Segmentation</Heading>
         <Text><strong>Which pixels</strong> are part of different objects?</Text>
         <Text><strong>What</strong> are those objects?</Text>
         <Image src={require('./images/segmentation.png')} />
         <Caption text="Mask RCNN"/>
       </Slide>         
       <Slide>
         <Heading size={6}>Human Pose (Keypoints)</Heading>
         <Text><strong>Where</strong> are the person <strong>keypoints?</strong></Text>
         <Text><strong>Which person</strong> does a keypoint belong to?</Text>
         <Image src={require('./images/what_is_pose_estimation.png')} />
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
         <Image src={require('./images/labeled_data.png')} />
       </Slide>
       <Slide>
         <Heading size={4}>COCO dataset</Heading>
         <Text>Currently contains 200,000 images, 250,000 labeled person instances with 17 keypoints</Text>
         <Image src={require('./images/coco.png')} />
       </Slide>
       <Slide>
         <Heading size={4}>After training, pre-trained model can be used for "inference"</Heading>
         Show graphic of feeding image to model and getting data back.
       </Slide>
       <Slide>
          <Heading size={6}>General goal of researchers - <strong>Highest AP Accuracy</strong></Heading>
          <Image src={require('./images/accuracy.png')} /> 
       </Slide>
       <Slide>
         <Heading size={6}>Models are not accessable to most-people</Heading>
         <Image src={require('./images/tesla.png')} />
       </Slide>
       <Slide>
         Environment.
         Either C++ with caffe.
         Or python with tensorflow, caffe, or pytorch.
         For decent performance, requires GPU and CUDA

         Show sample system setup script
       </Slide>
       <Slide>
         Talk about Presence struggles
       </Slide>
       <Slide>
         Interlude: RunwayML
      </Slide>
      <Slide>
        Still problem with OpenPose
        C++ 
        or Cuda Setup.
        Can setup server, but then data needs to travel to the internet and back.
      </Slide>
      <Slide>
        Show performance table - with max gpu and cuda.
      </Slide>
      <Slide>
        Enter tensorflow.js
        Machine Learning in the browser
      </Slide>
      <Slide>
        Does GPU neural network using shaders.
        Install with command line, or via dropping script on page.
        Everything in javascript
      </Slide>
      <Slide>
        Access to all sensors available natively to browser:
        * Microphone
        * Webcam
        * Accelerometer
        * Location
        * Midi
      </Slide>
      <Slide>
        Pre-Trained model
        Ability to take pre-trained models done on the cloud in powerful servers,
        and download them to the browser to be used in real time.
      </Slide>
      <Slide>
        Show advancing capabilities of gpus on the edge.
      </Slide>
      <Slide>
        <Image src={require('./images/to_edge.png')} />
      </Slide>
      <Slide>
        Talk about PoseNet
      </Slide>
      <Slide>
        <Heading>PoseNet uses a model with a MobileNet architecture</Heading>
        <Image src={require('./images/mobilenets_accuracy.png')} />
        <Caption>Conor McDonald</Caption>
      </Slide>
      <Slide>
        High level FPS.
        Few lines of code
        Data stays private
        People can just go to url
        Developers can install very easily
      </Slide>
      <Slide>
      </Slide>
      </Deck>
    );
  }
}
