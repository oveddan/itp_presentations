# Blog and Site Creation with **Hugo**

### by **Dan Oved** for **ITP Unconference 2018**

---

# How Wordpress Works

* Requires lamp stack to be setup (php, apache, mysql).
* Content in database
* On shared server, db and app server is shared
* Beholdent to them
* Workflow: login to wordpress, open editor, edit content, upload media, publish
* Theme editing has to be done through php

---

# How Hugo Works

* All content stored in git, usually on github.
* Publishing content is done through git push
* When content is published, it is served off of cdn automatically
* No reliance on database or webserver, just static html pages in the cloud
* Theme editing is just overriding html templates or css

---

![](hugo/cdn.png)

---

## Install hugo

    brew install hugo

## Verify it's installed

    hugo version
    
## Create a site:

    hugo new site blog

---

# Add a theme

https://themes.gohugo.io/

We will use `hugo-theme-one` because it's minimal and simple

Cd into directory of blog:

    cd blog
    git init

Add the theme as a git submodule:

    git submodule add https://github.com/resugary/hugo-theme-one/ themes/one

   
---

# Configure site

Start the server:

    hugo server -D
 
Open the folder in a code editor (such as Atom)

Edit config.toml:

```
theme="one"
title="My blog"
tags=["pcom"]
[params]
    navigation = ["archives.md", "about.md"]
```

---

# Content organization

```
.
└── content
    └── about
    |   └── _index.md  // <- https://example.com/about/
    ├── post
    |   ├── firstpost.md   // <- https://example.com/post/firstpost/
    |   ├── happy
    |   |   └── ness.md  // <- https://example.com/post/happy/ness/
    |   └── secondpost.md  // <- https://example.com/post/secondpost/
    └── quote
        ├── first.md       // <- https://example.com/quote/first/
        └── second.md      // <- https://example.com/quote/second/
```

---

# Create content

    hugo new posts/first-post.md

Media goes in:
```
.
└──static 
    └──images 
    └──audio
```

---

# Markdown In Hugo
https://daringfireball.net/projects/markdown/basics


# `#` Header 1
## `##` Header 2
### `###` Header 3

```
* Bullet 1
* Bullet 2
```
---

## Media and Links

`[example link](http://example.com/)` [example link](http://example.com/)

`![alt text](hugo/SamplePlans.png "Sample Image")`

![inline](hugo/SamplePlans.png "Sample Image")

---

## Syntax Highlighting

```
{{< highlight javascript >}}
  const syntax = 'highlighted';
{{< /highlight >}}
```
---

## Hugo Shortcodes

Figure
`{{< figure src="/media/spf13.jpg" title="Steve Francia" >}}`

Gist for https://gist.github.com/spf13/7896402
`{{< gist spf13 7896402 >}}`

Instagram for https://www.instagram.com/p/BWNjjyYFxVx/
`{{< instagram BWNjjyYFxVx >}}`

---

## Hugo Shortcodes (Contd.)

Tweet for https://twitter.com/spf13/status/877500564405444608
{{< tweet 877500564405444608 >}}

Vimeo for https://vimeo.com/channels/staffpicks/146022717
{{< vimeo 146022717 >}}

---

# Generating the site

Generate site

    hugo

Commit the changes

    git add .
    git commit -m 'created theme. added first post'

---

# Hosting - with site as subfolder

Change publish dir to docs in config.toml:

    publishDir = "docs"

Generate site and commit:

    hugo
    git add .
    git commit -m 'changed publish dir'

---

# Deploying to Github Pages

Create a repository in github, such as **blog**.  

Add repository as remote, and push:

    git remote add origin https://github.com/jamesmyrtle/blog.git
    git push origin master

---

Configure github pages to use the docs folder

   ![inline](hugo/change_publish_dir.png)

---

# Configure domain

Set the A records to the IP addresses provided by github, and the CNAME to the github domain name:

  ![inline](hugo/configure_dns.png)

---

# Customize Theme

Override files from the theme by creating copies in same location relative to the root

E.g. copy `themes/one/partials/header.html` to `partials/header.html`

Override css by creating a css file in static and include it in layout

E.g. create `static/css/style-custom.css`

---

# Overriding css

Know about `CSS Specificity`.  From MDN:

0. Type selectors (e.g., h1) and pseudo-elements (e.g., ::before).
1. Class selectors (e.g., .example), attributes selectors (e.g., [type="radio"]) and pseudo-classes (e.g., :hover).
2. ID selectors (e.g., #example).

(Show example in class)

---

As last resort, use `!important`:

```css
table td.fun { height: 50px; }
/* overrides the above */
table td { height: 50px !important; }
```

