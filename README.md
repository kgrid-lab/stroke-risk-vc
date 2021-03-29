# Stroke Risk Values Clarification Demo Object and Client
A sample knowledge object and client demo that shows off how javascript code can be used as a resource loaded into a html page or used as REST endpoints that can be used to calculate specific values.

There are three separate clients that each use the same knowledge object in different ways. The included knowledge object has just two files `decision-support.js` and `vc-slider.js` but the `deployment.yaml` file allows them to be accessed as either resources or as REST endpoints that can be given inputs and return outputs using the javascript engine. The two resource clients use HTML to import the javascript files so they can be called by the HTML code and other local javascript files while the service client uses local javascript to make REST calls to the endpoints exposed by the object and get results back.

The different approaches these clients take is most apparent in how the value of the slider is translated into the position of the arrow above the bleeding risk vs stroke risk gradient. The service client makes a new call out to the activator every time the slider is moved to recalculate the final risk while the resource clients have cached the javascript locally and can make calls to the function directly.

While we can show this dual way of executing a simple function we cannot do the same with the widget provided in the `vc-slider.js` file as it must be used in a browser that supports javascript extending HTMLElements, allowing us to define the look and behavior of a new html element that we can then use like any other html element like `<p>` or `<br>`. This file must be provided using the resource engine and used like a standard html javascript import.

More detailed information about each client is provided on their respective pages.Feel free to play with each and edit their code.
