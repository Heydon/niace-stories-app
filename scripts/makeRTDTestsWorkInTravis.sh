#!/usr/bin/env bash

rm `pwd`/app/private/data/*
patch `pwd`/node_modules/rtd/Gruntfile.js <<EOF
--- node_modules/rtd/Gruntfile.js	2014-09-17 12:50:44.487776246 +0100
+++ node_modules/rtd/improved.js	2014-09-17 14:39:58.195584627 +0100
@@ -72,7 +72,7 @@
         tasks = tasks.concat(startupTasks);
         tasks.pop(); // Remove the watch
         tasks.push.apply(tasks, constructWatchTasks());
-        tasks.push('closeWebdriverSessions');
+        //tasks.push('closeWebdriverSessions');
         return tasks;
     }

EOF