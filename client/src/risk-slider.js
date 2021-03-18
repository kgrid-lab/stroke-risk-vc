document.getElementById("strokerisk").addEventListener("change",
    () => document.getElementById("output").innerHTML = "Selected stroke risk is: " + document.getElementById("strokerisk").value);

// Delegate calculation to another file that can be loaded independently
// Two functions for now