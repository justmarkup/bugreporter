Bugreporter
================================

* Author    : justmarkup hallo@justmarkup.com
* Demo      : http://bugspencer.com/bugreporter

What is it for?
------------

It's a tool to get browser details from clients, bug reporters... in a simple way.

####There are three possibilities to use it:

1. Send Link to http://bugspencer.com/bugreporter to your bug reporter and ask them to send you back the details via email or twitter

2. Clone https://github.com/justmarkup/bugreporter, change styles and wording as you like and upload it to your server (you can also use github pages if you like). Send link to http://[your-server-name]/bugreporter to your bug reporter and ask them to send you back the details via email or twitter

3. Clone https://github.com/justmarkup/bugreporter, change the following variables in email/index.html

```
var mandrillkey = 'YOUR_MANDRILL_KEY'; // You need a mandrill account https://mandrill.com/ (free for up to 12k emails a month)
	emailTo = 'YOUR_EMAIL_ADRESS',
	emailName = 'YOUR_NAME',
	clientReference = 'YOUR_CLIENT';
```

Upload everything to sour server. After that you can send a link to http://[your-server-name]/bugreporter/email to your bug reporter and you will immediately a email back with her/his details.


[![Screenshot of Bugreporter](https://raw.githubusercontent.com/justmarkup/bugreporter/master/screenshot.png "Screenshot of Bugreporter")](http://bugspencer.com/bugreporter/)

What does it detect?
------------

* OS (Version)
* Browser (Version)
* Browserengine
* Browser Dimension
* Browser Language
* Device Dimension
* Color Depth
* Flash (Version)
* Cookie (yes or no)
* LocalStorage (yes or no)
* Adblock (yes or no)
* Pixel Ratio
* CSS Resolution
* User Agent

Anything else you want to get covered? Please create an [issue](https://github.com/justmarkup/bugreporter/issues) and I will look in to it.

License
------------

Dual licensed under GPLv2 & MIT

Copyright © 2014 justmarkup hallo@justmarkup.com

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.
