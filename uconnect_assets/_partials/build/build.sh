#Change this line to your build folder (inside /_partials)
cd /Users/Chris/Sites/SVN/U-Connect/uconnect_assests/_partials/build
#Main Build Command
java -classpath js.jar org.mozilla.javascript.tools.shell.Main r.js -o build.js
#IE8 Build Command
java -classpath js.jar org.mozilla.javascript.tools.shell.Main r.js -o build-ie8.js
