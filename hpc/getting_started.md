# Getting Started on NYU's HPC, for ITP Students

Did you know that NYU has powerful computing power available for free for students?  This workshop will be an introduction to [NYU's HPC,](https://www.nyu.edu/life/information-technology/research-and-data-support/high-performance-computing.html) an environment where you can run machine learning jobs with powerful GPUs for free.  To preview what's possible to use, check out the resources [available on the Prince Cluster](https://wikis.nyu.edu/display/NYUHPC/Clusters+-+Prince)

This workshop will be a series geared toward ITP students.  This first workshop of the series will go over:
In it we will go over:
1. What are the machine learning frameworks available
2. How to request an account and gain access.
3. How to login to the servers, and start jobs
4. What are the different options and GPUs available for running machine learning tasks
5. What are the different storage options for files, and where your files should be stored on the servers.  How to transfer files between your computer and the servers.

Some familiarity with the terminal will help you get the best out of this workshop.

Credit goes to [Cristóbal Valenzuela](https://github.com/cvalenzuela) and his original [quick reference to hpc](https://github.com/cvalenzuela/hpc)

## Overview of Machine Learning Frameworks

![Tensorflow Logo](https://i0.wp.com/www.jessicayung.com/wp-content/uploads/2016/12/tensorflow-logo.jpg?fit=225%2C225&ssl=1)

[Tensorflow](https://www.tensorflow.org/) is a machine learning framework that runs in python.  It has two versions:

    pip install tensorflow

Installs Tensorflow in python, to run **on the CPU**.  This works on most environments, and is good to get up and running, but becomes impossibly slow once you want to train and run deep neural networks.

    pip install tensorflow-gpu

Installs Tensorflow in python, to run **on the GPU**.  It provides a signnificant speed increase when training and running deep neural networks, and is pretty much required to do any sort of decent work with these types of models. It only works with **NVidia GPUs,** on **linux** or **Windows** machines. Additionally it requires specific versions of NVidia's **cuda** and **cudnn** to be installed, which is a non-trivial process.  

![Tensorflow.js](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQc5yX_NSKMq_xLEd4EB5nla7g6TovEajTZOvcmYzHx_OfYVvR)

Models trained in tensorflow in python can be converted to run in javascript using the [Tensorflow.js converter](https://www.tensorflow.org/js/guide/conversion).  This allows these trained models to be run using [tensorflow.js](https://www.tensorflow.org/js) in the browser or on your desktop using the terminal and node.js.

One of the nice things about tensorflow.js, is that its api mimics that of the python api, allowing models to be converted easily from python to tensorflow.js without much effort.  The other nice thing about tensorflow.js is that the framework is the same, but the backend, which is where the neural networks are run, can be changed easily.  These backends include:

* **tensorflow.js using the GPU in the browser** - this is the most common use case. This runs neuarl networks using GPU shaders in the browser.  The great thing about this is anyone can access and run these models by opening a url.
* **tensorflow.js in Node using the CPU** - is installed with `npm install @tensorflow/tfjs-node` Behind the scenes, this is bound to a C++ version of Tensorflow.  It is a way to run is a way to run tensorflow in javascript using node.js, with all the performance benefits of C++
* **tensorflow.js in Node using the GPU** - it is installed with `npm install @tensorflow/tfjs-node-gpu` . Behind the scenes, this installs a CUDA version of tensorflow, and you call this in javascript using node.js.   You get all of the benefits of the fast performance using the GPU, but get to write code in javascript.  This requires a **linux** or **windows** computer with an **NVidia GPU and CUDA installed.**

![ml5 logo](https://ml5js.org/static/1552ab71e134d3f6aaed0c39fbc0b83c/94d86/logo-purple-circle.png) 

[ml5](https://ml5js.org/), created by students at ITP, is an easy to use wrapper around tensorflow.js that comes with some pretrained models that can be loaded and used with a few lines of code.

With the HPC, **you can train a model using the GPU's on the cluster, convert them into tensorflow.js models, and run them in ml5.**

## Gaining access

To get access to the HPC, [visit this site](https://wikis.nyu.edu/display/NYUHPC/Requesting+an+HPC+account+with+IIQ)

## Clusters and Storage

HPC consists of different computing clusters; the one we will want to work with is the [Prince Cluster.](https://wikis.nyu.edu/display/NYUHPC/Clusters+-+Prince)

### Logging In via SSH

Logging into the HPC is done via ssh. 

**When connected to the NYU network,** and if your NYU id has been given access you can login to the Prince Cluster with:

    ssh NYU_USERNAME@prince.hpc.nyu.edu

When prompted for your password, enter your NYU login password

Replace NYU_USERNAME with the name part of your NYU email. For example, for me this would be:

    ssh do838@prince.hpc.nyu.edu
  
But who likes typing and remember these long urls everytime you have to login?  Let's make this easier by creating an ssh config file, which lets you login in a much easier way.  Here is an example file which would solve all of your login needs for connecting to the ssh:

```sh
# Host for ssh'ing into the prince cluster when on the NYU network
Host prince
  HostName prince.hpc.nyu.edu
  User NYU_USERNAME

# Host for 'tunneling' into the hpc when logging in from outside of the NYU network (i.e. at home)
Host hpcgwtunnel
   HostName gw.hpc.nyu.edu
   ForwardX11 no
   LocalForward 8025 dumbo.hpc.nyu.edu:22
   LocalForward 8026 prince.hpc.nyu.edu:22
   User NYU_USERNAME

# Host for sshing into the prince cluster when tunneled in from outside of the NYU network (i.e. at home)
Host princetunnel
  HostName localhost
  Port 8026
  ForwardX11 yes
  User NYU_USERNAME
```

To set this file up for youself, run the command:

    nano ~/.ssh/config

Copy and paste the contents above into that file, and replace NYU_USERNAME with your nyu username. Save the file with `Control+O` and write it with `Control+W`

Now, when connected to the NYU network, you can login to prince with:

    ssh prince

When remote, ssh first to the tunnel with:

    ssh hpcgwtunnel

Then, ssh into prince with:

    ssh princetunnel

In all the above situations, when prompted for your password, enter your NYU login password

### Setting up Passwordless Authentication  

Now we will go through how to setup an ssh public key that can be used to authenticate you when logging into prince, eanbling you to login without needing to enter your password every time.

#### Create a ssh public key

First, check if you already have a public key:

    cat ~/.ssh/id_rsa.pub

If something comes up, then skip to the step "add your public key as an authorized key."

If not, [follow Github's guide to Generate a New SSH Key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

#### Add your public key as an authorized key to prince

    ssh-copy-id prince

When prompted, enter "yes". You can now login to prince without a password! Try it out with:

    ssh prince

Note that when you ssh into `hpcgwtunnel` - you will always still need to enter your password.  Once you are connected, however, you can ssh into `princetunnel` without a password.

### Running Computational Tasks on the HPC

When you first login to the prince cluster:

   ssh prince

This will result in a terminal that looks like:

`[do838@log-1 ~]$`

The `log` next to the name indicates that this is a *login node.* **Login nodes should never be used to run computationally intensive tasks!!!**.  Students doing this is the **#1 cause of slowdown** for everyone else accessing the HPC.

**Computationally intensive tasks should be done using `compute nodes.`** . These can be started in two ways:

#### Interactive mode

Starting a compute node in interactive mode starts a new shell session in a compute node. This should be the first step when trying to test our running long computational tasks. It can be started with the command `srun`

A basic example of how to do this is:

    srun -t4:00:00 --mem=16000 --gres=gpu:1 --pty /bin/bash

In the above command, 4 hours of time, 16gb of ram, and one gpu is requested. 

You will then see in your terminal something like:

`[do838@gpu-11 ~]$`

The `gpu-11` indicates your in a GPU compute node

To request a specific GPU type, pass it after `gpu:`

    srun -t4:00:00 --mem=16000 --gres=gpu:p100:1 --pty /bin/bash

This will request a single `p100` gpu. For a full list of gpus available, refer to the [prince cluster documentation.](https://wikis.nyu.edu/display/NYUHPC/Clusters+-+Prince)

**The more resources and the longer the job time, the longer your session is likely to be queued before it starts.**

#### Modules and the Environment

Once you are in a compute node, you can load `modules` which are system packages that your code needs to run.  Examples of modules that can be loaded are `cuda` and `cudnn` - which are required for running machine learning tasks on the gpu.

To list the current modules that are loaded:

    module list

To search for a module, such as `cuda`:

    module spider cuda

This will print something like:

```
  cuda:
----------------------------------------------------------------------------------------------------------------
     Versions:
        cuda/8.0.44
        cuda/9.0.176
        cuda/9.2.88
        cuda/10.0.130
        cuda/10.1.105
```

Then, to load one of those modules:

    module load cuda/10.0.130 

To clear all currently loaded modules:

    module purge

Tensorflow for python on GPU, and Tensorflow.js with on the GPU both require **cuda 10.0 and cudnn 10.0**  They **do not currently support 10.1** To load these, run:

    module purge
    module load cuda/10.0.130
    module load cudnn/10.0v7.4.2.24

#### Setup Tensorflow in Python using the GPU (and CUDA)

To install tensorflow on the gpu:

Load the cuda and cudnn 10, and python 3.6:

    module purge
    module load cuda/10.0.130
    module load cudnn/10.0v7.4.2.24
    module load python3/intel/3.6.3

Create a virtual environment:

    virtualenv --system-site-packages -p python3 ./venv
  
Activate the virtual environment:

    source ./venv/bin/activate

Install tensorflow gpu

    pip install --upgrade tensorflow-gpu

#### Setup tensorflow.js in node using the GPU (and CUDA)

    npm install @tensorflow/tfjs-node-gpu

Then, you can access this from node with:

    const tf = require('@tensorflow/tfjs-node-gpu')

#### Queuing a training job

Once you verify your code works in interactive mode, you can schedule a long running training job with shell script that looks like:

```bash
#!/bin/bash

#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --time=2:00:00
#SBATCH --mem=4GB
#SBATCH --job-name=trainLstm
#SBATCH --mail-type=END
#SBATCH --mail-user=do838@nyu.edu
#SBATCH --output=slurm_%j.out
#SBATCH --gres=gpu:p100:1

# Load modules
module purge

# Load python 3.6:
module load python3/intel/3.6.3

# Load cuda and cudnn 10:
module load cuda/10.0.130
module load cudnn/10.0v7.4.2.24

# load the python virtualenv 
source ./venv/bin/activate

python train.py
```

Where `train.py` is a python script that starts training a machine learning model.

If this file was named `trainingJob.sh` You would run it with:

    sbatch trainingJob.sh

To see jobs that are queued:

    squeue -u $USER

This will print out something like:

```
JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
5043130     p40_4 trainLst    do838 PD       0:00      1 (Resources)
```

The leftmost column is the job id.

To cancel that job:

    scancel 5043130




### Storage on the Cluster

Lets take a look around the storage available to each user on prince.  Let's refer to the [table on the documentation for Prince](https://wikis.nyu.edu/display/NYUHPC/Clusters+-+Prince)

#### $HOME

When you first login, you are always dropped into your `$HOME` directory.  You are limited to **20GB** of storage here, but files here are permanent. **This is where your code should go.** To navigate here from other parts of the system: 

    cd $HOME

#### $SCRATCH

Each user gets **5TB of storage** on the `$SCRATCH` drive. Files here are semi-permanent; **files unused for 60 days are removed automatically.** Use `$SCRATCH` for storing your data, such as images, videos, sounds, and trained models.  It can be accessed by:

    cd $SCRATCH

#### $BEEGFS

Each user gets **2TB of storage** on the `$BEEGFS` drive. Files here are semi-permanent; **files unused for 60 days are removed automatically.** Use `$BEEGFS` for storing your data, such as images, videos, sounds, and trained models.  It can be accessed by:

    cd $BEEGFS

#### When to use $BEEGFS or $SCRATCH?

Generally speaking $BEEGFS file system is optimized for **small IOs and small files,** $SCRATCH is optimized for **big files and big IOs.** 

#### $ARCHIVE

Each user gets **2B of storage** on the `$ARCHIVE` drive. Files here are permanent, but cannot be accessed by compute jobs.  Use this for archiving your data that you no longer need to access but don't want to have deleted.

    cd $ARCHIVE

#### $SLURM_JOBTMP

Temporary storage that is mounted for each `compute job.` This will be the fastest way to access data, but it gets cleaned after the job is run.  To use this for a job, you would need to copy files into this drive then acccess them during the job.  It's an 'advanced' topic to do this but we can go over how in a future session.

---

For next time, create an HPC account, setup passwordless authentication, and login to the cluster using passwordless authentication.  

Clone the [tensorflow.js lstm-text-generation example](https://github.com/tensorflow/tfjs-examples/tree/master/lstm-text-generation) onto your drive on the HPC, start up an interative compute shell,  and train an lstm model using CUDA.
